import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobCom";

const ApplyJobPage = ()=> { 
     return ( 
        <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins'] p-4">
               <Link className="my-4 inline-block" to="/find-jobs">
                        <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.5" variant="light" >Back</Button>
             </Link>
             <ApplyJobComp/>
        </div>
     )
}
export default ApplyJobPage;