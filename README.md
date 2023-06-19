### Descrição do projeto

System to manage products for an online store.
Wich includes CRUD for products, login, logout, registring new user and a list to suggested products.
The suggestion works with EDEN AI, which selects the keywords of the products that user opened at least once and,
after that, the system can search by text similar products with these keywords.

Learn more about how Eden can be implemented here: https://docs.edenai.co/reference/pipeline_create

### Requisites

Node.js

Yarn or Npm

Git

### Installing

Cloning:

```bash
git clone https://github.com/brunachamon/stone.git
```

Installing dependencies:

```bash
cd stone
cd api
npm install or yarn
cd ..
cd app
npm install or yarn
```

### Running backend

Iniciando o servidor com Node e Express:

```bash
cd api
npm run start or yarn start
```

### Running frontend

```bash
cd app
npm start or yarn start
```

### Tech Specs

- React 18 <3
- Redux toolkit (An easy way to manage state with redux, more simple)
- Redux persist (To avoid losing data when page refresh)
- Tailwind (An quick way to desenvolve interfaces with their utilities)
- Jest + React testing library (To test behavior in components and endpoints)
- CRA used in frontend as a "boilerplate generator"
- Axios (To make requests)
- Express
- MongoDB and mongoose (Managing data as documents)
- dotenv (To create environment variables)
- Eslint with JSX, A11y, React, React Hooks (using eslint:recommended and airbnb)
-

### To run tests:

- Run `npm test` in project

Delivered coverage: ~ %
