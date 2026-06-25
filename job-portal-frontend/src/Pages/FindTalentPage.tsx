import { Divider } from "@mantine/core";
import { useState } from "react";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

const FindTalentPage= ()=> { 
     const [filters, setFilters] = useState<any>({});

     return ( 
        <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins']">
             <SearchBar onFiltersChange={setFilters}/>
             <Divider size="xs" mx="md" />
             <Talents filters={filters}/>
        </div>
     )
}

export default FindTalentPage;