import { createCookieSessionStorage, redirect } from "@remix-run/node";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set");
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "session",
      secure: true,
      secrets: [process.env.SESSION_SECRET],
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });

export const checkSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    return null;
  }
  return redirect("/login");
};
