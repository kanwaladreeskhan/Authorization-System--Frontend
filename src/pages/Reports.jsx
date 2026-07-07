import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Reports() {

    const [allowed, setAllowed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {

        const fetchReports = async () => {

            try {

                const token = localStorage.getItem("access_token");

                // ACL check
                await api.get(
                    "reports/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                // Fetch user permissions
                const response = await api.get(
                    "my-permissions/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setPermissions(response.data);
                setAllowed(true);
                setStatusMessage("Your account has permission to view report summaries.");

            } catch {

                setAllowed(false);
                setStatusMessage("Access denied. Please ask your administrator to grant report access.");

            } finally {

                setLoading(false);
            }
        };

        fetchReports();

    }, []);

    return (
        <div className="page-shell">
            <div className="page-card">

                <h1>Reports Module</h1>

                <p className="subtitle">
                    This section checks whether your account is authorized to view reports.
                </p>

                {loading ? (

                    <div className="status-box status-box-warning">
                        Checking permissions...
                    </div>

                ) : (

                    <>
                        {allowed ? (

                            <>
                                <div className="status-box status-box-success">
                                    {statusMessage}
                                </div>

                                <ul className="info-list">

                                    {permissions
                                        .filter((p) => p.can_view)
                                        .map((p) => (
                                            <li key={p.resource}>
                                                {p.resource
                                                    .replace(/_/g, " ")
                                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                                            </li>
                                        ))}

                                </ul>
                            </>

                        ) : (

                            <div className="status-box status-box-error">
                                {statusMessage}
                            </div>

                        )}
                    </>

                )}

            </div>
        </div>
    );
}