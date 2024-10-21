import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigation,
} from "@remix-run/react";

import type {
  LinksFunction,
  LoaderFunction,
  Session,
  SessionData,
} from "@remix-run/node";
import { ThemeProvider } from "~/components/theme-provider";
import Dashboard from "./customComponents/Dashboard";
import ErrorPage from "./customComponents/error";
import styles from "./tailwind.css?url";
import LoadingPage from "./customComponents/LoadingPage";
import { getSession } from "./server/sessions";

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

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    // console.log("session", session.get("token"));
    const userToken = session.data.token;
    const cookieRes = await fetch(`${process.env.API_URL}/api/get-home-data`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = (await cookieRes.json()) as { schoolName: string };
    // console.log("data in root>>>>>>", data);
    return data.schoolName;
  }
  return null;
};

export default function App() {
  const location = useLocation();
  const navigation = useNavigation();
  const loader = useLoaderData<string | null>();

  return (
    <>
      {loader !== null && <Dashboard schoolName={loader as string} />}
      <div className={`${loader !== null && "lg:ml-56"}`}>
        <Outlet />
        {navigation.state === "loading" && <LoadingPage />}
      </div>
    </>
  );
}
export const ErrorBoundary = () => <ErrorPage />;
