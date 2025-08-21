// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TaskList from "./pages/TaskList.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import { useSelector } from "react-redux";
import TaskCreate from "./pages/TaskCreate.jsx";
import TaskEdit from "./pages/TaskEdit.jsx";
import Navbar from "./components/Navbar";

function PrivateRoute({ children, role }) {
  const { token, user } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/tasks" element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        } />

        <Route path="/tasks/:id" element={
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        } />


<Route path="/tasks/create" element={
  <PrivateRoute>
    <TaskCreate />
  </PrivateRoute>
} />
<Route path="/tasks/:id/edit" element={
  <PrivateRoute>
    <TaskEdit />
  </PrivateRoute>
} />


        <Route path="/users" element={
          <PrivateRoute role="admin">
            <UserManagement />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}
