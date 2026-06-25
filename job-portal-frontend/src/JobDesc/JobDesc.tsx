import { Button, Divider } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const JobDesc = () => {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);

    useEffect(() => {
        API.get(`/jobs/${id}`)
           .then(res => setJob(res.data))
           .catch(err => console.log(err));
    }, [id]);

    if (!job) return <div className="w-2/3 text-mine-shaft-200">Loading Job Details...</div>;

    const data = DOMPurify.sanitize(job.description);

    return (
        <div className="w-2/3">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-600 rounded-xl ">
                        <img className="h-14" src={`/Icons/${job.companyName}.png`} onError={(e) => e.currentTarget.src = '/Icons/Google.png'} alt="logo" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-2xl ">{job.title}</div>
                        <div className="text-lg text-mine-shaft-200">{job.companyName} &bull; {job.applicantsCount || 0} Applicants</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <Link to={`/apply-job/${id}`}>
                        <Button color="brightSun.5" size="sm" variant="light">Apply</Button>
                    </Link>
                    <IconBookmark className="text-bright-sun-400 cursor-pointer" />
                </div>
            </div>
            
            <Divider my="xl" />
            
            <div className="flex justify-between">
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Experience</div>
                    <div className="font-semibold">{job.experience} Years</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Location</div>
                    <div className="font-semibold">{job.location}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Salary</div>
                    <div className="font-semibold">&#8377; {job.salary} LPA</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Job Type</div>
                    <div className="font-semibold">{job.jobType}</div>
                </div>
            </div>
            
            <Divider my="xl" />
            
            <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-300 [&_p]:text-justify" dangerouslySetInnerHTML={{ __html: data }}></div>
            
            <Divider my="xl" />
            
            <div>
                <div className="text-xl font-semibold mb-5">About Company</div>
                <div className="flex justify-between mb-3">
                    <div className="flex gap-2 items-center">
                        <div className="p-3 bg-mine-shaft-600 rounded-xl ">
                            <img className="h-8" src={`/Icons/${job.companyName}.png`} onError={(e) => e.currentTarget.src = '/Icons/Google.png'} alt="logo" />                    
                        </div>
                        <div className="flex flex-col ">
                            <div className="font-medium text-lg ">{job.companyName}</div>
                        </div>
                    </div>
                </div>
                <div className="text-mine-shaft-400 text-justify">
                    Leading company providing excellent career opportunities.
                </div>
            </div>
        </div>
    );
}

export default JobDesc;