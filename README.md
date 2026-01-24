# AI4Science Hub

The site infrastructure for [hub.fulcrum.science](https://hub.fulcrum.science) — curated resources for AI in scientific research.

## Content

**Content lives in a separate repository:** [fulcrumscience/hub-content](https://github.com/fulcrumscience/hub-content)

To contribute or update content (articles, resources, guides), please submit changes to the hub-content repo. This repo (hub-site) contains only the site infrastructure, styling, and build configuration.

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
npm run dev
```

This fetches content from hub-content and starts the development server at `http://localhost:3000`.

**Note:** Search won't work in dev mode. To test search locally, run `npm run build && npm run serve`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Fetch content and start dev server |
| `npm run build` | Build for production |
| `npm run serve` | Serve the production build locally |

## Contributing

- **Content changes** — Submit to [hub-content](https://github.com/fulcrumscience/hub-content)
- **Site infrastructure** — Submit PRs to this repo for styling, components, or build changes

## License

MIT
