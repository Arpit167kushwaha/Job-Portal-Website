import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const NavLinks = () => { 
      const [role, setRole] = useState<string>('');
      const isLoggedIn = !!localStorage.getItem('token');

      useEffect(() => {
          if (isLoggedIn) {
              API.get('/user/me')
                 .then((res) => setRole(res.data.role))
                 .catch((err) => console.log(err));
          }
      }, [isLoggedIn]);

      // Dynamic links array
      const links = [
        { name: "Find Jobs", url: "/find-jobs" },
        // Only recruiters should see "Find Talent"
        ...(role === 'RECRUITER' ? [{ name: "Find Talent", url: "/find-talent" }] : []),
        ...(role === 'RECRUITER' ? [{ name: "Post Job", url: "/post-job" }] : []),
        { name: "About Us", url: "/about" },
      ];

      return (
        <div className="flex gap-5">
            {links.map((link, index) => (
                <NavLink 
                    key={index} 
                    to={link.url}    
                    className={({ isActive }) =>
                        isActive
                            ? "bg-mine-shaft-700 text-sky-400 backdrop-blur-md px-1.5 py-1.5 rounded-xl"
                            : "px-1.5 py-1.5 hover:text-sky-400"
                    }  
                >
                    {link.name}  
                </NavLink>
            ))}
        </div>
      );
}

export default NavLinks;