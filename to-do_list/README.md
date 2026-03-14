# My Future Tasks — To-Do List App

A full-stack to-do list web app built with React + TypeScript on the frontend and Express.js + MongoDB Atlas on the backend. Add tasks, mark them as done, and delete them — all persisted in the cloud.

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, TypeScript, Vite 8 |
| Backend  | Node.js, Express.js 5 |
| Database | MongoDB Atlas (via Mongoose) |
| Styling  | Plain CSS (custom classes) |

---

## Project Structure

```
to-do_list/
├── backend/
│   ├── server.js          # Express API + Mongoose models
│   ├── .env               # 🔒 Secret — never committed
│   └── package.json
├── frontend/
│   ├── App.tsx            # Root React component
│   ├── components/
│   │   ├── TodoInput.tsx  # Input bar component
│   │   └── TodoItem.tsx   # Single task row component
│   └── src/
│       ├── main.tsx       # React entry point
│       └── index.css      # Global styles
├── index.html             # Vite HTML entry
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repo

```bash
git clone https://github.com/Dparamet/to-do_list.git
cd to-do_list
```

### 2. Configure environment variables

Create `backend/.env` (never commit this file):

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo?retryWrites=true&w=majority
```

### 3. Install dependencies

```bash
# Root / frontend toolchain
npm install

# Backend
cd backend && npm install
```

### 4. Run the app

Open two terminals:

```bash
# Terminal 1 — backend (port 5000)
cd backend
node server.js

# Terminal 2 — frontend dev server (port 5173)
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

All endpoints are served by the backend at `http://localhost:5000`.

| Method   | Endpoint       | Description          |
|----------|----------------|----------------------|
| `GET`    | `/tasks`       | Fetch all tasks      |
| `POST`   | `/tasks`       | Create a new task    |
| `PATCH`  | `/tasks/:id`   | Toggle `is_completed`|
| `DELETE` | `/tasks/:id`   | Delete a task        |

### Task document shape

```json
{
  "_id": "...",
  "message": "Buy groceries",
  "is_completed": false
}
```

---

## Scripts

From the project root:

| Command         | Description                      |
|-----------------|----------------------------------|
| `npm run dev`   | Start Vite dev server            |
| `npm run build` | TypeScript check + production build |
| `npm run lint`  | Run ESLint                       |
| `npm run preview` | Preview production build       |

---

## Security Notes

- `backend/.env` is listed in `.gitignore` — your `MONGO_URI` is never pushed to GitHub.
- The root `.gitignore` also blocks `.env`, `.env.*`, and `.env.txt` at every level of the repo.

---

## License

MIT

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
