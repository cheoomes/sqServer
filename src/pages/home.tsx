import { useEffect, useState } from "react";
import router from "next/router";
import { error } from "console";
import LeadsTable from "./components/leadsTable";

export default function Home() {
    const [userId, setUserId] = useState<Number | null>(null);
    const [leads, setLeads] = useState([]);

    async function checkUser() {
        try {
            const res = await fetch("/api/backend/getAuthentication", {
                method: "GET",
                credentials: "include", // ensures cookies are sent
            });
            if (res.ok) {
                const data = await res.json();
                setUserId(data.user.id);
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.error("Network or unexpected error:", error);
            router.push("/login");
        }
    }

    async function getLeads(clientId: Number) {
        try {
            const res = await fetch(
                `/api/backend/getLeads?clientId=${clientId}`,
                {
                    method: "GET",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch leads");
            }
            const leads = await res.json();
            console.log(leads);
            setLeads(leads);

            return leads;
        } catch (error) {
            console.error("problem ..", error);
            return [];
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        if (userId) {
            getLeads(userId);
        }
    }, [userId]);

    if (!userId) {
        return <p>Loading...</p>;
    }

    return (
        <main style={{ padding: "20px" }}>
            <h1>Welcome, user {String(userId)}</h1>

            <button
                onClick={() => router.push("/settings")}
                style={{ marginBottom: "20px" }}
            >
                Go to Settings
            </button>

            <LeadsTable leads={leads} />
        </main>
    );
}
