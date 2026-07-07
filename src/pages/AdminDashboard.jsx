import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {

    const [email, setEmail] = useState("");
    const [permissions, setPermissions] = useState({
        weekly_reports: false,
        monthly_reports: false,
        annual_reports: false,
        financial_reports: false
    });
    const [statusMessage, setStatusMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleCheckbox = (e) => {
        setStatusMessage("");
        setErrorMessage("");
        setPermissions({
            ...permissions,
            [e.target.name]: e.target.checked
        });
    };
    

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
    const savePermissions = async () => {
        setStatusMessage("");
        setErrorMessage("");
        setIsSaving(true);

        try {
            const token = localStorage.getItem("access_token");

            await api.post(
                "assign-report-access/",
                {
                    email,
                    permissions
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStatusMessage("Permissions updated successfully.");
        } catch (err) {
            const responseData = err.response?.data;
            let message = "Unable to update permissions. Please verify the user and try again.";

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
            console.error(err.response?.data);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="page-shell">
            <div className="page-card">
                <h1>Admin Dashboard</h1>
                <p className="subtitle">
                    Control report access for individual users.
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
                    <label>User Email</label>
                    <input
                        type="email"
                        placeholder="User Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-row checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="weekly_reports"
                            checked={permissions.weekly_reports}
                            onChange={handleCheckbox}
                        />
                        Weekly Reports
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="monthly_reports"
                            checked={permissions.monthly_reports}
                            onChange={handleCheckbox}
                        />
                        Monthly Reports
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="annual_reports"
                            checked={permissions.annual_reports}
                            onChange={handleCheckbox}
                        />
                        Annual Reports
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="financial_reports"
                            checked={permissions.financial_reports}
                            onChange={handleCheckbox}
                        />
                        Financial Reports
                    </label>
                </div>

                <button
                    className="button button-primary"
                    onClick={savePermissions}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving permissions..." : "Save Permissions"}
                </button>
                <button
    className="button button-secondary"
    onClick={logout}
>
    Logout
</button>
            </div>
        </div>
    );
}
