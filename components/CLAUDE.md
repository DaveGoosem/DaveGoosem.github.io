# Components — Claude Code Context

## Import Aliases
Use `@/components/` not relative paths when importing from outside this directory.

## Wrapper Components — Always Use These
| Use this | Instead of |
|----------|-----------|
| `@/components/Link` | `next/link` directly |
| `@/components/Image` | `next/image` directly |

The wrappers add security attributes to external links and handle the blog's image conventions.

## MDX Components
`MDXComponents.tsx` maps HTML elements and custom tags to React components for use inside MDX blog posts. Register any new component here if it needs to be usable in MDX.

## Styling
- Use Tailwind utility classes — no custom CSS unless in `css/tailwind.css`
- Dark mode: use `dark:` prefix (class-based, toggled by ThemeSwitch)
- Typography in post body is handled by `@tailwindcss/typography` (the `prose` class applied by layouts)

## Social Icons
Located in `components/social-icons/` — add new icons there, not inline in Header/Footer.
