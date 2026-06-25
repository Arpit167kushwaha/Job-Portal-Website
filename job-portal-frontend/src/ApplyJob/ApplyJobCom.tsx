import { Button, Divider, FileInput, LoadingOverlay, Notification, NumberInput, rem, Textarea, TextInput } from "@mantine/core";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axiosInstance";

const ApplyJobComp = () => {
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [sec, setSec] = useState(5);
    const [job, setJob] = useState<any>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const { jobId } = useParams();
    const id = jobId || 1;

    useEffect(() => {
        API.get(`/jobs/${id}`)
            .then((response) => setJob(response.data))
            .catch(() => setJob(null));

        API.get('/user/me')
            .then((response) => {
                setFullName(response.data?.name || '');
                setEmail(response.data?.email || '');
            })
            .catch(() => undefined);
    }, [id]);

    const handlePreview = () => {
        setPreview(!preview);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = async () => {
        setSubmit(true);
        try {
            await API.post(`/applications/apply/${id}`);

            let x = 5;
            const timer = setInterval(() => {
                x--;
                setSec(x);
                if (x === 0) {
                    clearInterval(timer);
                    navigate('/find-jobs');
                }
            }, 1000);
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Error: You might have already applied for this job.");
            setSubmit(false);
        }
    }

    return (
        <>
            <div className="w-2/3 mx-auto">
                <LoadingOverlay className="!fixed"
                    visible={submit}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'brightSun.5', type: 'bars' }}
                />
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <div className="p-3 bg-mine-shaft-600 rounded-xl ">
                            <img className="h-14" src={`/Icons/${job?.companyName || 'Google'}.png`} alt="" onError={(event) => (event.currentTarget.src = '/Icons/Google.png')} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold text-2xl ">{job?.title || 'Loading job...'}</div>
                            <div className="text-lg text-mine-shaft-200">{job?.companyName || 'MySQL'} &bull; {job?.applicantsCount || 0} Applicants</div>
                        </div>
                    </div>
                </div>

                <Divider my="xl" />

                <div className="text-xl font-semibold mb-5">Submit Your Application</div>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-10 [&>*]:w-1/2">
                        <TextInput readOnly={preview} value={fullName} onChange={(event) => setFullName(event.currentTarget.value)} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-400 font-semibold" : ""}`} label="Full Name" withAsterisk placeholder="Enter Name" />
                        <TextInput readOnly={preview} value={email} onChange={(event) => setEmail(event.currentTarget.value)} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-400 font-semibold" : ""}`} label="Email" withAsterisk placeholder="Enter Email" />
                    </div>
                    <div className="flex gap-10 [&>*]:w-1/2">
                        <NumberInput readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-400 font-semibold" : ""}`} label="Phone Number" withAsterisk placeholder="Enter Phone Number" hideControls />
                        <TextInput readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-400 font-semibold" : ""}`} label="Personal Website" withAsterisk placeholder="Enter Url" />
                    </div>

                    <FileInput readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-400 font-semibold" : ""}`} withAsterisk
                        rightSection={<IconPaperclip stroke={1.5} />}
                        label="Attach your CV"
                        placeholder="Your CV"
                        leftSectionPointerEvents="none"
                    />
                    <Textarea readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-400 font-semibold" : ""}`} withAsterisk
                        label="Cover Letter"
                        placeholder="Type something about yourself..."
                        minRows={4}
                        autosize
                    />
                    {!preview && <Button onClick={handlePreview} color="brightSun.5" variant="light" >Preview</Button>}
                    {
                        preview && <div className="flex gap-10 [&>*]:w-1/2">
                            <Button fullWidth onClick={handlePreview} color="brightSun.5" variant="outline" >Edit</Button>
                            <Button fullWidth onClick={handleSubmit} color="brightSun.5" variant="light" >Submit</Button>
                        </div>
                    }
                </div>
            </div>
            <Notification className={`!border-bright-sun-500 -translate-y-20 !fixed top-0 left-[35%] z-[1001] transition duration-300 ease-in-out ${submit ? "translate-y-0" : "-translate-y-20"}`} icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} withBorder color="teal" title="Application Submitted!" mt="md" withCloseButton={false}>
                Redirecting to Find Jobs in {sec} seconds...
            </Notification>
        </>
    )
}

export default ApplyJobComp;