import { IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks: { title: string; links: { label: string; url: string }[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Find Job", url: "/find-jobs" },
        { label: "Find Company", url: "/companies" },
        { label: "Find Employee", url: "/find-talent" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Contact Us", url: "/about" },
        { label: "Privacy Policy", url: "/about" },
        { label: "Terms & Conditions", url: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help & Support", url: "/about" },
        { label: "Feedback", url: "/about" },
        { label: "FAQs", url: "/about" },
      ],
    },
  ];

  return (
    <div className="pt-20 pb-5 flex gap-5 justify-around bg-mine-shaft-800 font-['poppins']">
      <div className="w-1/4 flex flex-col gap-4">
        <div className="flex gap-2 items-center text-sky-400">
          <IconAnchor className="h-6 w-6" stroke={2} />
          <div className="text-xl font-semibold ">JobHook</div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          Job Portal with user profiles, skill updates, certifications, work experience and admin job postings.
        </div>
        <div className="flex gap-3 text-sky-400 [&>div]:bg-mine-shaft-700 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-500">
          <div>
            <IconBrandFacebook />
          </div>
          <div>
            <IconBrandInstagram />
          </div>
          <div>
            <IconBrandX />
          </div>
        </div>
      </div>

      {footerLinks.map((item, index) => (
        <div key={index}>
          <div className="text-lg font-semibold mb-3.5 text-sky-400">{item.title}</div>
          {item.links.map((link, idx) => (
            <Link
              key={idx}
              to={link.url}
              className="text-mine-shaft-300 text-sm hover:text-sky-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out block"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;

