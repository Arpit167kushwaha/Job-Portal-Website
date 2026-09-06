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
    const [savedJobIds, setSavedJobIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            API.get('/savedJobs', { params: { pageSize: 100 } })
                .then((res) => {
                    const savedList = Array.isArray(res.data) ? res.data : res.data?.content || [];
                    const ids = new Set<number>(savedList.map((j: any) => j.id));
                    setSavedJobIds(ids);
                })
                .catch(() => undefined);
        }

        API.get("/jobs", { params: { ts: Date.now(), pageSize: 50 } }) 
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
                setJobs(sampleJobs as any);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const salaryRange = filters?.salaryRange ?? [0, 100];

        const filtered = jobs.filter((job) => {
            const title = String(job.title || '').toLowerCase();
            const company = String(job.companyName || '').toLowerCase();
            const location = String(job.location || '').toLowerCase();
            const experience = String(job.experience ?? '').toLowerCase();
            const jobType = String(job.jobType || '').toLowerCase();

            const selectedTitles = (filters?.title || []).map((value: string) => value.toLowerCase());
            const selectedCompanies = (filters?.company || []).map((value: string) => value.toLowerCase());
            const selectedLocations = (filters?.location || []).map((value: string) => value.toLowerCase());
            const selectedExperiences = (filters?.experience || []).map((value: string) => value.toLowerCase());
            const selectedJobTypes = (filters?.jobType || []).map((value: string) => value.toLowerCase());

            const titleMatch = !selectedTitles.length || selectedTitles.some((value: string) => title.includes(value));
            const companyMatch = !selectedCompanies.length || selectedCompanies.some((value: string) => company.includes(value));
            const locationMatch = !selectedLocations.length || selectedLocations.some((value: string) => location.includes(value));
            const experienceMatch = !selectedExperiences.length || selectedExperiences.some((value: string) => experience.includes(value));
            const jobTypeMatch = !selectedJobTypes.length || selectedJobTypes.includes(jobType);
            
            const rawSalary = Number(job.salary || 0);
            const salaryInLpa = rawSalary > 1000 ? rawSalary / 100000 : rawSalary;
            const salaryMatch = job.salary == null || (salaryInLpa >= salaryRange[0] && salaryInLpa <= salaryRange[1]);

            return titleMatch && companyMatch && locationMatch && experienceMatch && jobTypeMatch && salaryMatch;
        });

        setDisplayedJobs(filtered);
    }, [jobs, filters]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 mt-10">
                <Loader color="brightSun" size="lg" />
                <Text mt="md" c="dimmed" size="sm">Fetching verified job openings from database...</Text>
            </div>
        );
    }

    return (
        <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="text-2xl font-bold text-white">Recommended Opportunities</div>
                    <Text size="xs" c="dimmed">{displayedJobs.length} live jobs match your criteria</Text>
                </div>
                <Sort />
            </div>

            <div className="flex flex-wrap gap-6">
                {displayedJobs.length === 0 ? (
                    <div className="w-full text-center py-16 bg-mine-shaft-900 rounded-2xl border border-mine-shaft-800">
                        <Text c="dimmed" size="md">
                            No matching jobs found. Try adjusting your search filters.
                        </Text>
                    </div>
                ) : (
                    displayedJobs.map((job, index) => (
                        <JobCard
                            key={job.id || index}
                            {...job}
                            saved={savedJobIds.has(job.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Jobs;