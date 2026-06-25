import { Input } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";

const SearchBar=({ onFiltersChange }: { onFiltersChange?: (filters: any) => void }) => { 

    const [query, setQuery] = useState('');

    return <div className="flex px-5 py-8 flex items-center ">
        <div className="flex items-center mr-4">
             <div className="text-bright-sun-400 bg-mine-shaft-700 rounded-full p-1 mr-2 " ><IconUserCircle size={20}/></div>
             <Input
                className="[&_input]:!placeholder-mine-shaft-300"
                variant="unstyled"
                placeholder="Search candidates"
                value={query}
                onChange={(event) => {
                    const nextQuery = event.currentTarget.value;
                    setQuery(nextQuery);
                    onFiltersChange?.({ query: nextQuery });
                }}
             />
        </div>
           </div>
}

export default SearchBar;