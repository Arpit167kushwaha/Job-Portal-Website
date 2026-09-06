import { Avatar, Badge, Indicator, Menu, Text } from '@mantine/core';
import {
  IconAnchor,
  IconBell,
  IconBookmark,
  IconBriefcase,
  IconInfoCircle,
  IconLogin2,
  IconLogout2,
  IconSend,
  IconSettings,
  IconUserCircle,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import NavLinks from './NavLinks';

const Header = () => {
     const navigate = useNavigate();
     const [user, setUser] = useState<any>(null);

     const isLoggedIn = !!localStorage.getItem('token');

     const fetchUser = () => {
          if (localStorage.getItem('token')) {
               API.get('/user/me')
                    .then((res) => {
                         setUser(res.data);
                         if (res.data.role) localStorage.setItem('role', res.data.role);
                    })
                    .catch(() => setUser(null));
          } else {
               setUser(null);
          }
     };

     useEffect(() => {
          fetchUser();

          const handleAuthChange = () => {
               fetchUser();
          };

          window.addEventListener('authChange', handleAuthChange);
          return () => window.removeEventListener('authChange', handleAuthChange);
     }, [isLoggedIn]);

     const handleLogout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          setUser(null);
          window.dispatchEvent(new Event('authChange'));
          navigate('/login');
     };

     const isRecruiter = user?.role === 'RECRUITER' || localStorage.getItem('role') === 'RECRUITER';

     return (
          <div className="font-['poppins'] w-full bg-mine-shaft-800 px-6 text-white h-20 flex justify-between items-center border-b border-mine-shaft-700">

               <div className="flex gap-2 items-center text-bright-sun-400 cursor-pointer" onClick={() => navigate('/')}> 
                    <IconAnchor stroke={2.5} size={28} />
                    <div className="font-bold text-xl tracking-wide text-white">Job<span className="text-bright-sun-400">Portal</span></div>
               </div>

               <NavLinks />

               <div className="flex gap-3 items-center">
                    {isLoggedIn && (
                         <div className="bg-mine-shaft-900 p-2 rounded-full hover:bg-mine-shaft-700 transition cursor-pointer">
                              <Indicator color="yellow" offset={4} size={7} withBorder>
                                   <IconBell stroke={1.5} size={18} />
                              </Indicator>
                         </div>
                    )}

                    <Menu shadow="md" width={240} position="bottom-end" withArrow>
                         <Menu.Target>
                              <div className="flex gap-2 items-center cursor-pointer bg-mine-shaft-900 py-1.5 px-3 rounded-full hover:bg-mine-shaft-700 transition">
                                   {isLoggedIn ? (
                                        <>
                                             <div className="text-sm font-medium text-white max-w-[120px] truncate">
                                                  {user?.name || localStorage.getItem('name') || 'User'}
                                             </div>
                                             <Badge size="xs" color={isRecruiter ? 'blue' : 'green'} variant="light">
                                                  {isRecruiter ? 'Recruiter' : 'Candidate'}
                                             </Badge>
                                             <Avatar size="sm" radius="xl" color="brightSun">
                                                  {(user?.name || localStorage.getItem('name') || 'U').charAt(0).toUpperCase()}
                                             </Avatar>
                                        </>
                                   ) : (
                                        <div className="text-sm font-medium text-bright-sun-400">Account</div>
                                   )}
                              </div>
                         </Menu.Target>

                         <Menu.Dropdown bg="var(--mantine-color-mineShaft-9)">
                              {isLoggedIn && (
                                   <>
                                        <Menu.Label>Dashboard & Profile</Menu.Label>
                                        <Menu.Item leftSection={<IconUserCircle size={16} />} onClick={() => navigate('/talent-profile')}>
                                             My Profile
                                        </Menu.Item>

                                        {isRecruiter ? (
                                             <Menu.Item leftSection={<IconBriefcase size={16} />} onClick={() => navigate('/posted-jobs')}>
                                                  Manage Jobs & Applicants
                                             </Menu.Item>
                                        ) : (
                                             <>
                                                  <Menu.Item leftSection={<IconSend size={16} />} onClick={() => navigate('/applied-jobs')}>
                                                       My Applications
                                                  </Menu.Item>
                                                  <Menu.Item leftSection={<IconBookmark size={16} />} onClick={() => navigate('/saved-jobs')}>
                                                       Saved Jobs
                                                  </Menu.Item>
                                             </>
                                        )}

                                        <Menu.Item leftSection={<IconSettings size={16} />} onClick={() => navigate('/settings')}>
                                             Settings
                                        </Menu.Item>
                                        <Menu.Divider />
                                   </>
                              )}

                              <Menu.Label>Explore</Menu.Label>
                              <Menu.Item leftSection={<IconInfoCircle size={16} />} onClick={() => navigate('/about')}>
                                   About Us
                              </Menu.Item>

                              {!isLoggedIn ? (
                                   <Menu.Item leftSection={<IconLogin2 size={16} />} onClick={() => navigate('/login')}>
                                        Login / Sign Up
                                   </Menu.Item>
                              ) : (
                                   <Menu.Item color="red" leftSection={<IconLogout2 size={16} />} onClick={handleLogout}>
                                        Logout
                                   </Menu.Item>
                              )}

                              {isLoggedIn && (
                                   <Text size="xs" c="dimmed" px="sm" pt="xs">
                                        {user?.email || localStorage.getItem('email') || ''}
                                   </Text>
                              )}
                         </Menu.Dropdown>
                    </Menu>
               </div>
          </div>
     );
};

export default Header;
