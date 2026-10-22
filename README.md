# Daily Task Manager (React)

FSWD Task 2 – Interactive JavaScript and ReactJS Application Development
Group 2 · Statement 12: **Daily Task Manager**

**Student:** Shaktivel T K · **Roll No:** RA2411003050153
**Class:** III Year (5th Sem) B.Tech CSE – Section C · SRM IST, Tiruchirappalli

A to-do application with add, edit, delete, completion status and filtering.

## Features
- Add, edit and delete tasks (title, description, priority, category, due date)
- Mark tasks completed / pending
- Search by text; filter by status, priority and category
- Clear all completed tasks
- Dashboard with totals, overdue count, progress bar and "due today" list
- Client-side form validation with inline error messages
- Data saved in the browser (localStorage)
- Responsive layout (desktop, tablet, mobile)

## Views (React Router)
| Route | Page |
|-------|------|
| `/` | Dashboard |
| `/tasks` | My Tasks (search + filters + list) |
| `/tasks/new` | Add Task form |
| `/tasks/:id/edit` | Edit Task form |
| `/about` | Workflow and student details |

## Tech
React 18 · React Router 6 · Vite 5 · HTML5 · CSS3 · JavaScript ES6
Hooks used: `useState`, `useEffect`, `useContext`, `useParams`, `useNavigate`, plus a custom hook `useLocalStorage`.

## Project structure
```
src/
  main.jsx            entry point (HashRouter + TaskProvider)
  App.jsx             route table and page shell
  index.css           all styles + responsive media queries
  context/TaskContext.jsx   task state and actions (add/update/delete/toggle/clear)
  hooks/useLocalStorage.js  persistent state hook
  utils/validation.js       validation rules and constants
  components/         Navbar, Footer, StatCard, FilterBar, TaskForm, TaskList, TaskItem
  pages/              Dashboard, Tasks, TaskFormPage, About
```

## Run locally
```bash
npm install
npm run dev        # development server
npm run build      # production build in dist/
npm run preview    # preview the production build
```
Requires Node.js 18 or newer.
