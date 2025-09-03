"use client";
import React, { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // <-- prevent page reload
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            console.log(res);
            const data = await res.json();

            if (res.ok) {
                // login successful
                localStorage.setItem("token", data.token); // store JWT
                //router.push("/dashboard"); // redirect to dashboard
            } else {
                // login failed
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    }

    return (
        <div className="login-container">
            <h1>Client Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type={"password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
