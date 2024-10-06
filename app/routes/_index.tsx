import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { checkCookie } from "~/server/authentication";
import { checkSession, getSession } from "~/server/sessions";
export const loader: LoaderFunction = async ({ request }) => {
  return await checkSession(request);
};
const Home = () => {
  const loader = useLoaderData();
  return <div>Home</div>;
};

export default Home;
