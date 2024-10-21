import { LoaderFunction, Session } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { StudentForm } from "~/customComponents/StudentSection/AddNewStudent";
import { AllStudents } from "~/customComponents/StudentSection/AllStudents";
import { checkSession } from "~/server/sessions";



export const loader: LoaderFunction = async ({ request }) => {
  const session = await checkSession(request);
  return session;
};

export default function Students() {
  const session = useLoaderData() as Session;
  const studentCategoryList = [
    {
      category: "All Students",
      component: <AllStudents session={session} />,
    },
    {
      category: "Add Student",
      component: <StudentForm session={session} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(studentCategoryList[0]);

  return (
    <div className="w-full flex flex-col">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {studentCategoryList.map((each) => (
          <button
            key={each.category}
            onClick={() => setActiveTab(each)}
            className={`py-2 px-4 text-center focus:outline-none ${
              activeTab.category === each.category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {each.category}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div key={activeTab.category}>{activeTab.component}</div>
      </div>
    </div>
  );
}
