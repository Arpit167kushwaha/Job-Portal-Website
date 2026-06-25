import { Avatar, Indicator, Menu, Text } from '@mantine/core';
import { IconAnchor, IconBell, IconInfoCircle, IconLogin2, IconLogout2, IconSettings, IconUserCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import NavLinks from './NavLinks';

const Header = () => {
     const navigate = useNavigate();
     const [user, setUser] = useState<any>(null);

     const isLoggedIn = !!localStorage.getItem('token');

     useEffect(() => {
          if (isLoggedIn) {
               API.get('/user/me')
                    .then((res) => setUser(res.data))
                    .catch((err) => console.log(err));
          }
     }, [isLoggedIn]);

     const handleLogout = () => {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
     };

     return (
          <div className="font-['poppins'] w-full bg-mine-shaft-800 px-6 text-white h-24 flex justify-between items-center">

               <div className="flex gap-2 items-center text-sky-400 cursor-pointer" onClick={() => navigate('/')}> 
                    <IconAnchor stroke={2} />
                    <div className="font-semibold">JobHook</div>
               </div>

               {NavLinks()}

               <div className="flex gap-3 items-center">
                    {isLoggedIn && (
                         <div className="bg-mine-shaft-900 p-1.5 rounded-full hover:bg-mine-shaft-700 transition">
                              <Indicator className="cursor-pointer" color="sky.4" offset={6} size={8} withBorder>
                                   <IconBell stroke={1.5} />
                              </Indicator>
                         </div>
                    )}

                    <Menu shadow="md" width={230} position="bottom-end" withArrow>
                         <Menu.Target>
                              <div className="flex gap-2 items-center cursor-pointer">
                                   {isLoggedIn && <div className="text-sm font-medium">{user ? user.name || 'User' : 'User'}</div>}
                                   <Avatar src="avatar-9.png" size="sm" className="ring-2 ring-mine-shaft-600" />
                              </div>
                         </Menu.Target>

                         <Menu.Dropdown bg="var(--mantine-color-mineShaft-9)">
                              {isLoggedIn && (
                                   <>
                                        <Menu.Label>Account</Menu.Label>
                                        <Menu.Item leftSection={<IconUserCircle size={16} />} onClick={() => navigate('/talent-profile')}>
                                             My Profile
                                        </Menu.Item>
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
                                        Logged in as {user ? user.email || 'current user' : 'current user'}
                                   </Text>
                              )}
                         </Menu.Dropdown>
                    </Menu>
               </div>
          </div>
     );
};

export default Header;

