export const formTypes = {
  EmployeeDetails: "EmployeeDetailsForm",
  PersonalDetails: "PersonalDetailsForm",
  CommunicationDetails: "CommunicationDetailsForm",
};

type Inputs = {
  [key: string]: string | number;
};

let employeeDataObject: Inputs = {};

export const setEmployeeObject = (data: Inputs) => {
  employeeDataObject = { ...employeeDataObject, ...data };
  console.log(employeeDataObject, "updatedData");
};

export const getEmployeeObject = () => employeeDataObject;
