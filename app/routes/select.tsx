export default function Select() {
    const selectOptions =[
        {
            id: 1,
            name: "Option 1",
            value: "option1",
        },
        {
            id: 2,
            name: "Option 2",
            value: "option2",
        },
        {
            id: 3,
            name: "Option 3",
            value: "option3",
        },
        {
            id:4,
            name: "Option 4",
            value: "option4",
        }
    ]
  return (
    <div>
      <select className="bg-black text-white">
        {
            selectOptions.map(option=>(
                <option key={option.id} value={option.value}>{option.name}</option>
            ))
        }
      </select>
    </div>
  );
}
