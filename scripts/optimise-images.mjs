/**
 * Shrinks post banner images to a web-friendly size, in place.
 *
 *   npm run optimise-images            # every banner-image.* under public/static/images/posts
 *   npm run optimise-images -- <file>  # specific files
 *
 * Images wider than MAX_WIDTH are resized and re-encoded as JPEG (mozjpeg). Smaller ones are
 * left alone, so it is safe to run repeatedly. Gemini's 2752px PNG/JPG output (~2 MB) comes out
 * around 80-300 KB with no visible difference. A PNG/WebP input is written as banner-image.jpg,
 * the original removed, and any post in data/blog that referenced it is pointed at the .jpg.
 *
 * Uses sharp, which Next.js already installs for image optimisation.
 */
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import path from 'path'

const MAX_WIDTH = 1600
// q90 with full-resolution colour (4:4:4): the banners are mostly flat dark navy with a fine grain,
// and lower settings (q82/q88, 4:2:0) smooth that grain into visible 8x8 blocks. Still ~80-250 KB.
const QUALITY = 90
const CHROMA = '4:4:4'
const ROOT = path.join('public', 'static', 'images', 'posts')
const BANNER = /^banner-image\.(jpe?g|png|webp)$/i

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('sharp is not installed. Run `npm install` (Next.js brings it in) and try again.')
  process.exit(1)
}

function findBanners(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return findBanners(p)
    return BANNER.test(e.name) ? [p] : []
  })
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

/** public\static\x.png -> /static/x.png */
const toUrl = (file) => '/' + path.relative('public', file).split(path.sep).join('/')

/** Swap an image URL in every post that uses it (frontmatter or body). Returns the posts changed. */
function repointPosts(from, to) {
  const dir = path.join('data', 'blog')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => {
      const p = path.join(dir, f)
      const src = readFileSync(p, 'utf8')
      if (!src.includes(from)) return false
      writeFileSync(p, src.split(from).join(to))
      return true
    })
}
const files = process.argv.length > 2 ? process.argv.slice(2) : findBanners(ROOT)
let changed = 0

for (const file of files) {
  const input = readFileSync(file)
  const { width, height } = await sharp(input).metadata()
  if (width <= MAX_WIDTH) {
    console.log(`skip  ${file} (${width}x${height}, already small enough)`)
    continue
  }

  const out = file.replace(/\.(png|webp|jpeg)$/i, '.jpg')
  const { data, info } = await sharp(input)
    .rotate() // respect EXIF orientation before metadata is stripped
    .resize({ width: MAX_WIDTH })
    .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: CHROMA })
    .toBuffer({ resolveWithObject: true })
  writeFileSync(out, data)
  changed++
  console.log(
    `done  ${out}: ${width}x${height} ${kb(input.length)} -> ${info.width}x${info.height} ${kb(data.length)}`
  )

  if (out !== file) {
    unlinkSync(file)
    const updated = repointPosts(toUrl(file), toUrl(out))
    const alreadyJpg = repointPosts(toUrl(out), toUrl(out)) // no-op swap: just finds posts using the .jpg
    console.log(
      updated.length
        ? `      updated ${updated.join(', ')} to the .jpg`
        : alreadyJpg.length
          ? `      ${alreadyJpg.join(', ')} already uses the .jpg`
          : `      no post references this image yet; point its images: frontmatter at ${toUrl(out)}`
    )
  }
}

console.log(`${changed} image(s) optimised, ${files.length - changed} skipped.`)
