import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const NavLinks = () => { 
      const [role, setRole] = useState<string>(localStorage.getItem('role') || '');
      const isLoggedIn = !!localStorage.getItem('token');

      const fetchRole = () => {
          if (localStorage.getItem('token')) {
              API.get('/user/me')
                 .then((res) => {
                     setRole(res.data.role);
                     if (res.data.role) localStorage.setItem('role', res.data.role);
                 })
                 .catch((err) => console.log(err));
          } else {
              setRole('');
          }
      };

      useEffect(() => {
          fetchRole();

          const handleAuthChange = () => {
              setRole(localStorage.getItem('role') || '');
              fetchRole();
          };

          window.addEventListener('authChange', handleAuthChange);
          return () => window.removeEventListener('authChange', handleAuthChange);
      }, [isLoggedIn]);

      // Dynamic links array based on role
      const links = [
        { name: "Find Jobs", url: "/find-jobs" },
        // Candidate specific links
        ...(isLoggedIn && role === 'CANDIDATE' ? [
            { name: "My Applications", url: "/applied-jobs" },
            { name: "Saved Jobs", url: "/saved-jobs" },
        ] : []),
        // Recruiter specific links
        ...(isLoggedIn && role === 'RECRUITER' ? [
            { name: "Manage Jobs & Applicants", url: "/posted-jobs" },
            { name: "Post Job", url: "/post-job" },
            { name: "Find Talent", url: "/find-talent" },
        ] : []),
        { name: "About Us", url: "/about" },
      ];

      return (
        <div className="flex gap-4 items-center">
            {links.map((link, index) => (
                <NavLink 
                    key={index} 
                    to={link.url}    
                    className={({ isActive }) =>
                        isActive
                            ? "bg-mine-shaft-700 text-bright-sun-400 font-medium px-3 py-1.5 rounded-lg transition"
                            : "px-3 py-1.5 text-mine-shaft-200 hover:text-bright-sun-400 transition"
                    }  
                >
                    {link.name}  
                </NavLink>
            ))}
        </div>
      );
}

export default NavLinks;