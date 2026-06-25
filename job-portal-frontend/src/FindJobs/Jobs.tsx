import { useEffect, useState } from "react";
 
import JobCard from "./JobCard";
import Sort from "./Sort";
import { Loader, Text } from "@mantine/core";
import API from "../api/axiosInstance";
import sampleJobs from "../Data/JobsData";

const Jobs = ({ filters }: { filters?: any }) => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [displayedJobs, setDisplayedJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

   useEffect(() => {
    API.get("/jobs", { params: { ts: Date.now() } }) 
        .then((response) => {
            if (response.data && Array.isArray(response.data)) {
                setJobs(response.data);
            } else if (response.data && response.data.content) {
                setJobs(response.data.content);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching jobs:", err);
            // fallback to sample data for snapshots
            setJobs(sampleJobs as any);
            setLoading(false);
        });
}, []);

    useEffect(() => {
        const salaryRange = filters?.salaryRange ?? [0, 100];

        const filtered = jobs.filter((job) => {
            const title = String(job.title || '').toLowerCase();
            const location = String(job.location || '').toLowerCase();
            const experience = String(job.experience || '').toLowerCase();
            const jobType = String(job.jobType || '').toLowerCase();

            const selectedTitles = (filters?.title || []).map((value: string) => value.toLowerCase());
            const selectedLocations = (filters?.location || []).map((value: string) => value.toLowerCase());
            const selectedExperiences = (filters?.experience || []).map((value: string) => value.toLowerCase());
            const selectedJobTypes = (filters?.jobType || []).map((value: string) => value.toLowerCase());

            const titleMatch = !selectedTitles.length || selectedTitles.some((value: string) => title.includes(value));
            const locationMatch = !selectedLocations.length || selectedLocations.some((value: string) => location.includes(value));
            const experienceMatch = !selectedExperiences.length || selectedExperiences.includes(experience);
            const jobTypeMatch = !selectedJobTypes.length || selectedJobTypes.includes(jobType);
            const salaryInLpa = Number(job.salary || 0) / 100000;
            const salaryMatch = job.salary == null || (salaryInLpa >= salaryRange[0] && salaryInLpa <= salaryRange[1]);

            return titleMatch && locationMatch && experienceMatch && jobTypeMatch && salaryMatch;
        });

        setDisplayedJobs(filtered);
    }, [jobs, filters]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-10 mt-10">
                <Loader color="brightSun" size="md" />
                <Text mt="sm" c="dimmed">Fetching fresh jobs...</Text>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-10">
                <Text c="red" className="font-semibold">{error}</Text>
            </div>
        );
    }

    return (
        <div className="p-5">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Recommended Jobs</div>
                <Sort />
            </div>

            <div className="mt-10 flex flex-wrap gap-5 justify-between">
                {displayedJobs.length === 0 ? (
                    <Text c="dimmed" ta="center" className="w-full mt-5">
                        No jobs available right now.
                    </Text>
                ) : (
                    displayedJobs.map((job, index) => (
                        <JobCard key={job.id || index} {...job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Jobs;