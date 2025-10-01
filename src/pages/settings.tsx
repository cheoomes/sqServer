import router from "next/router";
import React, { useEffect } from "react";

function Settings() {
    useEffect(() => {
        async function checkUser() {
            const res = await fetch("/api/authentication", {
                credentials: "include",
            });
            if (!res.ok) router.push("/login");
        }
        checkUser();
    }, []);

    return (
        <div>
            settings
            <p>
                color scheme (background, secondary, progress ...), logo, area
                (of map)
            </p>
        </div>
    );
}

export default Settings;
