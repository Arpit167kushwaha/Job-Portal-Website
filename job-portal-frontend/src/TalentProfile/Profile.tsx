import { Button, Divider, TextInput, Textarea, FileInput } from "@mantine/core";
import { IconBriefcase, IconMail, IconDeviceFloppy } from "@tabler/icons-react";
import { useEffect, useState, useRef } from "react";
import API from "../api/axiosInstance";

const Profile=(props:any)=>{ 
     const [name, setName] = useState(props?.name || '');
     const [resumeUrl, setResumeUrl] = useState(props?.resumeUrl || '');
     const [resumeFile, setResumeFile] = useState<File | null>(null);
     const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
     const [profilePicPreview, setProfilePicPreview] = useState<string | null>(props?.profilePictureUrl || null);
     const profileInputRef = useRef<HTMLInputElement | null>(null);
     const [companyName, setCompanyName] = useState(props?.companyName || '');
     const [skills, setSkills] = useState(props?.skills || '');
     const [experience, setExperience] = useState<number | ''>(props?.experience ?? '');
     const [saving, setSaving] = useState(false);
     const [status, setStatus] = useState('');

      useEffect(() => {
          setName(props?.name || '');
          setResumeUrl(props?.resumeUrl || '');
          setCompanyName(props?.companyName || '');
          setSkills(props?.skills || '');
          setExperience(props?.experience ?? '');
               setProfilePicPreview(props?.profilePictureUrl || null);
     }, [props?.name, props?.resumeUrl, props?.companyName, props?.skills, props?.experience]);

          const getPublicUrl = (p?: string | null) => {
              if (!p) return null;
              if (p.startsWith('/uploads')) return `${API.defaults.baseURL}${p}`;
              return p;
          };

     const handleSave = async () => {
          setSaving(true);
          setStatus('');

          try {
               const form = new FormData();
               form.append('name', name || '');
               form.append('companyName', companyName || '');
               form.append('skills', skills || '');
               form.append('experience', String(experience || ''));
               if (resumeFile) form.append('resume', resumeFile);
               if (profilePicFile) form.append('profilePicture', profilePicFile);

               const res = await API.put('/user/update', form, {
                    headers: { 'Content-Type': 'multipart/form-data' },
               });

               setStatus('Profile updated.');
               // update local urls from response
               setResumeUrl(res?.data?.resumeUrl || resumeUrl);
               setProfilePicPreview(res?.data?.profilePictureUrl || profilePicPreview);
               // clear file inputs
               setResumeFile(null);
               setProfilePicFile(null);
          } catch (error) {
               setStatus('Could not update profile right now.');
          } finally {
               setSaving(false);
          }
     };

     const isEditable = !!props.isEditable;

     return <div className="w-2/3">
           <div className="relative"> 
                    <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="banner" />
                                <div
                                    className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-800 border-8 bg-mine-shaft-700 flex items-center justify-center text-4xl font-semibold text-bright-sun-400 cursor-pointer overflow-hidden"
                                    onClick={() => { if (isEditable) profileInputRef.current?.click(); }}
                                >
                                     {profilePicPreview ? (
                                          <img src={getPublicUrl(profilePicPreview) || undefined} alt="profile" className="w-full h-full object-cover" />
                                     ) : (
                                          (name || 'U').split(' ').map((part:string) => part[0]).join('').slice(0, 2).toUpperCase()
                                     )}
                                </div>
                                <input
                                     ref={profileInputRef}
                                     style={{ display: 'none' }}
                                     type="file"
                                     accept="image/*"
                                     onChange={(e) => {
                                              const file = e.target.files?.[0] || null;
                                              setProfilePicFile(file);
                                              if (file) {
                                                    const url = URL.createObjectURL(file);
                                                    setProfilePicPreview(url);
                                              }
                                     }}
                                />
           </div>
           <div className="px-3 mt-32 flex flex-col gap-4">
                  <div className="text-3xl font-semibold flex justify-between">
                       {isEditable ? (
                            <div className="flex items-center gap-3">
                                 <TextInput value={name} onChange={(e) => setName(e.currentTarget.value)} className="w-96" />
                                 <Button component="a" href={`mailto:${props?.email || ''}`} color="brightSun.4" variant="light" disabled={!props?.email}>Message</Button>
                            </div>
                       ) : (
                            <div className="flex items-center gap-3">
                                 <div>{name || 'Unnamed User'}</div>
                                 <Button component="a" href={`mailto:${props?.email || ''}`} color="brightSun.4" variant="light" disabled={!props?.email}>Message</Button>
                            </div>
                       )}
                  </div>
                  <div className="text-xl flex gap-1 items-center"><IconBriefcase className="h-5 w-5 " stroke={1.5}/>{props?.role || 'USER'} &bull; {props?.resumeUrl ? (<a href={getPublicUrl(props?.resumeUrl) || '#'} target="_blank" rel="noreferrer" className="text-bright-sun-400">Open resume</a>) : 'No resume saved yet'}</div>
                  <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
                            <IconMail className="h-5 w-5 " stroke={1.5}/>{props?.email || 'No email'}
                  </div>
          </div>
                  <Divider mx="xs" my="xl"  />
                      <div className="px-3 flex flex-col gap-4">
                          <div className="text-2xl font-semibold">Profile Details</div>
                            {isEditable ? (
                                 <>
                                      <TextInput label="Name" value={name} onChange={(event) => setName(event.currentTarget.value)} />
                                      <div className="flex gap-4 items-start">
                                           <div className="w-full">
                                                <TextInput label="Resume URL" value={resumeUrl} onChange={(event) => setResumeUrl(event.currentTarget.value)} placeholder="https://..." />
                                                <FileInput placeholder="Upload resume (PDF)" accept="application/pdf" label="Or upload resume" value={resumeFile as any} onChange={(file:any) => setResumeFile(file)} />
                                           </div>
                                      </div>
                                      <TextInput label="Company" value={companyName} onChange={(event) => setCompanyName(event.currentTarget.value)} />
                                      <TextInput label="Skills (comma separated)" value={skills} onChange={(event) => setSkills(event.currentTarget.value)} />
                                      <TextInput label="Experience (years)" value={experience === '' ? '' : String(experience)} onChange={(event) => setExperience(event.currentTarget.value === '' ? '' : Number(event.currentTarget.value))} />
                                      <div className="flex items-center gap-4">
                                           <Button leftSection={<IconDeviceFloppy size={18} />} onClick={handleSave} color="brightSun.4" loading={saving}>Save Changes</Button>
                                           {status && <div className="text-sm text-mine-shaft-300">{status}</div>}
                                      </div>
                                 </>
                            ) : (
                                 <>
                                      <div className="text-sm">Name: <span className="font-semibold">{name}</span></div>
                                      <div className="text-sm">Resume: {resumeUrl ? (<a href={getPublicUrl(resumeUrl) || '#'} target="_blank" rel="noreferrer" className="text-bright-sun-400">Open resume</a>) : 'No resume'}</div>
                                      <div className="text-sm">Company: <span className="font-semibold">{props?.companyName || '—'}</span></div>
                                      <div className="text-sm">Skills: <span className="font-semibold">{props?.skills || '—'}</span></div>
                                      <div className="text-sm">Experience: <span className="font-semibold">{props?.experience ?? '—'} years</span></div>
                                      {status && <div className="text-sm text-mine-shaft-300">{status}</div>}
                                 </>
                            )}
                      </div>
     </div>
}

export default Profile;