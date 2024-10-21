import axios from "axios";
import { useEffect, useState } from "react";
import { SelectItem } from "~/components/ui/select";

export const CountryNamesApiObject = () => {
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryNames = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        //sort in alphabetical order
        const countryNames = response.data.map(
          (country: any) => country.name.common
        );
        countryNames.sort();
        setCountryNames(countryNames);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching country names:", error);
      }
    };
    fetchCountryNames();
  }, []);
  return (
    <>
      {!isLoading &&
        countryNames.map((countryName, index) => (
          <SelectItem key={index} value={countryName}>
            {countryName}
          </SelectItem>
        ))}
    </>
  );
};
