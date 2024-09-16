import { redirect } from "@remix-run/node";
export async function checkCookie({ request }: { request: Request }) {
  const userToken = request.headers.get("Cookie");
  if (userToken) {
    const cookies = new URLSearchParams(userToken);
    const myCookie = cookies.get("token");
    console.log(`cookie`,myCookie);
    // console.log(process.env.API_URL);
    const cookieRes = await fetch(
      `${process.env.API_URL}/api/validate-token`,
      {
        headers: {
          Authorization: `Bearer ${myCookie}`,
        },
      }
    );
    console.log(`Cookie stau`,cookieRes.status);
    if (cookieRes.status === 200) {
      return request;
    }
  }
  return redirect("/login");
}
