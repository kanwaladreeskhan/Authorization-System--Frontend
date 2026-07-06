import {
    Routes,
    Route
}
from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import AdminDashboard
from "./pages/AdminDashboard";

import UserDashboard
from "./pages/UserDashboard";

import Reports from "./pages/Reports";
import AdultContent from "./pages/AdultContent";

function App() {

    return (

        <Routes>

    <Route
        path="/"
        element={<Login />}
    />

    <Route
        path="/login"
        element={<Login />}
    />

    <Route
        path="/register"
        element={<Register />}
    />

     <Route
    path="/admin"
    element={
        <ProtectedRoute role="Admin">
            <AdminDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/user"
    element={
        <ProtectedRoute role="User">
            <UserDashboard />
        </ProtectedRoute>
    }
/>

    <Route
    path="/reports"
    element={
        <ProtectedRoute role="User">
            <Reports />
        </ProtectedRoute>
    }
/>

<Route
    path="/adult-content"
    element={
        <ProtectedRoute role="User">
            <AdultContent />
        </ProtectedRoute>
    }
/>

</Routes>
    );
}

export default App;