# Shivam Maurya's personal website

A static personal field notebook at [shvmm.github.io](https://shvmm.github.io/): research resources, public work, collected notes, and a small optics toolkit.

## Run locally

Open `index.html` in a browser, or serve the repository over HTTP for a complete preview:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. There are no packages to install and no build step.

## GitHub Pages

Publish from the `main` branch and the repository root in **Settings → Pages**. The `.nojekyll` file tells GitHub Pages to serve the files directly. Every internal URL is relative, so the site also works under a project subdirectory.

The site uses HTML, CSS, and browser-side JavaScript only. No backend, API keys, framework, external fonts, or CDN scripts are required.

## Content and layout

- `index.html`: introduction, collections, toolkit, about, and social links.
- `content/notes.html` and `content/technical.html`: native `details` sections; add a `details` element inside `.note-list` to add a note.
- `content/myopia.html`: research repository and optics tools.
- `content/exhibit.html`: public work.
- `calculators/`: original optics formulas with labeled inputs and validation.
- `content/switchboard-planner.html`: self-contained planner, with a link back to the notebook.
- `styles/style.css`: shared layout, themes, responsive rules, and optional enhancements.
- `scripts/theme.js`: theme preference applied before paint.
- `scripts/site.js`: theme switching, local clock, and calculator input validation.

The color theme follows the system preference until a visitor picks a theme. That choice is saved locally when browser storage is available. The main content and expandable notes remain available without JavaScript; calculators require JavaScript.

## Modern browser features

CSS cascade layers, container queries, fluid typography, and native disclosure elements form the base design. View transitions and a CSS scroll progress indicator are progressive enhancements: browsers without those APIs retain normal navigation and theme switching. The site respects `prefers-reduced-motion`.

References: [GitHub Pages](https://docs.github.com/en/pages), [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), and [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations).
