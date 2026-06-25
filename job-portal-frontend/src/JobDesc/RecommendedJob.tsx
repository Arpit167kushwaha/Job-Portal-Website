import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import JobCard from "../FindJobs/JobCard";

const RecommendedJob =()=>{ 
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    API.get('/jobs')
      .then((response) => {
        const result = Array.isArray(response.data) ? response.data : response.data?.content || [];
        setJobs(result.slice(0, 6));
      })
      .catch(() => setJobs([]));
  }, []);

  return  <div>
        <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
        <div className="flex flex-col flex-wrap gap-5 justify-between">
          {
          jobs.map((job,index) => <JobCard key={job.id || index}{...job}/>)
          }
        </div>
    </div>
}

export default RecommendedJob;