import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { checkSession } from "~/server/sessions";
export const loader: LoaderFunction = async ({ request }) => {
  return await checkSession(request);
};
const Home = () => {
  const loader = useLoaderData();
  return <div>Home</div>;
};

export default Home;
