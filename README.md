# Baggage

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Baggage** is a single-page shopping cart application built with React 19 and TypeScript. It fetches a catalog of smartphones from an external API and displays them inside a dynamic cart where users can manage their selection in real time.

Each item in the cart shows its image, name, and price, along with controls to increase or decrease its quantity. Decreasing an item's quantity to zero removes it from the cart automatically. Users can also remove any individual item directly with the dedicated remove button, or wipe the entire cart at once using the **Clear Cart** action.

The cart header always reflects the current state: the navbar badge updates instantly to show the total number of items across all products, and the cart footer keeps a running total price that recalculates on every change.

State is managed globally using the **Context API combined with `useReducer`**, with a single reducer handling seven distinct actions — loading, displaying items, clearing the cart, clearing a single item, increasing and decreasing quantities, and recalculating totals. This makes every state transition explicit, predictable, and easy to trace.

Data is loaded asynchronously on startup from a course API, proxied through Vite's dev server to avoid CORS issues. While the data is being fetched, a loading screen is shown and the cart is blocked from rendering until the response arrives.

The project follows a strict type system where every action, state shape, context value, component prop, hook return, and helper signature is fully typed in dedicated files under `src/types/`. Path aliases (`@/` and `@tests/`) keep imports clean across the entire codebase.

It also ships with a complete test suite using **Jest**, **ts-jest**, **jest-environment-jsdom**, and **Testing Library** — covering components, pages, services, helpers, and context interactions, with a 70% coverage threshold enforced on branches, functions, lines, and statements. Pre-commit hooks via Husky and lint-staged run ESLint and Prettier automatically before every commit.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/baggage`](https://www.diegolibonati.com.ar/#/project/baggage)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
