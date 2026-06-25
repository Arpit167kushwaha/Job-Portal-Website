import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import Marquee from "react-fast-marquee";


const Companies=()=>{ 
    const [companies, setCompanies] = useState<string[]>([]);

    useEffect(() => {
        API.get('/jobs')
            .then((response) => {
                const jobs = Array.isArray(response.data) ? response.data : response.data?.content || [];
                setCompanies(
                    jobs
                        .map((job: any) => job.companyName)
                        .filter(Boolean)
                        .filter((company: string, index: number, array: string[]) => array.indexOf(company) === index)
                );
            })
            .catch(() => setCompanies([]));
    }, []);

    return <div className="mt-20 pb-5">
          <div className=" text-4xl text-center font-semibold text-mine-shaft-100">Trusted By <span className="text-bright-sun-400">1000+ </span>Companies</div>
    <Marquee pauseOnHover={true} speed={60} >
        {
            companies.map((company,index)=><div key={index} className=" mt-10 mx-20 px-2 py-1 hover:bg-mine-shaft-700 rounded-xl cursor-pointer">
                <img className="h-10 " src={`/Companies/${company}.png`} alt={company}/>
            </div>)
        }
            <div></div>
    </Marquee>
    
    </div>
}
export default Companies;