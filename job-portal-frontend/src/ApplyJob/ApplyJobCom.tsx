import { Button, Divider, FileInput, LoadingOverlay, Notification, Textarea, TextInput, rem, Alert, Text } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconPaperclip, IconPhone, IconMail, IconUser, IconWorld } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axiosInstance";

const ApplyJobComp = () => {
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [sec, setSec] = useState(3);
    const [job, setJob] = useState<any>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [generalError, setGeneralError] = useState('');
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
                if (response.data?.companyName) setWebsite(response.data.companyName);
            })
            .catch(() => undefined);
    }, [id]);

    const validateEmail = (val: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!val.trim()) {
            setEmailError('Email address is required.');
            return false;
        }
        if (!emailRegex.test(val.trim())) {
            setEmailError('Please enter a valid email address (e.g. name@domain.com).');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePhone = (val: string) => {
        const clean = val.replace(/\D/g, '');
        if (!val.trim()) {
            setPhoneError('Phone number is required.');
            return false;
        }
        if (clean.length < 10) {
            setPhoneError('Please enter a valid phone number (at least 10 digits).');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const validateName = (val: string) => {
        if (!val.trim()) {
            setNameError('Full name is required.');
            return false;
        }
        setNameError('');
        return true;
    };

    const handlePreview = () => {
        setGeneralError('');
        const isNameOk = validateName(fullName);
        const isEmailOk = validateEmail(email);
        const isPhoneOk = validatePhone(phone);

        if (!isNameOk || !isEmailOk || !isPhoneOk) {
            setGeneralError('Please fix the errors before previewing your application.');
            return;
        }

        setPreview(!preview);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        setGeneralError('');
        const isNameOk = validateName(fullName);
        const isEmailOk = validateEmail(email);
        const isPhoneOk = validatePhone(phone);

        if (!isNameOk || !isEmailOk || !isPhoneOk) {
            setGeneralError('Please fill in all required fields properly.');
            return;
        }

        setSubmitting(true);
        try {
            await API.post(`/applications/apply/${id}`);

            setSubmit(true);
            let x = 3;
            const timer = setInterval(() => {
                x--;
                setSec(x);
                if (x <= 0) {
                    clearInterval(timer);
                    navigate('/applied-jobs');
                }
            }, 1000);
        } catch (err: any) {
            console.error(err);
            setGeneralError(err.response?.data?.message || err.response?.data?.error || "You have already applied for this job or it is closed.");
            setSubmit(false);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-8">
            <div className="w-4/5 max-w-3xl mx-auto bg-mine-shaft-900 p-8 rounded-2xl border border-mine-shaft-700 shadow-xl">
                <LoadingOverlay
                    visible={submitting}
                    zIndex={1000}
                    overlayProps={{ radius: 'md', blur: 2 }}
                    loaderProps={{ color: 'brightSun.5', type: 'bars' }}
                />

                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="p-3 bg-mine-shaft-800 rounded-xl">
                            <img className="h-12 w-12 object-contain" src={`/Icons/${job?.companyName || 'Google'}.png`} alt="" onError={(event) => (event.currentTarget.src = '/Icons/Google.png')} />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-semibold text-2xl text-white">{job?.title || 'Loading position...'}</div>
                            <div className="text-sm text-mine-shaft-300">{job?.companyName || 'Company'} &bull; {job?.location || 'Remote'} &bull; ₹{job?.salary ? `${job.salary} LPA` : 'N/A'}</div>
                        </div>
                    </div>
                </div>

                <Divider my="xl" color="mineShaft.7" />

                <div className="text-xl font-semibold mb-5 text-white">Application Details</div>

                {generalError && (
                    <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" radius="md" mb="md">
                        {generalError}
                    </Alert>
                )}

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <TextInput
                            readOnly={preview}
                            value={fullName}
                            error={nameError}
                            onChange={(event) => {
                                setFullName(event.currentTarget.value);
                                if (nameError) validateName(event.currentTarget.value);
                            }}
                            className="w-full sm:w-1/2"
                            label="Full Name"
                            withAsterisk
                            placeholder="Enter your name"
                            leftSection={<IconUser size={16} />}
                        />
                        <TextInput
                            readOnly={preview}
                            value={email}
                            error={emailError}
                            onChange={(event) => {
                                setEmail(event.currentTarget.value);
                                if (emailError) validateEmail(event.currentTarget.value);
                            }}
                            onBlur={() => validateEmail(email)}
                            className="w-full sm:w-1/2"
                            label="Email Address"
                            withAsterisk
                            placeholder="name@domain.com"
                            leftSection={<IconMail size={16} />}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <TextInput
                            readOnly={preview}
                            value={phone}
                            error={phoneError}
                            onChange={(event) => {
                                setPhone(event.currentTarget.value);
                                if (phoneError) validatePhone(event.currentTarget.value);
                            }}
                            onBlur={() => validatePhone(phone)}
                            className="w-full sm:w-1/2"
                            label="Phone Number"
                            withAsterisk
                            placeholder="e.g. 9876543210"
                            leftSection={<IconPhone size={16} />}
                        />
                        <TextInput
                            readOnly={preview}
                            value={website}
                            onChange={(event) => setWebsite(event.currentTarget.value)}
                            className="w-full sm:w-1/2"
                            label="Portfolio / LinkedIn / GitHub"
                            placeholder="https://github.com/username"
                            leftSection={<IconWorld size={16} />}
                        />
                    </div>

                    <FileInput
                        readOnly={preview}
                        rightSection={<IconPaperclip stroke={1.5} />}
                        label="Attach Resume (PDF)"
                        placeholder="Upload or use profile resume"
                        accept="application/pdf"
                    />

                    <Textarea
                        readOnly={preview}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.currentTarget.value)}
                        label="Cover Note"
                        placeholder="Briefly highlight why you're a great fit for this position..."
                        minRows={4}
                        autosize
                    />

                    {!preview ? (
                        <Button onClick={handlePreview} color="brightSun.5" size="md" className="mt-2 font-semibold">
                            Preview Application
                        </Button>
                    ) : (
                        <div className="flex gap-4 mt-2">
                            <Button fullWidth onClick={handlePreview} color="mineShaft" variant="outline" size="md">
                                Edit Details
                            </Button>
                            <Button fullWidth onClick={handleSubmit} color="brightSun.5" size="md" loading={submitting} className="font-semibold">
                                Confirm & Submit Application
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Notification
                className={`!border-bright-sun-500 !fixed top-5 left-1/2 -translate-x-1/2 z-[1001] transition duration-300 ease-in-out shadow-2xl ${submit ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                withBorder
                color="teal"
                title="Application Submitted Successfully!"
                withCloseButton={false}
            >
                Redirecting to My Applications in {sec} seconds...
            </Notification>
        </div>
    );
};

export default ApplyJobComp;