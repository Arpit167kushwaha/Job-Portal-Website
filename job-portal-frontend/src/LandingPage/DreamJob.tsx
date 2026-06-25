import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const DreamJob = () => { 
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        API.get('/jobs')
            .then((response) => {
                const result = Array.isArray(response.data) ? response.data : response.data?.content || [];
                setJobs(result);
            })
            .catch(() => setJobs([]));
    }, []);

    const featuredJob = jobs[0];
    const uniqueCompanies = jobs
        .map((job) => job.companyName)
        .filter(Boolean)
        .filter((company, index, array) => array.indexOf(company) === index);

    return (
        <div className="flex items-center px-16">
            <div className="flex flex-col w-[45%] gap-4">
                    <div className="text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400 ">Find your <span>DREAM</span> <span>JOB</span> with us</div>
                    <div className="text-lg text-mine-shaft-200">Good life begins with a good company. Start exploring thousands of jobs in one place.</div>
                    <div className="flex gap-3 mt-5">  
                         <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100" variant="unstyled" label="Job title" placeholder="Software Engineer" />
                         <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100" variant="unstyled" label="Job Type" placeholder="FullTime" />
                         <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
                            <IconSearch className="h-[85%] w-[85%]" stroke={2} />
                         </div>
                    </div>
            </div>
            <div className="w-[55%] flex items-center justify-center">
                    <div className="w-[30rem] relative">
                         <img  src="boy.png" alt="Boy"/>
                         <div className="absolute -right-10 w-fit top-[50%] border-bright-sun-400 border rounded p-2 backdrop-blur-md">
                                                        <div className="text-center mb-1 text-sm text-mine-shaft-100">{jobs.length} live jobs</div>
                              <Avatar.Group>
                                                                        {uniqueCompanies.slice(0, 3).map((company) => (
                                                                                <Avatar key={company} src={`/Companies/${company}.png`}>
                                                                                        {company?.[0]}
                                                                                </Avatar>
                                                                        ))}
                                                                        {uniqueCompanies.length > 3 && <Avatar>+{uniqueCompanies.length - 3}</Avatar>}
                                    </Avatar.Group>
                         </div>
                         <div className="absolute -left-10 w-fit top-[46%] border-bright-sun-400 border rounded p-2 backdrop-blur-md ">
                            <div className="flex gap-2 items-center">
                                      <div className="w-10 h-10 p-1 bg-mine-shaft-700 rounded-lg">
                                                                                         <img src={`/Icons/${featuredJob?.companyName || 'Google'}.png`} alt="" onError={(event) => (event.currentTarget.src = '/Icons/Google.png')} />
                                      </div> 
                                      <div>
                                                                                <div className="text-sm text-mine-shaft-100">{featuredJob?.title || 'No jobs yet'}</div>
                                                                                <div className="text-mine-shaft-200 text-xs">{featuredJob?.location || 'Add your first job listing'}</div>
                                      </div>
                            </div>
                            <div className=" pt-2 flex gap-2 text-mine-shaft-200 text-xs">
                                <span>
                                                                                {featuredJob ? 'Latest from MySQL' : 'Waiting for data'}
                                </span>
                                <span>
                                                                                 {featuredJob?.applicantsCount || 0} Applicants
                                </span>
                            </div>
                         </div> 


                    </div>
            </div>
        </div>
    );
}
export default DreamJob;