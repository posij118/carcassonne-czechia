import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";

import "./app.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";

import NavBar from "./components/nav-bar";

import { StrictMode, useState } from "react";
import { LangContext, type Lang } from "./i18n/lang-context";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>(
        navigator.language === "cs" || navigator.language === "sk" ? "cs" : "en"
    );

    return (
        <StrictMode>
            <LangContext value={{ lang, setLang }}>
                <PrimeReactProvider>
                    <html lang="en">
                        <head>
                            <meta charSet="utf-8" />
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1"
                            />
                            <title>Carcassonne Czechia</title>
                            <Meta />
                            <Links />
                        </head>
                        <body>
                            <NavBar />
                            <div className="main-content">{children}</div>
                            <ScrollRestoration />
                            <Scripts />
                        </body>
                    </html>
                </PrimeReactProvider>
            </LangContext>
        </StrictMode>
    );
}

export default function App() {
    return <Outlet />;
}

export function HydrateFallback() {
    return <></>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
