# Isa's Website

Personal website modeled after the [k9s CLI](https://k9scli.io/). Built using React + Typescript + Vite, using `npm create vite@latest` with `--template react-ts`.

## Development

To install all necessary dependencies and start local development server:

```bash
npm install
npm run dev
```

### Linting/Formatting

```bash
npm run lint
npm run lint:fix
npm run format
```

## Production

To build the project and serve the production build locally:

```bash
npm run build
npm run preview
```

### Deployment

The build creates a `/dist` folder which is the final production bundle that can be deployed to any static host. Originally hosted using a Raspberry Pi 4! Currently hosted with Vercel.
