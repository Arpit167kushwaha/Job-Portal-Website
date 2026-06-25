import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Companies from "../LandingPage/Companies";
import DreamJob from "../LandingPage/DreamJob";
import JobCategory from "../LandingPage/JobCategory";

const HomePage=()=>{ 
    return (
        <div className="min-h-[100vh] bg-mine-shaft-800 font-['poppins']">
             <DreamJob/>
             <Companies/>
             <JobCategory/>
        </div>
       
    )
}
export default HomePage;