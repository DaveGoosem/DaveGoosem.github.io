# Post image prompts (Gemini)

Image prompts for the 33 blog posts that don't set `images` in their frontmatter. Until a post has its own image, the site shows a generated cover (`components/PostCover.tsx`). Each prompt below uses the same colour family as that post's generated cover, so real images and generated covers look like one set.

## Workflow in Gemini

1. **Set the aspect ratio to 16:9** if your Gemini app offers the option. Gemini can't make a 2:1 image, so every prompt asks for 16:9 with the subject centred; the site crops it to 2:1 for the article header and wider still for cards.
2. **Start with the series anchor.** Generate the prompt for _The Road to SitecoreAI_ first and iterate until you're happy with the style. Short follow-ups work well, e.g. "make the lines thinner", "less detail in the background", "a little more navy".
3. **Reuse that image as a style reference.** For every other post, attach the anchor image and start the prompt with:

   > Use the attached image as a style reference: match its illustration style, line weight, texture, lighting and navy background. Change only the subject and colours as described below.

   This keeps the set consistent far better than text alone.

4. **If any lettering appears, ask Gemini to remove it**, e.g. "Remove all text and lettering from the image; keep everything else the same." Gemini is good at targeted edits like this.
5. **Save and wire it up.** Save the image as a PNG at the path listed for the post, then add the frontmatter line shown. That image then becomes the post's article header, its card artwork and its social share image.

## Why the prompts are written this way

- **Full sentences, not keyword lists.** Gemini follows a descriptive paragraph better than a list of tags.
- **The post's purpose comes first** ("a banner for a technical blog post about…"), so Gemini knows what the image is for.
- **Framing is stated explicitly** (centred subject, calm space around it), so the crop to a wider banner doesn't cut anything important off.
- **"No text" is phrased positively** ("every surface is clean and free of lettering…"). This works better than a list of don'ts. The post titles are left out of the prompts on purpose: quoting a title tends to make Gemini draw it into the image.

---

## Getting Your Legacy Sitecore Data “Migration-Ready”

- **Post:** `data/blog/getting-your-legacy-data-migration-ready.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2026/getting-your-legacy-data-migration-ready/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2026/getting-your-legacy-data-migration-ready/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about preparing old content and media for a platform migration.

The scene shows old archive boxes and filing cabinets being sorted on the left, each box receiving a small identifier sticker, then carried by small workers across a bridge to a clean, modern warehouse on the right.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Managing Image Quality with SitecoreAI, Next.js and Content Hub

- **Post:** `data/blog/managing-image-quality-with-sitecoreai-nextjs-and-content-hub.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2026/managing-image-quality-with-sitecoreai-nextjs-and-content-hub/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2026/managing-image-quality-with-sitecoreai-nextjs-and-content-hub/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about keeping logos and screenshots sharp when images are optimised.

The scene shows two copies of the same simple geometric emblem under a large magnifying glass, one razor sharp and one slightly soft. Beside them, a small sorting machine routes differently shaped file tokens down separate chutes.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Migrating to SitecoreAI with an AI Pair: Context, Pipelines and a Review Loop

- **Post:** `data/blog/migrating-to-sitecoreai-with-an-ai-pair.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2026/migrating-to-sitecoreai-with-an-ai-pair/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2026/migrating-to-sitecoreai-with-an-ai-pair/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about a developer and an AI coding assistant migrating content together.

The scene shows a developer and a friendly, rounded AI assistant robot sitting side by side at a shared desk, reviewing a large plan. Behind them, content items flow along a pipeline and pause at a checklist gate before moving on.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Search End-to-End: Integrating the Search SDK into Your JSS Next.js Headless Solution

- **Post:** `data/blog/integrating-the-search-sdk-into-your-jss-nextjs-solution.mdx`
- **Colour family:** search (emerald green and teal)
- **Save as:** `public/static/images/posts/2026/integrating-the-search-sdk-into-your-jss-nextjs-solution/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2026/integrating-the-search-sdk-into-your-jss-nextjs-solution/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about adding site search to a website end to end.

The scene shows a beam of light sweeping across a library of floating content cards, with the matching cards lifting out and arranging themselves into a neat grid on a web page. Three platforms step upward in the background, one per environment.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is emerald green and teal, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## The Developer Skill Shift: Prompt Craft Meets Web Security in the Composable Era

- **Post:** `data/blog/the-developer-skill-shift-ai-prompt-craft-meets-web-security-in-the-composable-era.mdx`
- **Colour family:** ai (magenta and violet)
- **Save as:** `public/static/images/posts/2026/the-developer-skill-shift-ai-prompt-craft-meets-web-security-in-the-composable-era/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2026/the-developer-skill-shift-ai-prompt-craft-meets-web-security-in-the-composable-era/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about developers learning to direct AI tools while strengthening security skills.

The scene shows a developer standing at a fork in the road, one hand guiding a small team of AI assistant robots and the other building a protective wall around a cluster of connected service blocks.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is magenta and violet, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## The Road to SitecoreAI: Why Moving Off XM/XP Is Harder Than It Looks (and How We Make It Manageable)

- **Post:** `data/blog/the-road-to-sitecoreai.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2026/the-road-to-sitecoreai/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2026/the-road-to-sitecoreai/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about why moving to a new platform is a journey, not an upgrade.

The scene shows a long winding road leading from an old monolithic castle in the foreground to a modern city in the clouds on the horizon, with road works, a detour and a carefully drawn route map unrolled beside the road.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## What Teams Must Unlearn From the Composable Era

- **Post:** `data/blog/what-teams-must-unlearn-from-the-composable-era.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2026/what-teams-must-unlearn-from-the-composable-era/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2026/what-teams-must-unlearn-from-the-composable-era/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about simplifying an over-complicated stack of connected products.

The scene shows a team carefully dismantling a wobbly tower made of many mismatched blocks and rebuilding the pieces into a simpler, unified structure that glows softly from within.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Atomic Design Patterns for Headless Sitecore Multi-Site Solutions

- **Post:** `data/blog/atomic-design-patterns-for-headless-sitecore-multi-site-solutions.mdx`
- **Colour family:** frontend (sky blue and cyan)
- **Save as:** `public/static/images/posts/2025/atomic-design-patterns-for-headless-sitecore-multi-site-solutions/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2025/atomic-design-patterns-for-headless-sitecore-multi-site-solutions/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about reusing one design system across many websites.

The scene shows small glowing spheres joining into molecules, the molecules snapping together into larger interface blocks, and those blocks assembling into three different website layouts that clearly share the same parts. A single tidy shelf of components sits at the base, feeding all three sites.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is sky blue and cyan, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Generating Dynamic PDFs and Emails in a SaaS-Hosted Headless Sitecore Solution

- **Post:** `data/blog/generating-dynamic-pdfs-or-emails-in-a-saas-hosted-headless-sitecore-build.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2025/generating-dynamic-pdfs-or-emails-in-a-saas-hosted-headless-sitecore-build/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2025/generating-dynamic-pdfs-or-emails-in-a-saas-hosted-headless-sitecore-build/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about generating documents and emails from website templates.

The scene shows a press stamping out a polished document and a sealed envelope from the same template mould. Both drift upward out of a soft cloud, one heading to a printer tray and one to an inbox tray.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Setting up your Sitecore XMCloud Solution with Storybook and Storybook Testing Addons

- **Post:** `data/blog/setting-up-your-xmcloud-solution-with-storybook-and-full-test-tooling.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2025/setting-up-your-xmcloud-solution-with-storybook-and-full-test-tooling/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2025/setting-up-your-xmcloud-solution-with-storybook-and-full-test-tooling/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about developing and testing interface components in isolation.

The scene shows interface components laid out like illustrations in a large open storybook, each page marked with a small check mark. The book rests on a workbench beside a small cloud.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Content Serialization in XMCloud - Defining your workflow for success

- **Post:** `data/blog/sitecore-content-serialization-in-xmcloud-defining-your-workflow-for-success.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2025/sitecore-content-serialization-in-xmcloud-defining-your-workflow-for-success/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2025/sitecore-content-serialization-in-xmcloud-defining-your-workflow-for-success/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about a team workflow for keeping content and code in sync.

The scene shows content items folding into neat stacks of file cards, travelling in a clear loop between a content tree and a source-control vault, passing two checkpoints on the way round.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Unit Testing & Automation with Storybook and GitHub Workflows

- **Post:** `data/blog/unit-testing-and-automation-with-storybook-and-github-workflows.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2025/unit-testing-and-automation-with-storybook-and-github-workflows/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2025/unit-testing-and-automation-with-storybook-and-github-workflows/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about automated testing of interface components.

The scene shows component cards riding an automated conveyor through a row of testing stations, each station lighting a green check as a card passes. A small bell at the start of the line has just rung.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Building Components for Sitecore Pages with XMCloud

- **Post:** `data/blog/building-components-for-sitecore-pages-with-xmcloud.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2024/building-components-for-sitecore-pages-with-xmcloud/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2024/building-components-for-sitecore-pages-with-xmcloud/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about building page components that content editors can drag and drop.

The scene shows a hand placing a modular interface tile onto a large page canvas in a visual editor. Several other tiles are already in place, and each one has a small socket on its underside plugged into a content source below the canvas.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Configuring SSO for Sitecore Cloud Portal with Azure AD

- **Post:** `data/blog/configuring-sitecore-cloud-portal-with-azure-ad-sso.mdx`
- **Colour family:** cloud (royal blue and indigo)
- **Save as:** `public/static/images/posts/2024/configuring-sitecore-cloud-portal-with-azure-ad-sso/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2024/configuring-sitecore-cloud-portal-with-azure-ad-sso/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about single sign-on into a cloud portal.

The scene shows one glowing key held up to a row of doors set into a cloud workspace, every door swinging open at once. An identity badge scanner glows softly beside the first door.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is royal blue and indigo, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## How to structure your multi-site Sitecore XM Cloud solution and deploy it to Vercel

- **Post:** `data/blog/how-to-structure-your-multi-site-xmcloud-solution-and-deploy-it-to-vercel.mdx`
- **Colour family:** platform (deep crimson and warm orange)
- **Save as:** `public/static/images/posts/2024/how-to-structure-your-multi-site-xmcloud-solution-and-deploy-it-to-vercel/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2024/how-to-structure-your-multi-site-xmcloud-solution-and-deploy-it-to-vercel/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about structuring a multi-site solution and deploying it to the cloud.

The scene shows an architect's blueprint laid flat on a desk showing a building with several wings that share one foundation. A small delivery vehicle drives off the edge of the blueprint toward a cloud platform in the distance.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is deep crimson and warm orange, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Securing Non-Production Vercel Environments via Vercel Firewall

- **Post:** `data/blog/securing-non-production-vercel-environments-via-vercel-firewall.mdx`
- **Colour family:** cloud (royal blue and indigo)
- **Save as:** `public/static/images/posts/2024/securing-non-production-vercel-environments-via-vercel-firewall/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2024/securing-non-production-vercel-environments-via-vercel-firewall/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about restricting test websites to people inside the organisation.

The scene shows a group of preview buildings behind a gated wall. The gate opens only for a traveller arriving along a private road that leads from the organisation's own campus; a public road ends at the closed wall.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is royal blue and indigo, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Headless Multi-site with NPM Workspaces (updated for Sitecore 10.3.X and NextJS 13.X)

- **Post:** `data/blog/sitecore-10-3-mono-repo-setup-with-npm-workspaces-nextjs13.mdx`
- **Colour family:** frontend (sky blue and cyan)
- **Save as:** `public/static/images/posts/2024/sitecore-10-3-mono-repo-setup-with-npm-workspaces-nextjs13/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2024/sitecore-10-3-mono-repo-setup-with-npm-workspaces-nextjs13/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about keeping several websites in one shared code repository.

The scene shows a large open toolbox with neatly partitioned compartments, each compartment holding a different website's parts, all around a central tray of shared tools.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is sky blue and cyan, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore XM Cloud Front End Framework Selection

- **Post:** `data/blog/sitecore-xmcloud-front-end-framework-selection.mdx`
- **Colour family:** frontend (sky blue and cyan)
- **Save as:** `public/static/images/posts/2024/sitecore-xmcloud-front-end-framework-selection/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2024/sitecore-xmcloud-front-end-framework-selection/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about choosing a front-end framework.

The scene shows a developer standing at a crossroads where several paths branch ahead, each path a different shape and colour, all of them converging on the same cloud destination on the horizon.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is sky blue and cyan, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Configuring a Headless Static Site using SSG into a Sitecore Multisite solution

- **Post:** `data/blog/sitecore-headless-jss-static-site-generation-ssg.mdx`
- **Colour family:** frontend (sky blue and cyan)
- **Save as:** `public/static/images/posts/2023/sitecore-headless-jss-static-site-generation-ssg/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2023/sitecore-headless-jss-static-site-generation-ssg/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about turning a dynamic website into fast static pages.

The scene shows a lively, moving website being fed into a printing press and coming out as a tidy stack of static pages, which then fly out along glowing paths across a stylised globe.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is sky blue and cyan, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Configuring Sitecore JSS/Headless Security Headers for NextJS

- **Post:** `data/blog/configuring-sitecore-jss-headless-nextjs-security-headers.mdx`
- **Colour family:** cloud (royal blue and indigo)
- **Save as:** `public/static/images/posts/2023/configuring-sitecore-jss-headless-nextjs-security-headers/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2023/configuring-sitecore-jss-headless-nextjs-security-headers/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about protecting a website with security headers.

The scene shows a single web page floating in the centre, wrapped in several thin translucent protective layers like nested shields. Small arrows approach from the edges and glance off the outer layers.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is royal blue and indigo, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Configuring your Sitecore Heads in Vercel for Multi-site

- **Post:** `data/blog/configuring-your-sitecore-heads-in-vercel-for-multi-site.mdx`
- **Colour family:** frontend (sky blue and cyan)
- **Save as:** `public/static/images/posts/2023/configuring-your-sitecore-heads-in-vercel-for-multi-site/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2023/configuring-your-sitecore-heads-in-vercel-for-multi-site/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about running several websites on one hosting platform with separate environments.

The scene shows four browser windows standing side by side on one shared platform. Beneath each window is its own small control panel with three toggle switches, one per environment.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is sky blue and cyan, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Composable SaaS Security with Edge Networks

- **Post:** `data/blog/securing-a-saas-solution-with-edge-networks.mdx`
- **Colour family:** frontend (sky blue and cyan)
- **Save as:** `public/static/images/posts/2023/securing-a-saas-solution-with-edge-networks/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2023/securing-a-saas-solution-with-edge-networks/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about securing connected cloud services at the network edge.

The scene shows a small city of connected service buildings ringed by glowing edge checkpoints. Traffic streams in from the outside and is filtered at the checkpoints before reaching the city.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is sky blue and cyan, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Wildcard Pages with Item Buckets & JSS

- **Post:** `data/blog/sitecore-wildcard-pages-with-item-buckets-jss.mdx`
- **Colour family:** architecture (indigo and soft violet)
- **Save as:** `public/static/images/posts/2022/sitecore-wildcard-pages-with-item-buckets-jss/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2022/sitecore-wildcard-pages-with-item-buckets-jss/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about one page template serving thousands of items.

The scene shows a single master page stencil producing a fan of unique pages, each page filled with data drawn up from a large bucket of items below.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is indigo and soft violet, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Configuring SearchStax for your Sitecore Solution

- **Post:** `data/blog/configuring-searchstax-for-your-sitecore-solution.mdx`
- **Colour family:** cloud (royal blue and indigo)
- **Save as:** `public/static/images/posts/2021/configuring-searchstax-for-your-sitecore-solution/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2021/configuring-searchstax-for-your-sitecore-solution/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about setting up a managed search service.

The scene shows a sleek search server resting on top of a soft cloud, with a hand carefully turning one of its control dials. A single clean cable runs from the server down to a website.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is royal blue and indigo, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore with Solr - the management conundrum

- **Post:** `data/blog/sitecore-with-solr-the-management-conundrum.mdx`
- **Colour family:** cloud (royal blue and indigo)
- **Save as:** `public/static/images/posts/2021/sitecore-with-solr-the-management-conundrum/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2021/sitecore-with-solr-the-management-conundrum/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about the challenge of hosting a search engine that lives outside your main platform.

The scene shows a powerful search machine sitting on the border between two very different cities. Teams from each city reach toward it from their own side, each holding different tools.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is royal blue and indigo, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore SXA Themes Enable gulp sync with Creative Exchange

- **Post:** `data/blog/sitecore-sxa-and-theme.mdx`
- **Colour family:** architecture (indigo and soft violet)
- **Save as:** `public/static/images/posts/2020/sitecore-sxa-and-theme/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2020/sitecore-sxa-and-theme/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about syncing website theme files with a content platform.

The scene shows theme files on a front-end developer's desk flowing through a clear pipe toward a gallery of website themes. One valve along the pipe is closed and shows a small red stop indicator.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is indigo and soft violet, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Configuring Solr for Sitecore

- **Post:** `data/blog/configuring-solr-for-sitecore.mdx`
- **Colour family:** search (emerald green and teal)
- **Save as:** `public/static/images/posts/2019/configuring-solr-for-sitecore/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2019/configuring-solr-for-sitecore/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about tuning a search engine for production.

The scene shows a mechanic in a tidy workshop tuning a compact, powerful engine block whose shape echoes a magnifying glass. The gauges on the wall all point steadily to the green zone.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is emerald green and teal, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Development Tools | Test your Sitecore Queries

- **Post:** `data/blog/sitecore-8-2-devtools-test-your-queries.mdx`
- **Colour family:** default (slate blue and soft grey)
- **Save as:** `public/static/images/posts/2019/sitecore-8-2-devtools-test-your-queries/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2019/sitecore-8-2-devtools-test-your-queries/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about testing content queries with developer tools.

The scene shows a developer's console on the left and a branching tree of content nodes on the right. A query travels from the console into the tree, and only the matching branches light up.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is slate blue and soft grey, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore on Azure PaaS File I/O errors

- **Post:** `data/blog/sitecore-on-azure-paas-file-i-o-errors.mdx`
- **Colour family:** cloud (royal blue and indigo)
- **Save as:** `public/static/images/posts/2019/sitecore-on-azure-paas-file-i-o-errors/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2019/sitecore-on-azure-paas-file-i-o-errors/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about diagnosing file errors on cloud-hosted web servers.

The scene shows a row of identical server instances behind a load balancer. One instance flickers, with a few loose files scattered around it and a warning light glowing, while a technician inspects it with a torch.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is royal blue and indigo, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Wildcard Pages with Item Buckets & Azure Search

- **Post:** `data/blog/wildcard-pages-with-item-buckets-azure-search.mdx`
- **Colour family:** default (slate blue and soft grey)
- **Save as:** `public/static/images/posts/2019/wildcard-pages-with-item-buckets-azure-search/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2019/wildcard-pages-with-item-buckets-azure-search/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about one page template backed by cloud search.

The scene shows a page stencil producing a fan of pages, fed by a beam of light that reaches down into a large bucket of items resting on a cloud.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is slate blue and soft grey, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Build & Release with VSTS & Azure PaaS

- **Post:** `data/blog/build-release-with-azure-paas.mdx`
- **Colour family:** cloud (royal blue and indigo)
- **Save as:** `public/static/images/posts/2018/build-release-with-azure-paas/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2018/build-release-with-azure-paas/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about automating software builds and releases into a cloud platform.

The scene shows an automated assembly line carrying sealed software crates out of a small code workshop and up a gentle ramp into a cloud platform. Along the conveyor, three checkpoint gates glow green as each crate passes.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is royal blue and indigo, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore Helix modular & three-tier architecture patterns - why not both?

- **Post:** `data/blog/sitecore-with-helix-architecture-multisite.mdx`
- **Colour family:** architecture (indigo and soft violet)
- **Save as:** `public/static/images/posts/2018/sitecore-with-helix-architecture-multisite/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2018/sitecore-with-helix-architecture-multisite/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about combining modular and three-tier architecture.

The scene shows two architectural models on a table joined by a small bridge: on the left a modular spiral tower, on the right a classic three-storey building.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is indigo and soft violet, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```

## Sitecore 8.X and Helix - Initial thoughts

- **Post:** `data/blog/sitecore-helix-initial-thoughts.mdx`
- **Colour family:** architecture (indigo and soft violet)
- **Save as:** `public/static/images/posts/2017/sitecore-helix-initial-thoughts/banner-image.png`
- **Frontmatter:** `images: ['/static/images/posts/2017/sitecore-helix-initial-thoughts/banner-image.png']`

```text
Create a wide 16:9 editorial illustration to use as the banner image for a technical blog post about a modular, layered way to architect a website.

The scene shows a spiral staircase built from three kinds of modular layers, foundation at the bottom, features in the middle and project at the top, with small builders fitting the next piece into place.

Style: a clean, modern, semi-flat digital illustration with soft gradients, gentle depth and a subtle grain texture, in the spirit of a polished tech magazine. The background is a deep navy (#0b1120). The colour palette is indigo and soft violet, with a few small white highlights. Lighting is soft and even, with a gentle glow on the main subject.

Composition: a straight-on, slightly elevated view. Keep the main subject in the centre of the frame, with generous calm space around it, because the image will be cropped to an even wider banner. Keep the scene uncluttered.

The image is purely visual: every surface is clean and free of lettering, numbers, logos and brand marks.
```
