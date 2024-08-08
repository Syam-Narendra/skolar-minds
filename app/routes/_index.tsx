import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Dashboard from "~/customComponents/Dashboard";
import { checkCookie } from "~/server/authentication";
export const loader: LoaderFunction = async ({ request }) => {
  return checkCookie({ request });
};
const Home = () => {
  const loader = useLoaderData();
  return (
    <Dashboard>
      <div className="text-white">Home</div>
    </Dashboard>
  );
};

export default Home;
