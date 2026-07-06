import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();
    const { setAccessToken, setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {

        setErrorMessage("");
        setIsLoading(true);

        try {
            const res = await api.post(
                "login/",
                {
                    email,
                    password
                }
            );

            setAccessToken(res.data.access_token);
            localStorage.setItem(
    "access_token",
    res.data.access_token
);


setUser(res.data.user);
localStorage.setItem(
    "user",
    JSON.stringify(
        res.data.user
    )
);
            
            

            if (res.data.user.role === "Admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

        } catch (error) {
            const responseData = error.response?.data;
            let message = "Invalid credentials. Please verify your email and password.";

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
            console.log(error.response?.data);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-shell">
            <div className="page-card">
                <h1>Login</h1>
                <p className="subtitle">Enter your account details to continue.</p>

                {errorMessage && (
                    <div className="status-box status-box-error">{errorMessage}</div>
                )}

                <div className="form-row">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="button button-primary"
                    onClick={login}
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Login"}
                </button>

                <p className="page-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

