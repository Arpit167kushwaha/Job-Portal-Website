import { Divider, RangeSlider, Text } from "@mantine/core";
import { IconBriefcase, IconBuildingSkyscraper, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";
import MultiInput from "./MultiInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axiosInstance";
import sampleJobs from "../Data/JobsData";

const SearchBar = ({ onFiltersChange }: { onFiltersChange?: (filters: any) => void }) => { 
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState<[number, number]>([0, 100]);
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
        // Read URL query params on mount
        const initialTitle = searchParams.get('title');
        const initialCompany = searchParams.get('company');
        const initialJobType = searchParams.get('jobType');
        const initialLocation = searchParams.get('location');

        const initial: any = {};
        if (initialTitle) initial.title = [initialTitle];
        if (initialCompany) initial.company = [initialCompany];
        if (initialJobType) initial.jobType = [initialJobType];
        if (initialLocation) initial.location = [initialLocation];

        if (Object.keys(initial).length > 0) {
            setSelectedFilters(initial);
            onFiltersChange?.(initial);
        }

        API.get('/jobs', { params: { ts: Date.now() } })
            .then((response) => {
                const jobs = Array.isArray(response.data)
                    ? response.data
                    : response.data?.content || [];

                const unique = (items: any[], key: string) => {
                    const values = items.map((item) => item?.[key]).filter(Boolean);
                    return values.filter((val, index, array) => array.indexOf(val) === index);
                };

                setFilters([
                    { field: 'title', title: 'Job Title', icon: IconSearch, options: unique(jobs, 'title') },
                    { field: 'company', title: 'Company', icon: IconBuildingSkyscraper, options: unique(jobs, 'companyName') },
                    { field: 'location', title: 'Location', icon: IconMapPin, options: unique(jobs, 'location') },
                    { field: 'experience', title: 'Experience', icon: IconBriefcase, options: unique(jobs, 'experience').map(String) },
                    { field: 'jobType', title: 'Job Type', icon: IconRecharging, options: unique(jobs, 'jobType') },
                ]);
            })
            .catch(() => {
                const jobs = sampleJobs as any[];
                const unique = (items: any[], key: string) => {
                    const values = items.map((item) => item?.[key]).filter(Boolean);
                    return values.filter((val, index, array) => array.indexOf(val) === index);
                };

                setFilters([
                    { field: 'title', title: 'Job Title', icon: IconSearch, options: unique(jobs, 'title') },
                    { field: 'company', title: 'Company', icon: IconBuildingSkyscraper, options: unique(jobs, 'companyName') },
                    { field: 'location', title: 'Location', icon: IconMapPin, options: unique(jobs, 'location') },
                    { field: 'experience', title: 'Experience', icon: IconBriefcase, options: unique(jobs, 'experience').map(String) },
                    { field: 'jobType', title: 'Job Type', icon: IconRecharging, options: unique(jobs, 'jobType') },
                ]);
            });
    }, [searchParams]);

    return (
        <div className="flex flex-wrap lg:flex-nowrap px-6 py-6 bg-mine-shaft-900 border-b border-mine-shaft-800 gap-4 items-center">
            {filters.map((item, index) => (
                <div key={item.field} className="w-full sm:w-1/2 lg:w-1/6 flex items-center">
                    <MultiInput
                        {...item}
                        value={selectedFilters[item.field] ?? []}
                        onChange={(selectedValues: string[]) => updateFilters(item.field, selectedValues)}
                    />
                    {index < filters.length - 1 && <Divider mr="xs" size="xs" orientation="vertical" className="hidden lg:block border-mine-shaft-700" />}
                </div>
            ))}

            <div className="w-full sm:w-1/2 lg:w-1/6">
                <div className="flex justify-between text-xs text-mine-shaft-300 font-medium mb-1">
                    <span>Salary Bracket</span>
                    <span className="text-bright-sun-400 font-semibold">₹{value[0]} - ₹{value[1]} LPA</span>
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
            {filters.length === 0 && <Text className="text-xs text-mine-shaft-400">Loading filters...</Text>}
        </div>
    );
};

export default SearchBar;