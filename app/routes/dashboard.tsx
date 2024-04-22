import type { MetaFunction } from "@remix-run/node";
import { MdPeople } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FcStatistics } from "react-icons/fc";
import { Link, Outlet } from "@remix-run/react";
import "../components/css/dashboard.css";
export const meta: MetaFunction = () => {
  return [
    { title: "Skolar Minds" },
    { name: "description", content: "Skolar Minds" },
  ];
};

const DashboardNavItems = [
  {
    to: "/dashboard",
    icon: <HomeIcon className="w-4 h-4" />,
    label: "Home",
  },
  {
    to: "/dashboard/students",
    icon: <MdPeople className="w-4 h-4" />,
    label: "Students",
  },
  {
    to: "/dashboard/staff",
    icon: <GiTeacher className="w-4 h-4" />,
    label: "Staff",
  },
  {
    to: "/dashboard/stats",
    icon: <FcStatistics className="w-4 h-4" />,
    label: "Statistics",
  },
];

export default function Dashboard() {
  return (
    <div className="max-h-screen">
      <div className="flex justify-end items-center bg-stone-950">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          className="w-5 h-5 m-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <img
          src="https://i.ibb.co/YcqQrJQ/Png-Item-4042710.png"
          alt="Profile-Image"
          className="rounded-full w-8 h-8 m-2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 48 48"
          height="48"
          width="48"
          id="Arrow-Down-3--Streamline-Plump"
          className="w-3 m-2 h-3"
        >
          <g id="arrow-down-3--arrow-down-keyboard">
            <path
              id="Vector 134 (Stroke)"
              fill="white"
              fill-rule="evenodd"
              d="M24.3618 25.0332C24.1615 25.2117 23.8603 25.2119 23.6598 25.0337C22.1714 23.7108 16.1102 18.3175 8.5013 11.4709C7.3348 10.4212 5.7645 9.8002 4.3634 10.507C3.7431 10.82 3.0524 11.2798 2.3618 11.955C1.5579 12.7411 1.0527 13.5269 0.7352 14.2043C0.1654 15.42 0.6146 16.7742 1.442 17.8314C7.2087 25.1997 15.4738 32.4747 20.2367 36.4249C22.4389 38.2514 25.5836 38.2518 27.7858 36.4255C32.5498 32.475 40.8145 25.1986 46.5631 17.8291C47.3864 16.7737 47.8328 15.4234 47.2661 14.2108C46.9488 13.5319 46.4429 12.7435 45.6365 11.9551C44.9463 11.2803 44.2562 10.8206 43.6362 10.5076C42.2347 9.7998 40.6635 10.4208 39.4965 11.4712C31.8914 18.3166 25.8466 23.7094 24.3618 25.0332Z"
              clip-rule="evenodd"
              stroke-width="0.5"
            ></path>
          </g>
        </svg>
      </div>
      <div className="flex flex-row relative max-h-screen">
        <aside className="flex flex-col left-0 top-0 h-screen w-56 bg-black border-r border-gray-500 text-white p-4 fixed">
          <div className="flex mb-4 space-x-1">
            <img
              alt="Company Logo"
              height="30"
              src="../../education.png"
              style={{
                aspectRatio: "30/30",
                objectFit: "cover",
              }}
              width="30"
            />
            <h1 className="text-lg font-medium">School Name</h1>
          </div>
          <nav className="space-y-2">
            {DashboardNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="w-full flex items-center space-x-2 nav-item py-2 px-2 rounded-lg text-white"
              >
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex mt-auto justify-between ">
            <p>Logout</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </div>
        </aside>

        <div className="ml-52 w-full h-lvh p-4 staff-dashboard">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
