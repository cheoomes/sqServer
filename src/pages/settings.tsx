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
                , logo, area (of map) -------- color scheme (background,
                progressbar - (same as..), progress - buttons, accent?) text -
                (light text) avg - on of bold black
            </p>
            <p>
                would you like to pitch an (estimate) price immediatly? if so
                please contact me to let me know how this could be calculated
                and I will get it done
            </p>
        </div>
    );
}

export default Settings;
