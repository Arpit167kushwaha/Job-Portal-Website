import { Button, Select, NumberInput, TextInput, Textarea, Notification, rem } from "@mantine/core";
import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const PostJob = () => {
    const [job, setJob] = useState({
        title: '',
        companyName: '',
        experience: 0,
        jobType: 'FULLTIME',
        location: '',
        salary: 0,
        description: ''
    });
    
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (name: string, value: any) => {
        setJob({ ...job, [name]: value });
    };

    const handlePostJob = async () => {
        setLoading(true);
        try {
            // Expiry date backend scheduler ke liye zaroori hai (30 days validity)
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30); 
            
            const jobData = {
                ...job,
                expiryDate: expiryDate.toISOString().split('T')[0] // Format: YYYY-MM-DD
            };

            await API.post('/jobs/recruiter/create', jobData);
            
            setSuccess(true);
            setTimeout(() => navigate('/find-jobs', { state: { refreshKey: Date.now() } }), 2000);
            
        } catch (err) {
            console.error(err);
            alert("Error posting job. Please check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-4/5 mx-auto">
            {success && (
                <Notification className="mb-5 !border-bright-sun-500" icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} color="teal" title="Success!" withCloseButton={false}>
                    Job Posted Successfully! Redirecting to Jobs...
                </Notification>
            )}
            
            <div className="text-2xl font-semibold mb-5 text-mine-shaft-100">Post a Job</div>
            
            <div className="flex flex-col gap-5">
                <div className="flex gap-10 [&>*]:w-1/2">
                    <TextInput label="Job Title" placeholder="e.g. Software Engineer" withAsterisk value={job.title} onChange={(e) => handleChange('title', e.target.value)} />
                    <TextInput label="Company Name" placeholder="e.g. Google" withAsterisk value={job.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
                </div>
                
                <div className="flex gap-10 [&>*]:w-1/2">
                    <NumberInput label="Experience (Years)" placeholder="e.g. 2" withAsterisk value={job.experience} onChange={(val) => handleChange('experience', val)} min={0} />
                    <Select label="Job Type" placeholder="Select type" withAsterisk data={['FULLTIME', 'PARTTIME', 'INTERN', 'REMOTE']} value={job.jobType} onChange={(val) => handleChange('jobType', val)} />
                </div>
                
                <div className="flex gap-10 [&>*]:w-1/2">
                    <TextInput label="Location" placeholder="e.g. New York, USA" withAsterisk value={job.location} onChange={(e) => handleChange('location', e.target.value)} />
                    <NumberInput label="Salary (LPA)" placeholder="e.g. 12" withAsterisk value={job.salary} onChange={(val) => handleChange('salary', val)} min={0} />
                </div>
                
                <Textarea 
                    label="Job Description" 
                    placeholder="Enter detailed job description here..." 
                    withAsterisk 
                    minRows={6} 
                    autosize
                    value={job.description} 
                    onChange={(e) => handleChange('description', e.target.value)} 
                />
                
                <div className="flex gap-4 mt-4">
                     <Button onClick={handlePostJob} loading={loading} color="brightSun.5" variant="light">Publish Job</Button>
                     <Button color="brightSun.5" variant="outline">Save as Draft</Button>
                </div>
            </div>
        </div>
    );
}

export default PostJob;