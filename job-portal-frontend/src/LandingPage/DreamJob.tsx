import { Avatar, TextInput, Select, Button } from "@mantine/core";
import { IconSearch, IconBriefcase, IconSparkles } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const DreamJob = () => { 
    const [jobs, setJobs] = useState<any[]>([]);
    const [titleQuery, setTitleQuery] = useState('');
    const [jobTypeQuery, setJobTypeQuery] = useState<string | null>(null);
    const navigate = useNavigate();

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

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams();
        if (titleQuery.trim()) params.append('title', titleQuery.trim());
        if (jobTypeQuery) params.append('jobType', jobTypeQuery);

        navigate(`/find-jobs?${params.toString()}`);
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 gap-10">
            <div className="flex flex-col w-full lg:w-[48%] gap-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bright-sun-400/10 border border-bright-sun-400/30 text-bright-sun-400 text-xs font-semibold w-fit">
                    <IconSparkles size={14} /> #1 Job Portal for Tech Careers
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                    Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-sun-400 to-amber-500">DREAM JOB</span> with us
                </div>

                <div className="text-base sm:text-lg text-mine-shaft-300 leading-relaxed">
                    Connecting top tech talent with industry-leading companies. Search thousands of verified engineering, design, and product roles.
                </div>

                {/* Interactive Search Bar */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mt-3 p-2 bg-mine-shaft-900 border border-mine-shaft-700 rounded-2xl shadow-2xl">  
                    <TextInput
                        className="w-full sm:w-1/2"
                        variant="unstyled"
                        placeholder="Job title or keywords..."
                        value={titleQuery}
                        onChange={(e) => setTitleQuery(e.target.value)}
                        leftSection={<IconSearch size={18} className="text-mine-shaft-400" />}
                        styles={{
                            input: { color: '#fff', paddingLeft: '32px' }
                        }}
                    />

                    <Select
                        className="w-full sm:w-2/5"
                        variant="unstyled"
                        placeholder="Job Type"
                        data={['FULLTIME', 'PARTTIME', 'REMOTE', 'INTERN']}
                        value={jobTypeQuery}
                        onChange={setJobTypeQuery}
                        clearable
                        leftSection={<IconBriefcase size={18} className="text-mine-shaft-400" />}
                        styles={{
                            input: { color: '#fff', paddingLeft: '32px' }
                        }}
                    />

                    <Button
                        type="submit"
                        color="brightSun.5"
                        size="md"
                        radius="xl"
                        className="px-6 font-semibold shrink-0"
                    >
                        Search
                    </Button>
                </form>

                {/* Popular Tags */}
                <div className="flex items-center gap-2 text-xs text-mine-shaft-400 flex-wrap">
                    <span className="font-semibold text-mine-shaft-300">Popular:</span>
                    {['Java Developer', 'React.js', 'Spring Boot', 'Remote', 'Google'].map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => navigate(`/find-jobs?title=${encodeURIComponent(tag)}`)}
                            className="bg-mine-shaft-800 hover:bg-mine-shaft-700 hover:text-bright-sun-400 px-2.5 py-1 rounded-full border border-mine-shaft-700 transition cursor-pointer text-mine-shaft-300"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Hero Graphic */}
            <div className="w-full lg:w-[48%] flex items-center justify-center">
                <div className="w-[24rem] sm:w-[28rem] relative">
                    <img className="w-full object-contain drop-shadow-2xl" src="boy.png" alt="Candidate" />

                    {/* Floating Live Jobs Count */}
                    <div className="absolute -right-4 sm:-right-8 top-[35%] bg-mine-shaft-900/90 border border-bright-sun-400/40 rounded-2xl p-3 backdrop-blur-xl shadow-2xl">
                        <div className="text-xs text-mine-shaft-300 mb-1 font-medium">{jobs.length}+ Live Openings</div>
                        <Avatar.Group>
                            {uniqueCompanies.slice(0, 3).map((company) => (
                                <Avatar key={company} src={`/Icons/${company}.png`} size="sm" radius="xl">
                                    {company?.[0]}
                                </Avatar>
                            ))}
                            {uniqueCompanies.length > 3 && (
                                <Avatar size="sm" radius="xl" color="brightSun">
                                    +{uniqueCompanies.length - 3}
                                </Avatar>
                            )}
                        </Avatar.Group>
                    </div>

                    {/* Floating Featured Job */}
                    {featuredJob && (
                        <div className="absolute -left-4 sm:-left-8 bottom-[10%] bg-mine-shaft-900/90 border border-mine-shaft-700 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl max-w-[220px]">
                            <div className="flex gap-2.5 items-center">
                                <div className="w-9 h-9 p-1 bg-mine-shaft-800 rounded-xl flex items-center justify-center shrink-0">
                                    <img src={`/Icons/${featuredJob.companyName || 'Google'}.png`} alt="" onError={(event) => (event.currentTarget.src = '/Icons/Google.png')} />
                                </div> 
                                <div className="overflow-hidden">
                                    <div className="text-xs font-semibold text-white truncate">{featuredJob.title}</div>
                                    <div className="text-mine-shaft-400 text-[11px] truncate">{featuredJob.companyName} &bull; {featuredJob.location}</div>
                                </div>
                            </div>
                            <div className="pt-2 mt-2 border-t border-mine-shaft-800 flex justify-between text-[11px] text-mine-shaft-400">
                                <span className="text-bright-sun-400 font-semibold">₹{featuredJob.salary} LPA</span>
                                <span>{featuredJob.applicantsCount || 0} applied</span>
                            </div>
                        </div> 
                    )}
                </div>
            </div>
        </div>
    );
}

export default DreamJob;