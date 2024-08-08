import { redirect } from "@remix-run/node";

export async function checkCookie({ request }: { request: Request }) {
  const userToken = request.headers.get("Cookie");
  if (userToken) {
    const cookies = new URLSearchParams(userToken);
    const myCookie = cookies.get("token");
    // console.log(myCookie !== "undefined");
    const cookieRes = await fetch('https://skolar-minds-api.proudsea-e117e491.southindia.azurecontainerapps.io/api/validate-token',{
      headers: {
        'Authorization': `Bearer ${myCookie}`
      }
    })
    if( cookieRes.status === 200) {
      return request
    }
  }
  return redirect("/login");
}
