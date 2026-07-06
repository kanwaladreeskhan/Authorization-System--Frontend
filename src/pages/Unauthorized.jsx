import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <div className="page-shell">
            <div className="page-card">
                <h1>Access Denied</h1>
                <p className="subtitle">
                    You do not have the permissions required to view this page.
                </p>

                <div className="status-box status-box-error">
                    Please sign in with an account that has the correct role or contact an administrator.
                </div>

                <Link className="button button-secondary" to="/login">
                    Return to Login
                </Link>
            </div>
        </div>
    );
}
