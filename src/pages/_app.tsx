import "../media/global.css";
import "../media/login.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>SolarIQ</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
