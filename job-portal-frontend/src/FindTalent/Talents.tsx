import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";


const Talents=({ filters }: { filters?: any }) => { 
    const [talents, setTalents] = useState<any[]>([]);

    useEffect(() => {
        API.get('/user/talents')
            .then((response) => setTalents(response.data || []))
            .catch(() => setTalents([]));
    }, []);

    const filteredTalents = talents.filter((talent) => {
        const query = (filters?.query || '').trim().toLowerCase();
        const name = String(talent.name || '').toLowerCase();
        const role = String(talent.role || '').toLowerCase();
        const email = String(talent.email || '').toLowerCase();

        return !query || [name, role, email].some((value) => value.includes(query));
    });

    return <div className="p-5">
         <div className="flex justify-between">
            <div className="text-2xl font-semibold">Live Candidates</div>
            <Sort/>
         </div>
         <div className="flex mt-10 flex-wrap gap-5 justify-between">
               {
                filteredTalents.map((talent,index) => <TalentCard key={talent.id || index} {...talent} />)
               }
               
         </div>
         
        
    </div>
}
export default Talents;