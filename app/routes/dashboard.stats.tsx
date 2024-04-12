const Stats = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center w-full h-screen bg-[#E6FCFF]">
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
  );
};

function DivideIcon(props: any) {
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
      <circle cx="12" cy="6" r="1" />
      <line x1="5" x2="19" y1="12" y2="12" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  );
}

function MinusIcon(props: any) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default Stats;
