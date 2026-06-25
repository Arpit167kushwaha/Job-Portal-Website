import { Divider } from "@mantine/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

const FindJobsPage= ()=> { 
     const [filters, setFilters] = useState<any>({});
        const location = useLocation();
        const refreshKey = (location.state as { refreshKey?: number } | null)?.refreshKey || location.key;

        return <div key={refreshKey} className="min-h-[90vh] bg-mine-shaft-800 font-['poppins']">
           
             <SearchBar onFiltersChange={setFilters}/>
             <Divider size="xs" mx="md" />
             <Jobs filters={filters}/>
        </div>
}

export default FindJobsPage;