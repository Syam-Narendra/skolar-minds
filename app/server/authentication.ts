import { redirect } from "@remix-run/node";

export function checkCookie({ request }: { request: Request }) {
  const userToken = request.headers.get("Cookie");
  if (!userToken || userToken === undefined || userToken === null) {
    return redirect("/");
  }
  if (userToken) {
    const cookies = new URLSearchParams(userToken);
    const myCookie = cookies.get("token");
    if (myCookie === undefined) {
      return request
    }
  }
  return null;
}
