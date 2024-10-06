import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import { ThemeProvider } from "~/components/theme-provider";
import Dashboard from "./customComponents/Dashboard";
import ErrorPage from "./customComponents/error";
import styles from "./tailwind.css?url";
import LoadingPage from "./customComponents/LoadingPage";

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
  const location = useLocation();
  const navigation = useNavigation();
  const hideDashboardRoutes = ["/login", "/signup"];
  const containerClassName = hideDashboardRoutes.includes(location.pathname)
    ? "lg:ml-0"
    : "lg:ml-56";

  return (
    <>
      {!hideDashboardRoutes.includes(location.pathname) && <Dashboard />}
      <div className={containerClassName}>
        {navigation.state === "loading" && (
          <LoadingPage/>
        )}
        <Outlet />
      </div>
    </>
  );
}

export const ErrorBoundary = () => <ErrorPage />;
