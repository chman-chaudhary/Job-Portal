import { useEffect, useState } from "react";
import axios from "axios";
import { Button3Sm } from "./Button";
import { Link } from "react-router-dom";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://localhost:3000/job");
      setJobs(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="text-white pb-7 mt-[92px] mx-12 min-h-screen">
        {!jobs.length ? (
          <div className="w-full h-[80vh] flex justify-center items-center text-6xl font-semibold">
            Sorry😢, No Job Found...
          </div>
        ) : (
          jobs.map((job) => {
            return (
              <div key={job._id}>
                <Link to={`/job/${job._id}`} key={job._id}>
                  <div
                    key={job._id}
                    className="flex hover:bg-[#05061A] py-8 px-6"
                  >
                    <div className="custom-fonts container flex justify-between items-center">
                      <span className="space-x-4">
                        <span className="text-2xl font-bold leading-8">
                          {job.role}
                        </span>
                        <span className="text-[#9B9BA3]">
                          {job.companyName}
                        </span>
                      </span>
                      <span className="text-[#9B9BA3]">
                        <i className="fa-solid fa-location-dot text-white"></i>
                        &nbsp;&nbsp;
                        {job.location}
                      </span>
                    </div>
                    <Button3Sm text="APPLY" />
                  </div>
                </Link>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
