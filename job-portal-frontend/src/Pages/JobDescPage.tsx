import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJob from "../JobDesc/RecommendedJob";


const JobDescPage = ()=> { 
     return ( 
        <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins'] p-4">
            
             <Link className="my-4 inline-block" to="/find-jobs">
                        <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.5" variant="light" >Back</Button>
             </Link>

             <div className="flex gap-5 justify-around">
                  <JobDesc/>
                  <RecommendedJob/>
             </div>
        </div>
     )
}

export default JobDescPage;