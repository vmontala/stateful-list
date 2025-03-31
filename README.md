# Stateful list
Playground app using Nuxt and TypeScript, fetches static data into a filterable stateful list

## Installation
1. Clone the repository
1. Install the dependencies (`yarn` or `npm install`)
1. Run the application `yarn dev` or `npm run dev` (development mode) or `yarn build && yarn preview` or `npm run build && npm run preview` (production mode)

## Decisions
- Native `CSS`: I felt it was enough for this simple application, especially since following a semi-BEM approach with scoped styles
- Importing JSON data: Although normally the data would be fetched asynchronously from a different server, it didn't make any sense to do it that way (and on top of that Nuxt SSR prevents the server from knowing its own domain as to self-request it)
- `TypeScript`: although it doesn't really add much value for this application, I like tinkering with it while I'm gaining familiarity and finding best practices

## Challenges
- Adapting to Nuxt's SSR: I'm mostly used to work on browser frontend, meaning that many resources I wanted to use were not directly available on Nuxt
- Adapting to Nuxt's framework: from auto-loading dependencies based on folder names, dynamic routing, etc, all of it was a bit of a learning
- Nuxt's caching vs interactive rebase: apparently Nuxt's caching system doesn't work well when interactively rebasing the codebase, it's best to shut down the server and turning it on when needed, than keeping it open and expecting the hot-reloading to work

## Next steps
- Extract filtering logic: there's a bit of logic on the `pages/index.vue` that could be easily extracted to a composable
- Add testing: I haven't added any testing, although most of the logic (stores/utils/composables) should be very easy to cover with `vitest`
- Accessibility: aimed to do as many things natively as possible, however some elements could use of descriptors and behaviour indicators
