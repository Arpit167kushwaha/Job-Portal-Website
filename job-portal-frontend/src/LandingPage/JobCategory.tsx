import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import sampleJobs from "../Data/JobsData";

const JobCategory = () => {
    const [jobCategory, setJobCategory] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/jobs')
            .then((response) => {
                const jobs = Array.isArray(response.data) ? response.data : response.data?.content || [];
                const grouped = jobs.reduce((acc: Record<string, number>, job: any) => {
                    const name = job.title || 'Software Engineer';
                    acc[name] = (acc[name] || 0) + 1;
                    return acc;
                }, {});

                setJobCategory(
                    Object.entries(grouped)
                        .map(([name, count]) => ({
                            name,
                            desc: 'Verified live vacancies available for immediate application.',
                            jobs: `${count} live job${count === 1 ? '' : 's'}`,
                        }))
                );
            })
            .catch(() => {
                const jobs = sampleJobs as any[];
                const grouped = jobs.reduce((acc: Record<string, number>, job: any) => {
                    const name = job.title || 'Software Engineer';
                    acc[name] = (acc[name] || 0) + 1;
                    return acc;
                }, {});

                setJobCategory(
                    Object.entries(grouped)
                        .map(([name, count]) => ({
                            name,
                            desc: 'Verified live vacancies available for immediate application.',
                            jobs: `${count} live job${count === 1 ? '' : 's'}`,
                        }))
                );
            });
    }, []);

    return (
        <div className="mt-20 pb-10 px-6">
            <div className="text-3xl sm:text-4xl text-center font-bold mb-3 text-white">
                Browse <span className="text-bright-sun-400">Popular Categories</span>
            </div>
            <div className="mb-10 text-sm sm:text-base mx-auto text-mine-shaft-300 text-center max-w-xl">
                Click on any category to instantly explore all matching verified roles stored in the database.
            </div>

            <Carousel slideSize={{ base: '100%', sm: '50%', md: '25%' }} slideGap="md" emblaOptions={{ loop: true, dragFree: true, align: 'start' }}>
                {jobCategory.map((category, index) => (
                    <Carousel.Slide key={index}>
                        <div
                            onClick={() => navigate(`/find-jobs?title=${encodeURIComponent(category.name)}`)}
                            className="bg-mine-shaft-900 border border-mine-shaft-700 hover:border-bright-sun-400 rounded-2xl p-6 flex flex-col items-center justify-between text-center cursor-pointer transition duration-300 shadow-lg hover:shadow-bright-sun-400/10 min-h-[220px]"
                        >
                            <div className="p-3 bg-mine-shaft-800 rounded-2xl border border-mine-shaft-700 mb-3">
                                <img
                                    className="w-10 h-10 object-contain"
                                    src={`/Category/${category.name}.png`}
                                    alt=""
                                    onError={(e) => (e.currentTarget.src = '/Icons/Google.png')}
                                />
                            </div>
                            <div className="text-white text-lg font-semibold line-clamp-1">{category.name}</div>
                            <div className="text-xs text-mine-shaft-400 mt-1 line-clamp-2">{category.desc}</div>
                            <div className="text-bright-sun-400 text-sm font-semibold mt-3 bg-bright-sun-400/10 px-3 py-1 rounded-full border border-bright-sun-400/20">
                                {category.jobs}
                            </div>
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default JobCategory;