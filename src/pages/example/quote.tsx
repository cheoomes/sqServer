import background from "../../media/sunshine_mills_inc_cover.jpeg";

export default function QuotePage() {
    return (
        <div className="page">
            <header className="header">
                <div className="logoSection">
                    <div className="logo">☀️</div>
                    <div className="businessName">Sunnies</div>
                </div>

                <nav className="nav">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#quote" className="active">
                        Get Quote
                    </a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <iframe
                src="http://localhost:3001?apiKey=client_e162fc91ab79d712ebfa600a7f60235a"
                className="iframe"
            />

            <style jsx>{`
                * {
                    box-sizing: border-box;
                }

                .page {
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    font-family:
                        "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                    background-image: url("/sunshine_mills_inc_cover.jpeg");
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-bottom: 10px;
                    background-color: lightgray;
                }

                .header {
                    width: 100%;
                    color: #ffffff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background: linear-gradient(
                        135deg,
                        #1a472a 0%,
                        #2d6a4f 100%
                    );
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                }

                .logoSection {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo {
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #ffd700;
                }

                .businessName {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .nav {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }

                .nav a {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }

                .nav a:hover {
                    color: #ffd700;
                    background: rgba(255, 255, 255, 0.1);
                }

                .active {
                    color: #ffd700;
                    border-bottom: 2px solid #ffd700;
                }

                .iframe {
                    margin-top: 2rem;
                    width: 70%;
                    max-width: 900px;
                    height: 600px;
                    border: none;
                    border-radius: 16px;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
