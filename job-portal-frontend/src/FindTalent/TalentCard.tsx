import { Avatar, Button, Divider, Text } from '@mantine/core';
import { IconMail, IconFileDescription } from "@tabler/icons-react";
import { Link } from 'react-router-dom';
import API from '../api/axiosInstance';

const TalentCard= (props:any) => {
    const initials = (props.name || 'U')
        .split(' ')
        .map((part:string) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const profileSrc = props.profilePictureUrl ? (props.profilePictureUrl.startsWith('/uploads') ? `${API.defaults.baseURL}${props.profilePictureUrl}` : props.profilePictureUrl) : undefined;
    const resumeHref = props.resumeUrl ? (props.resumeUrl.startsWith('/uploads') ? `${API.defaults.baseURL}${props.resumeUrl}` : props.resumeUrl) : '#';

    return <Link to={`/talent-profile/${props.id}`} className="no-underline">
        <div className="bg-mine-shaft-700 p-4  w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 transition duration-300 ease-in-out cursor-pointer">
             <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-600 rounded-full ">
                         <Avatar size="lg" src={profileSrc}>{initials}</Avatar>
                    </div>
                    <div>
                        <div className="font-semibold text-lg">{props.name || 'Unknown Candidate'}</div>
                        <div className="text-sm text-mine-shaft-200">{props.role || 'Candidate'} &bull; {props.email || 'No email'}</div>
                    </div>
                </div>
                <IconMail className="text-mine-shaft-300 cursor-pointer"/>
             </div>

             <Text className="!text-xs  text-justify text-mine-shaft-300" lineClamp={4}>
                {props.resumeUrl ? `Resume linked in the database: ${props.resumeUrl}` : 'No resume URL has been saved yet.'}
             </Text>
              <Divider size="xs" color="mineShaft.6" />

             <div className="flex justify-between items-center">
                <div className="font-semibold text-mine-shaft-200">{props.role || 'Candidate'}</div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                   <IconFileDescription className="h-5 w-5 " stroke={1.5}/> {props.resumeUrl ? 'Resume available' : 'No resume'}
                </div>
              </div>
              <Divider size="xs" color="mineShaft.6" />
              <div className="flex [&>*]:w-1/2 [&>*]:p-1">
                        <Button component="a" href={`mailto:${props.email || ''}`} color="brightSun.4" variant="outline" fullWidth disabled={!props.email} onClick={(e:any)=>e.stopPropagation()}>Message</Button>
                    <div>
                        <Button component="a" href={resumeHref} target="_blank" rel="noreferrer" color="brightSun.4" variant="light" fullWidth disabled={!props.resumeUrl} onClick={(e:any)=>e.stopPropagation()}>Resume</Button>
                    </div>
               </div>
        </div>
    </Link>
}
export default TalentCard;