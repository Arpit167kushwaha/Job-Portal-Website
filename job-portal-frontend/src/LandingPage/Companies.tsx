import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import Marquee from "react-fast-marquee";

const Companies = () => { 
    const [companies, setCompanies] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/jobs')
            .then((response) => {
                const jobs = Array.isArray(response.data) ? response.data : response.data?.content || [];
                const list = jobs
                    .map((job: any) => job.companyName)
                    .filter(Boolean)
                    .filter((company: string, index: number, array: string[]) => array.indexOf(company) === index);
                
                // Fallback top companies if list is small
                const fallback = ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta', 'Apple', 'Spotify', 'Oracle'];
                const merged = Array.from(new Set([...list, ...fallback]));
                setCompanies(merged);
            })
            .catch(() => {
                setCompanies(['Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta', 'Apple', 'Spotify', 'Oracle']);
            });
    }, []);

    return (
        <div className="mt-20 pb-5 px-6">
            <div className="text-3xl sm:text-4xl text-center font-bold text-white mb-2">
                Trusted By <span className="text-bright-sun-400">1000+ Top Companies</span>
            </div>
            <div className="text-xs sm:text-sm text-mine-shaft-400 text-center mb-8">
                Click on any logo to view live job vacancies from that company.
            </div>

            <Marquee pauseOnHover={true} speed={50} gradient={false}>
                {companies.map((company, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/find-jobs?company=${encodeURIComponent(company)}`)}
                        className="mx-8 px-4 py-2 bg-mine-shaft-900 border border-mine-shaft-800 hover:border-bright-sun-400 rounded-2xl flex items-center justify-center cursor-pointer transition duration-200 group shadow-md"
                    >
                        <img
                            className="h-8 w-24 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                            src={`/Companies/${company}.png`}
                            alt={company}
                            onError={(e) => (e.currentTarget.src = `/Icons/${company}.png`)}
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Companies;