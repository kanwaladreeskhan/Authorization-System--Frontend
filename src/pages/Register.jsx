import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {

    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
        role: "User"
    });
    const [statusMessage, setStatusMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setStatusMessage("");
        setErrorMessage("");
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const register = async () => {
        setStatusMessage("");
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            await axios.post("register/", formData);
            setStatusMessage("Registered successfully. Please login to continue.");
        } catch (err) {
            const responseData = err.response?.data;
            let message = "Unable to register. Please check your information and try again.";

            if (responseData) {
                if (typeof responseData === "string") {
                    message = responseData;
                } else if (responseData.detail) {
                    message = responseData.detail;
                } else if (responseData.error) {
                    message = responseData.error;
                } else if (typeof responseData === "object") {
                    const details = Object.values(responseData).flat();
                    message = Array.isArray(details)
                        ? details.join(" ")
                        : JSON.stringify(details);
                }
            }

            setErrorMessage(message);
            console.log(err.response?.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-shell">
            <div className="page-card">
                <h1>Register</h1>
                <p className="subtitle">
                    Create your account and choose your role.
                </p>

                {statusMessage && (
                    <div className="status-box status-box-success">
                        {statusMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="status-box status-box-error">
                        {errorMessage}
                    </div>
                )}

                <div className="form-row">
                    <label>Full Name</label>
                    <input
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <label>Username</label>
                    <input
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <button
                    className="button button-primary"
                    onClick={register}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                <p className="page-footer">
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
}
