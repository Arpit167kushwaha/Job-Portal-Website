import { IconBookmark, IconClockHour3 } from "@tabler/icons-react";
import { Divider, Text } from '@mantine/core';
import { Link } from "react-router-dom";

const JobCard = (props: any) => { 
    const postedDaysValue = props.postedDays ?? null;
    let postedLabel = '1 day ago';
    if (postedDaysValue === null) {
        postedLabel = '1 day ago';
    } else if (postedDaysValue === 0) {
        postedLabel = 'Today';
    } else if (postedDaysValue === 1) {
        postedLabel = '1 day ago';
    } else {
        postedLabel = `${postedDaysValue} days ago`;
    }

    return (
        <Link to={`/jobs/${props.id}`} className="bg-mine-shaft-700 p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_7px_1px_yellow] !shadow-bright-sun-400 transition duration-300 ease-in-out cursor-pointer">
             <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-600 rounded-md ">
                         <img className="h-7" src={`/Icons/${props.companyName || 'Google'}.png`} alt="logo" onError={(e) => e.currentTarget.src = '/Icons/Google.png'} />
                    </div>
                    <div>
                        <div className="font-semibold text-white truncate w-44">{props.title}</div>
                        <div className="text-xs text-mine-shaft-200">
                            {props.companyName} &#x2022; {props.applicantsCount || 0} Applicants
                        </div>
                    </div>
                </div>
                <IconBookmark className="text-mine-shaft-300 cursor-pointer"/>
             </div>
             <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-600 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
                <div>{props.experience} Yrs Exp</div>
                <div>{props.jobType}</div>
                <div>{props.location}</div>
             </div>
             <Text className="!text-xs text-justify text-mine-shaft-300" lineClamp={4}>
                 {props.description}
             </Text>
             <Divider size="xs" color="mineShaft.6" />
             <div className="flex justify-between items-center">
                <div className="font-semibold text-mine-shaft-200">
                    &#8377; {props.salary ? props.salary.toLocaleString('en-IN') : 'N/A'} LPA
                </div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                   <IconClockHour3 className="h-5 w-5 " stroke={1.5}/> 
                   {postedLabel}
                </div>
             </div>
        </Link>
    )
}
export default JobCard;