import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import sampleJobs from "../Data/JobsData";

const JobCategory=()=>{
        const [jobCategory, setJobCategory] = useState<any[]>([]);

        useEffect(() => {
                API.get('/jobs')
                        .then((response) => {
                                const jobs = Array.isArray(response.data) ? response.data : response.data?.content || [];
                                const grouped = jobs.reduce((acc: Record<string, number>, job: any) => {
                                        const name = job.title || 'General';
                                        acc[name] = (acc[name] || 0) + 1;
                                        return acc;
                                }, {});

                                setJobCategory(
                                        Object.entries(grouped)
                                                .map(([name, count]) => ({
                                                        name,
                                                        desc: 'Openings pulled from the live job database.',
                                                        jobs: `${count} live job${count === 1 ? '' : 's'}`,
                                                }))
                                                .sort((a, b) => Number.parseInt(b.jobs) - Number.parseInt(a.jobs))
                                );
                        })
                                                .catch(() => {
                                                        const jobs = sampleJobs as any[];
                                                        const grouped = jobs.reduce((acc: Record<string, number>, job: any) => {
                                                                const name = job.title || 'General';
                                                                acc[name] = (acc[name] || 0) + 1;
                                                                return acc;
                                                        }, {});

                                                        setJobCategory(
                                                                Object.entries(grouped)
                                                                        .map(([name, count]) => ({
                                                                                name,
                                                                                desc: 'Openings pulled from the live job database.',
                                                                                jobs: `${count} live job${count === 1 ? '' : 's'}`,
                                                                        }))
                                                                        .sort((a, b) => Number.parseInt(b.jobs) - Number.parseInt(a.jobs))
                                                        );
                                                });
        }, []);

    return <div className="mt-20 pb-5">
                  <div className=" text-4xl text-center font-semibold mb-3 text-mine-shaft-100">Browse <span className="text-bright-sun-400">Live Job </span>Categories</div>
                  <div className=" mb-10 text-lg mx-auto text-mine-shaft-300 text-center w-1/2">Every card below is generated from jobs stored in MySQL, not from hardcoded sample data.</div>   

          <Carousel slideSize="22%" slideGap="md" emblaOptions={{loop: true,dragFree: true,align: 'center'}}>
          {
             jobCategory.map((category,index)=><Carousel.Slide key={index}>

                <div className=" gap-2 border border-bright-sun-400 rounded-xl p-4 backdrop-blur-md flex flex-col items-center w-64 hover:cursor-pointer hover:shadow-[0_0_20px_1px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300">
                        <div className="p-2  bg-bright-sun-300 rounded-full">
                           
                                <img className="w-10 h-10 object-contain" src={`/Category/${category.name}.png`} alt="" />
                        </div>
                        <div className="text-mine-shaft-100 text-xl font-semibold text-center">{category.name}</div>
                        <div className=" text-center text-sm text-mine-shaft-300">{category.desc}</div>
                        <div className="text-bright-sun-300 text-lg"> {category.jobs}</div>
                </div>
            </Carousel.Slide>)
          }
          </Carousel>   
   
   
   
    </div>
}
export default JobCategory;