import React, { useEffect, useState } from "react";
import { Button3, Button3Sm } from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function OpenRoles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("https://job-portal-server-91sy.onrender.com/home");
      setRoles(response.data);
    }
    fetchData();
  }, [])

  return (
    <div className="bg-black">
      <h2 className={`text-white font-bold text-7xl custom-fonts text-center pt-24 ${roles.length ? "block" : "hidden"}`}>
        Open Roles
      </h2>
      <div className="text-white pb-7 mt-16 mx-12">
        <hr />
        {roles.map((role) => {
          return (
            <div key={role._id}>
              <Link to={`/job/${role._id}`}>
                <div className="flex hover:bg-[#05061A] py-8 px-6">
                  <div className="custom-fonts container flex justify-between items-center">
                    <span className='space-x-4'>
                      <span className="text-2xl font-bold leading-8">
                        {role.role}
                      </span>
                      <span className="text-[#9B9BA3]">
                        {role.companyName}
                      </span>
                    </span>
                    <span className="text-[#9B9BA3]">
                      <i className="fa-solid fa-location-dot text-white"></i>
                      &nbsp;&nbsp;
                      {role.location}
                    </span>
                  </div>
                  <Button3Sm text="APPLY" />
                </div>
                <hr />
              </Link>
            </div>
          );
        })}
      </div>
      <div className={`flex justify-center ${roles.length ? "block" : "hidden"}`}>
        <Link to="/jobs"><Button3 text="Show More" /></Link>
      </div>
    </div>
  );
}
