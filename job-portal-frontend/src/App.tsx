import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/carousel/styles.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FindTalentPage from './Pages/FindTalentPage';
import FindJobsPage from './Pages/FindJobsPage';
import TalentProfilePage from './Pages/TalentProfilePage';
import PostJobPage from './Pages/PostJobPage';
import JobDescPage from './Pages/JobDescPage';
import ApplyJobPage from './Pages/ApplyJobPage';
import LoginPage from './Pages/Auth/LoginPage';
import SignUpPage from './Pages/Auth/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './Pages/AboutPage';
import CompanyPage from './Pages/CompanyPage';
import SettingsPage from './Pages/SettingsPage';
import PostedJobsPage from './Pages/PostedJobsPage';
import AppliedJobsPage from './Pages/AppliedJobsPage';
import SavedJobsPage from './Pages/SavedJobsPage';

function App() {
  const theme = createTheme({ 
    focusRing: "never",
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif",
    primaryColor: 'brightSun',
    primaryShade: 4,
    colors: {
        'mineShaft': ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#334155', '#1e293b', '#0f172a', '#0b0f19', '#030712'],
        'brightSun': ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03']
    },
    defaultRadius: 'md',
  });

  return (
     <MantineProvider defaultColorScheme='dark' theme={theme}>
         <BrowserRouter>
         <div className='relative min-h-screen flex flex-col justify-between bg-mine-shaft-950 text-slate-100 selection:bg-bright-sun-400 selection:text-slate-900'> 
             <div>
                 <Header/>
                 <Routes>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/signup' element={<SignUpPage/>}/>
                    <Route path='/find-jobs' element={<FindJobsPage/>}/>
                    <Route path='/jobs/:id' element={<JobDescPage/>}/>
                    <Route path='/companies' element={<CompanyPage/>}/>
                    <Route path='/about' element={<AboutPage/>}/>
                    <Route path='/' element={<HomePage/>} />
                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path='/find-talent' element={<FindTalentPage/>}/>
                        <Route path='/apply-job/:jobId' element={<ApplyJobPage/>}/>
                        <Route path='/post-job' element={<PostJobPage/>}/>
                        <Route path='/posted-jobs' element={<PostedJobsPage/>}/>
                        <Route path='/applied-jobs' element={<AppliedJobsPage/>}/>
                        <Route path='/saved-jobs' element={<SavedJobsPage/>}/>
                        <Route path='/talent-profile' element={<TalentProfilePage/>}/>
                        <Route path='/talent-profile/:id' element={<TalentProfilePage/>}/>
                        <Route path='/settings' element={<SettingsPage/>}/>
                    </Route>

                    <Route path='*' element={<HomePage/>} />
                 </Routes>
             </div>
             <Footer/>
         </div>
         </BrowserRouter>
     </MantineProvider>
  );
}

export default App;