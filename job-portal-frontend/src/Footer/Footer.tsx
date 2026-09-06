import { IconAnchor, IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    {
      title: "Discover",
      links: [
        { label: "Search Open Jobs", url: "/find-jobs" },
        { label: "Explore Companies", url: "/companies" },
        { label: "Find Tech Talent", url: "/find-talent" },
        { label: "Post a Job", url: "/post-job" },
      ],
    },
    {
      title: "Candidate",
      links: [
        { label: "My Applications", url: "/applied-jobs" },
        { label: "Saved Jobs", url: "/saved-jobs" },
        { label: "Candidate Profile", url: "/talent-profile" },
        { label: "Account Settings", url: "/settings" },
      ],
    },
    {
      title: "Company & Info",
      links: [
        { label: "About JobPortal", url: "/about" },
        { label: "Platform Features", url: "/about" },
        { label: "Security & Privacy", url: "/about" },
        { label: "Contact Us", url: "/about" },
      ],
    },
  ];

  return (
    <footer className="pt-16 pb-8 bg-mine-shaft-950 border-t border-mine-shaft-800 font-['poppins'] px-6 lg:px-16 text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
        {/* Brand Column */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <Link to="/" className="flex gap-2 items-center text-bright-sun-400 no-underline">
            <IconAnchor className="h-7 w-7" stroke={2.5} />
            <div className="text-2xl font-bold tracking-wide text-white">
              Job<span className="text-bright-sun-400">Portal</span>
            </div>
          </Link>
          <div className="text-sm text-mine-shaft-400 leading-relaxed max-w-sm">
            Full-Stack enterprise job portal built with Java 21, Spring Boot 4, React 19, and MySQL. Enabling seamless recruiter hiring and candidate career growth.
          </div>
          <div className="flex gap-3 text-mine-shaft-300 mt-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-mine-shaft-900 p-2.5 rounded-full border border-mine-shaft-700 hover:border-bright-sun-400 hover:text-bright-sun-400 transition">
              <IconBrandGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-mine-shaft-900 p-2.5 rounded-full border border-mine-shaft-700 hover:border-bright-sun-400 hover:text-bright-sun-400 transition">
              <IconBrandLinkedin size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="bg-mine-shaft-900 p-2.5 rounded-full border border-mine-shaft-700 hover:border-bright-sun-400 hover:text-bright-sun-400 transition">
              <IconBrandX size={18} />
            </a>
            <Link to="/about" className="bg-mine-shaft-900 p-2.5 rounded-full border border-mine-shaft-700 hover:border-bright-sun-400 hover:text-bright-sun-400 transition">
              <IconMail size={18} />
            </Link>
          </div>
        </div>

        {/* Links Columns */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {footerLinks.map((item, index) => (
            <div key={index}>
              <div className="text-base font-semibold mb-4 text-white tracking-wide">
                {item.title}
              </div>
              <div className="flex flex-col gap-2.5">
                {item.links.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.url}
                    className="text-mine-shaft-400 text-sm hover:text-bright-sun-400 hover:translate-x-1 transition duration-200 block"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-mine-shaft-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-mine-shaft-500">
        <div>&copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.</div>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-mine-shaft-300">Privacy Policy</Link>
          <Link to="/about" className="hover:text-mine-shaft-300">Terms of Service</Link>
          <Link to="/about" className="hover:text-mine-shaft-300">Security</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
