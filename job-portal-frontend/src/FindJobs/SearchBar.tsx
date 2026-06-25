import { Divider, RangeSlider, Text } from "@mantine/core";
import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";
import MultiInput from "./MultiInput";
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import sampleJobs from "../Data/JobsData";

const SearchBar=({ onFiltersChange }: { onFiltersChange?: (filters: any) => void }) => { 

    const [value, setValue] = useState<[number, number]>([0,100]);
    const [filters, setFilters] = useState<any[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<any>({});

    const updateFilters = (field: string, selectedValues: string[]) => {
        const nextFilters = {
            ...selectedFilters,
            [field]: selectedValues,
            salaryRange: value,
        };

        setSelectedFilters(nextFilters);
        onFiltersChange?.(nextFilters);
    };

    useEffect(() => {
        API.get('/jobs', { params: { ts: Date.now() } })
            .then((response) => {
                const jobs = Array.isArray(response.data)
                    ? response.data
                    : response.data?.content || [];

                const unique = (items: any[], key: string) => {
                    const values = items.map((item) => item?.[key]).filter(Boolean);
                    return values.filter((value, index, array) => array.indexOf(value) === index);
                };

                setFilters([
                    { field: 'title', title: 'Job Title', icon: IconSearch, options: unique(jobs, 'title') },
                    { field: 'location', title: 'Location', icon: IconMapPin, options: unique(jobs, 'location') },
                    { field: 'experience', title: 'Experience', icon: IconBriefcase, options: unique(jobs, 'experience').map(String) },
                    { field: 'jobType', title: 'Job Type', icon: IconRecharging, options: unique(jobs, 'jobType') },
                ]);
            })
            .catch(() => {
                const jobs = sampleJobs as any[];
                const unique = (items: any[], key: string) => {
                    const values = items.map((item) => item?.[key]).filter(Boolean);
                    return values.filter((value, index, array) => array.indexOf(value) === index);
                };

                setFilters([
                    { field: 'title', title: 'Job Title', icon: IconSearch, options: unique(jobs, 'title') },
                    { field: 'location', title: 'Location', icon: IconMapPin, options: unique(jobs, 'location') },
                    { field: 'experience', title: 'Experience', icon: IconBriefcase, options: unique(jobs, 'experience').map(String) },
                    { field: 'jobType', title: 'Job Type', icon: IconRecharging, options: unique(jobs, 'jobType') },
                ]);
            });
    }, []);

    return <div className="flex px-5 py-8 ">
        {filters.map((item,index) => (
            <div key={item.title} className="w-1/5 flex items-center">
                <MultiInput
                    {...item}
                    value={selectedFilters[item.field] ?? []}
                    onChange={(selectedValues: string[]) => updateFilters(item.field, selectedValues)}
                />
                {index < filters.length - 1 && <Divider mr="xs" size="xs" orientation="vertical" />}
            </div>
        ))}

        <div className="w-1/5 ">
             <div className="flex justify-between">
                <div>Salary</div>
                <div>&#8377;{value[0]} - &#8377;{value[1]} LPA</div>
             </div> 
            <RangeSlider
                color="brightSun.4"
                size="xs"
                value={value}
                onChange={(nextValue) => {
                    setValue(nextValue);
                    const nextFilters = { ...selectedFilters, salaryRange: nextValue };
                    setSelectedFilters(nextFilters);
                    onFiltersChange?.(nextFilters);
                }}
            />
        </div>
        {filters.length === 0 && <Text className="ml-4 text-mine-shaft-300">Loading live filters...</Text>}
           </div>
}

export default SearchBar;