import { redirect } from "@remix-run/node";
export async function checkCookie({ request }: { request: Request }) {
  const userToken = request.headers.get("Cookie");
  if (userToken) {
    const cookies = new URLSearchParams(userToken);
    const myCookie = cookies.get("token");
    const cookieRes = await fetch(`${process.env.API_URL}/api/validate-token`, {
      headers: {
        Authorization: `Bearer ${myCookie}`,
      },
    });
    if (cookieRes.status === 200) {
      return request;
    }
  }
  return redirect("/login", {
    headers: {
      "Set-Cookie": `token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}
