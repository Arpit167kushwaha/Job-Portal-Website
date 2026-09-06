import { Button, Divider, Badge } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconSend } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const JobDesc = () => {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        API.get(`/jobs/${id}`)
           .then(res => setJob(res.data))
           .catch(err => console.log(err));
    }, [id]);

    const handleBookmark = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to save jobs.');
            return;
        }

        setSaving(true);
        try {
            if (saved) {
                await API.delete(`/savedJobs/unsave/${id}`);
                setSaved(false);
            } else {
                await API.post(`/savedJobs/save/${id}`);
                setSaved(true);
            }
        } catch (err: any) {
            console.error(err);
            if (err.response?.data?.message?.includes('Already Saved')) {
                setSaved(true);
            }
        } finally {
            setSaving(false);
        }
    };

    if (!job) return <div className="w-2/3 text-mine-shaft-200 py-10">Loading Job Details...</div>;

    const data = DOMPurify.sanitize(job.description || '');

    return (
        <div className="w-2/3">
            <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                    <div className="p-3 bg-mine-shaft-600 rounded-xl">
                        <img className="h-14" src={`/Icons/${job.companyName || 'Google'}.png`} onError={(e) => e.currentTarget.src = '/Icons/Google.png'} alt="logo" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-2xl text-white">{job.title}</div>
                        <div className="text-lg text-mine-shaft-200 flex items-center gap-2">
                            <span>{job.companyName}</span> &bull; 
                            <span className="text-sm">{job.applicantsCount || 0} Applicants</span>
                            {job.jobStatus && (
                                <Badge color={job.jobStatus === 'ACTIVE' ? 'teal' : 'gray'} variant="light" size="sm">
                                    {job.jobStatus}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        type="button"
                        onClick={handleBookmark}
                        disabled={saving}
                        className="text-mine-shaft-300 hover:text-bright-sun-400 transition p-2 cursor-pointer bg-mine-shaft-700 rounded-lg border-none flex items-center justify-center"
                        title={saved ? "Saved" : "Save Job"}
                    >
                        {saved ? (
                            <IconBookmarkFilled className="text-bright-sun-400" size={22} />
                        ) : (
                            <IconBookmark size={22} />
                        )}
                    </button>
                    {job.jobStatus !== 'CLOSED' && (
                        <Link to={`/apply-job/${id}`}>
                            <Button leftSection={<IconSend size={16} />} color="brightSun.5" size="sm" variant="filled">
                                Apply Now
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            
            <Divider my="xl" color="mineShaft.7" />
            
            <div className="flex justify-between bg-mine-shaft-700/50 p-4 rounded-xl">
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Experience</div>
                    <div className="font-semibold text-white">{job.experience ?? 0} Years</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Location</div>
                    <div className="font-semibold text-white">{job.location || 'Remote'}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Salary</div>
                    <div className="font-semibold text-bright-sun-400">₹{job.salary ? `${job.salary} LPA` : 'N/A'}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-sm text-mine-shaft-300">Job Type</div>
                    <div className="font-semibold text-white">{job.jobType || 'FULLTIME'}</div>
                </div>
            </div>
            
            <Divider my="xl" color="mineShaft.7" />
            
            <div>
                <div className="text-xl font-semibold mb-4 text-white">Job Description</div>
                <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-200 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_p]:text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: data }}></div>
            </div>
            
            <Divider my="xl" color="mineShaft.7" />
            
            <div>
                <div className="text-xl font-semibold mb-4 text-white">About {job.companyName}</div>
                <div className="flex justify-between mb-3">
                    <div className="flex gap-2 items-center">
                        <div className="p-3 bg-mine-shaft-600 rounded-xl ">
                            <img className="h-8" src={`/Icons/${job.companyName || 'Google'}.png`} onError={(e) => e.currentTarget.src = '/Icons/Google.png'} alt="logo" />                    
                        </div>
                        <div className="flex flex-col ">
                            <div className="font-medium text-lg text-white">{job.companyName}</div>
                        </div>
                    </div>
                </div>
                <div className="text-mine-shaft-300 text-justify">
                    A prominent company providing exceptional opportunities, inclusive culture, and industry leading benefits.
                </div>
            </div>
        </div>
    );
}

export default JobDesc;