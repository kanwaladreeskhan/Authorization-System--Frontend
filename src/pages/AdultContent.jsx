import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdultContent() {

    const [allowed, setAllowed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {

        const checkAge = async () => {

            try {
                const token = localStorage.getItem("access_token");

                await api.get(
                    "adult-content/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setAllowed(true);
                setStatusMessage("Age verified. You can access the adult content portal.");
            } catch {
                setAllowed(false);
                setStatusMessage("Age restriction prevents access. Only users 18 or older may continue.");
            } finally {
                setLoading(false);
            }
        };

        checkAge();

    }, []);

    return (
        <div className="page-shell">
            <div className="page-card">
                <h1>Adult Content Portal</h1>
                <p className="subtitle">This page verifies age before granting access to restricted material.</p>

                {loading ? (
                    <div className="status-box status-box-warning">
                        Checking age verification...
                    </div>
                ) : (
                    <>
                        {allowed ? (
                            <>
                                <div className="status-box status-box-success">{statusMessage}</div>
                                <ul className="info-list">
                                    <li>Premium Movies</li>
                                    <li>Restricted Library</li>
                                    <li>Adult Gaming</li>
                                </ul>
                            </>
                        ) : (
                            <div className="status-box status-box-error">{statusMessage}</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

