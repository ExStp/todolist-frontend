// App.tsx
import { Container } from "@mui/material";
import { BrowserRouter as Router, useRoutes, Navigate, Outlet } from "react-router-dom";
import { TasksPage } from "../pages/TasksPage";

const UsersPage = () => (
  <div>
    <h2>Главная страница пользователей</h2>
    <Outlet />
  </div>
);
const UsersListPage = () => <div>Список пользователей</div>;
const UserDetailPage = () => <div>Детали пользователя</div>;

const routes = [
  { path: "/", element: <Navigate to="/tasks" replace /> },
  { path: "/tasks", element: <TasksPage /> },
  {
    path: "/users",
    element: <UsersPage />,
    children: [
      { path: "/users/list", element: <UsersListPage /> },
      { path: "/users/:id", element: <UserDetailPage /> },
    ]
  },
];

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <Router>
      <Container sx={{ mt: 2 }}>
        <AppRoutes />
      </Container>
    </Router>
  );
}

export default App;