import { useNavigate } from "react-router-dom";

export default function UserDashboard() {

const navigate = useNavigate();

const logout = async () => {

    try {
        await api.post("logout/");
    } catch (err) {
        console.log(err);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    navigate("/login");
};
    return (
        <div className="page-shell">
            <div className="page-card">
                <h1>User Dashboard</h1>
                <p className="subtitle">
                    Select a secure section to continue.
                </p>

                <div className="action-group">
                    <button
                        className="button button-primary"
                        onClick={() => navigate("/reports")}
                    >
                        Reports
                    </button>

                    <button
                        className="button button-secondary"
                        onClick={() => navigate("/adult-content")}
                    >
                        Adult Content
                    </button>
                    <button
    className="button button-secondary"
    onClick={logout}
>
    Logout
</button>
                </div>
            </div>
        </div>
    );
}