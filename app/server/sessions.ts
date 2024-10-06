import { createCookieSessionStorage, redirect } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "session",
      secure: true,
      secrets: ["s3cr3t"],
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
