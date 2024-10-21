import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { checkSession } from "~/server/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  return await checkSession(request);
};

export default function FeeStructure() {
  const loader = useLoaderData();

  return (
    <main className="flex-grow p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Fee Structure</h1>
      </div>
    </main>
  );
}
