import Link from "next/link";
import Image from "next/image";
import widgetPeak from "../media/img/widgetPeak.png";
import sheet from "../media/img/sheet.png";

export default function Home() {
    return (
        <div>
            {/* HEADER */}
            <header className="header">
                <div className="logo">
                    <span className="icon">☀️</span>
                    <h1>SolarIQ</h1>
                </div>

                <Link href="/login">
                    <button className="btn btn--primary">Login</button>
                </Link>
            </header>

            {/* HERO */}
            <section className="hero">
                <h2>turn more website visitors into leads</h2>
                <p className="heroText">
                    SolarIQ helps solar PV installers convert more website
                    traffic into qualified leads by giving visitors an instant,
                    personalized solar quote directly on your site.
                </p>
            </section>

            {/* EXPLANATION */}
            <section className="section">
                <div className="article">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 24,
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <h3>how does SolarIQ work?</h3>
                            <p className="paragraph">
                                we’ll handle the integration and tailor SolarIQ
                                to fit your website perfectly. from that moment
                                on, all your site visitors can get an instant
                                solar quote. all they need to do is: search for
                                their house, place a pin on the roof where they
                                want solar, and enter their household’s yearly
                                energy consumption in kWh. see what this looks
                                like in the example below {"->"}.
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: 20,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Link href="/widget">
                                        <button className="btn btn--primary">
                                            try SolarIQ
                                        </button>
                                    </Link>
                                    <span
                                        style={{
                                            fontSize: 13,
                                            color: "#888",
                                            marginTop: 4,
                                            fontStyle: "italic",
                                            display: "block",
                                            textAlign: "center",
                                        }}
                                    >
                                        (on a dummy site)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Image
                            src={widgetPeak}
                            alt="SolarIQ Widget Preview"
                            className="image"
                            width={520}
                            height={200}
                            priority
                        />
                    </div>
                </div>
                <div className="article">
                    <h3>how is the quote calculated?</h3>
                    <p className="paragraph">
                        we determine each visitor’s recommended solar system
                        using their average daily energy use, local solar
                        irradiance information from NASA’s API, and an assumed
                        80% system efficiency.
                    </p>
                </div>

                <div className="article">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 24,
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <h2>how will visitors find SolarIQ on my site?</h2>
                            <p className="paragraph">
                                we will add a button or section to your
                                site&#39;s homepage in the way you would like.
                            </p>
                        </div>
                        <Link href="/widget">
                            <button className="btn btn--primary">
                                see an example
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="article">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 24,
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <h3>how do I collect my leads from SolarIQ?</h3>
                            <p className="paragraph">
                                as soon as a visitor submits their information
                                through SolarIQ, the lead is instantly added to
                                your google sheet.
                            </p>
                        </div>
                        <Image
                            src={sheet}
                            alt="Widget preview"
                            className="image"
                            width={220}
                            height={150}
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                © {new Date().getFullYear()} SolarIQ
                <p className="footerContact">
                    for business inquiries email:{" "}
                    <a href="mailto:charlesanderson@appsunnly.com">
                        charlesanderson@appsunnly.com
                    </a>
                </p>
            </footer>
        </div>
    );
}
