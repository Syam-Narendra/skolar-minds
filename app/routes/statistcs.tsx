import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Dashboard from "~/customComponents/Dashboard";
import { checkCookie } from "~/server/authentication";

export const loader: LoaderFunction = async ({ request }) => {
  return checkCookie({ request });
};
const Stats = () => {
  const loader = useLoaderData();

  return (
    <Dashboard>
      <div className="flex flex-col text-center items-center justify-center min-h-full bg-[#E6FCFF]">
        <div className="text-4xl font-bold text-[#008080] my-10">
          School Statistcs
        </div>
        <div className="flex flex-wrap gap-4 w-3/4">
          <div className="flex flex-grow w-52 flex-col items-center justify-center py-4 px-6 rounded-xl bg-[#FFCCE6] text-[#800000] font-semibold text-lg hover:bg-[#FF99CC] transition-colors duration-300">
            <h1>No.of Students</h1>
            <p>146</p>
          </div>
          <div className="flex w-52 flex-grow flex-col items-center justify-center py-4 px-6 rounded-xl bg-[#E6E6FA] text-[#000080] font-semibold text-lg hover:bg-[#CCCCFF] transition-colors duration-300">
            <h1>No.of Teaching Staff</h1>
            <p>24</p>
          </div>
          <div className="flex flex-grow w-52 flex-col items-center justify-center py-4 px-6 rounded-xl bg-[#E6FAE6] text-[#008000] font-semibold text-lg hover:bg-[#CCFFCC] transition-colors duration-300">
            <h1>No.of Non Teaching Staff</h1>
            <p>13</p>
          </div>
          <div className="flex flex-grow w-52 flex-col items-center justify-center py-4 px-6 rounded-xl bg-[#FAE6E6] text-[#800000] font-semibold text-lg hover:bg-[#FFCCCC] transition-colors duration-300">
            <h1>Total Fee Collected</h1>
            <p>₹17999</p>
          </div>
          <div className="flex flex-grow w-52 flex-col items-center justify-center py-4 px-6 rounded-xl bg-[#FFCCE6] text-[#800000] font-semibold text-lg hover:bg-[#FF99CC] transition-colors duration-300">
            <h1>Total Fee Pending</h1>
            <p>₹13572</p>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Stats;
