import router from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../media/Settings.module.css";

interface Settings {
    logo: Buffer | null;
    backgroundColor: string;
    progresColor: string;
    progresShadowColor: string;
    textColor: string;
    LightTextColor: string;
    showAvgLine: boolean;
}

function Settings() {
    const [settings, setSettings] = useState<Settings>({
        logo: null,
        backgroundColor: "#ffffff",
        progresColor: "#000000",
        progresShadowColor: "#cccccc",
        textColor: "#000000",
        LightTextColor: "#999999",
        showAvgLine: true,
    });

    //api
    async function fetchSettings() {
        try {
            const res = await fetch("/api/backend/getSettings", {
                credentials: "include",
            });

            if (!res.ok) router.push("/login");

            const setin = await res.json();

            setSettings((prev) => ({ ...prev, ...setin }));
        } catch (err) {
            console.error("Error fetching settings:", err);
            router.push("/login");
        }
    }

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //deconstructing React form input
        const { name, type, value, checked } = e.target;

        setSettings((prev) => ({
            //most recent state
            ...prev,
            //name is within input
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const url = reader.result as string;

            // If the logo includes a data URL prefix, remove it
            let logoBytes = null;
            if (url?.startsWith("data:")) {
                const base64 = url.split(",")[1]; // strip "data:image/png;base64,"
                logoBytes = Buffer.from(base64, "base64");
            }

            setSettings((prev) => ({
                ...prev,
                logo: logoBytes,
            }));
        };
        reader.readAsDataURL(file);
    };

    const bytesToString = (bytes: Buffer) => {
        return Buffer.from(bytes).toString("base64");
    };

    async function handleSave() {
        try {
            const res = await fetch("/api/backend/updateSettings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(settings),
            });

            if (!res.ok) throw new Error("Failed to update settings");

            console.log("✅ Settings updated:");
            alert("Settings saved successfully!");
        } catch (err) {
            console.error("Error saving settings:", err);
            alert("Error saving settings");
        }
    }

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <h1>Widget Settings</h1>
            </header>

            <section className={styles.section}>
                <div className={styles.field}>
                    <label>Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                    />
                    {settings.logo && (
                        <div className={styles.previewWrapper}>
                            <Image
                                src={`data:image/png;base64,${bytesToString(
                                    settings.logo
                                )}`}
                                alt="Logo preview"
                                width={150}
                                height={150}
                                className={styles.preview}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.field}>
                    <label>Background Color</label>
                    <input
                        type="color"
                        name="backgroundColor"
                        value={settings.backgroundColor}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <label>Progress Color</label>
                    <input
                        type="color"
                        name="progresColor"
                        value={settings.progresColor}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <label>Progress Shadow Color</label>
                    <input
                        type="color"
                        name="progresShadowColor"
                        value={settings.progresShadowColor}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <label>Text Color</label>
                    <input
                        type="color"
                        name="textColor"
                        value={settings.textColor}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <label>Light Text Color</label>
                    <input
                        type="color"
                        name="LightTextColor"
                        value={settings.LightTextColor}
                        onChange={handleChange}
                    />
                </div>

                <div className={`${styles.field} ${styles.checkbox}`}>
                    <label>Show Average on Results</label>
                    <input
                        type="checkbox"
                        name="showAvgLine"
                        checked={settings.showAvgLine}
                        onChange={handleChange}
                    />
                </div>

                <p className={styles.note}>
                    would you like to be able to show an offer (estimate price)
                    to the client within your widget? if so please contact the
                    developer and let him know in which way this price could be
                    calculated and he will get to it.
                </p>

                <button className={styles.saveButton} onClick={handleSave}>
                    Save Changes
                </button>
            </section>
        </main>
    );
}

export default Settings;

// <div>
//     settings
//     <p>
//         , logo, area (of map) -------- color scheme (background,
//         progressbar - (same as..), progress - buttons, accent?) text -
//         (light text) avg - on of bold black
//     </p>

// </div>
