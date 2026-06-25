import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import TalentCard from "../FindTalent/TalentCard";

const RecommendTalent = ({ currentUserId }: { currentUserId?: number })=> { 
  const [talents, setTalents] = useState<any[]>([]);

  useEffect(() => {
    API.get('/user/talents')
      .then((response) => {
        const filtered = (response.data || []).filter((talent: any) => talent.id !== currentUserId);
        setTalents(filtered.slice(0, 4));
      })
      .catch(() => setTalents([]));
  }, [currentUserId]);

  return <div>
        <div className="text-xl font-semibold mb-5">Other Candidates</div>
        <div className="flex flex-col flex-wrap gap-5">
          {
          talents.map((talent,index) => <TalentCard key={talent.id || index}{...talent}/>)
          }
        </div>
    </div>
}

export default RecommendTalent;