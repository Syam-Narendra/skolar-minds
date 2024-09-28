import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { checkCookie } from "~/server/authentication";
export const loader: LoaderFunction = async ({ request }) => {
  return checkCookie({ request });
};
const Home = () => {
  const loader = useLoaderData();
  return <div>Home</div>;
};

export default Home;
