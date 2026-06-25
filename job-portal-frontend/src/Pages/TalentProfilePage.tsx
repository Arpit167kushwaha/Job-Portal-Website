import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import Profile from "../TalentProfile/Profile";
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { useParams } from 'react-router-dom';
import RecommendTalent from "../TalentProfile/RecommendTitle";
const TalentProfilePage = ()=> { 
     const [user, setUser] = useState<any>(null);

     const params = useParams();
     useEffect(() => {
          const id = params.id;
          const url = id ? `/user/${id}` : '/user/me';
          API.get(url)
               .then((response) => setUser(response.data))
               .catch(() => setUser(null));
     }, [params.id]);

     return ( 
        <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins'] p-4">
             
             <Link className="my-4 inline-block" to="/find-talent">
                        <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.5" variant="light" >Back</Button>
             </Link>

             <div className="flex gap-5">
                  <Profile {...(user || {})} isEditable={!params.id} />
                       <RecommendTalent currentUserId={user?.id}/>
             </div>
        </div>
     )
}

export default TalentProfilePage;