import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";
import { ThemeProvider } from "~/components/theme-provider";
import ErrorPage from "./customComponents/error";
import Dashboard from "./customComponents/Dashboard";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Skolar Minds</title>
        <link rel="icon" href="../pngwing.com.png" type="image/png"></link>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider storageKey="vite-ui-theme">
          {children}
          <ScrollRestoration />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Dashboard />
      <div className="lg:ml-56">
        <Outlet />
      </div>
    </>
  );
}

export const ErrorBoundary = () => <ErrorPage />;
