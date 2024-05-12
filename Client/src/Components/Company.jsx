import { useState, useEffect } from "react";
import axios from "axios";

export default function Company() {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let response = await axios.get("https://recruitment-agency-api.vercel.app/companies");
      console.log(response.data);
      setCompanyData(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="Company">
        <h1 className="text-3xl mt-4">Companies</h1>
        {companyData.map((company) => (
          <div key={company._id} className="border-2 border-black m-1">
            <p>{company.name}</p>
            <p>{company.industry}</p>
            <p>{company.location}</p>
          </div>
        ))}
      </div>
    </>
  );
}
