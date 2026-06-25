import { createTheme, Divider, MantineProvider} from '@mantine/core';
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
import SettingsPage from './Pages/SettingsPage';

function App() {
  const theme = createTheme({ 
    focusRing:"never",
    fontFamily:"poppins, sins-serif",
    primaryColor:'brightSun',
    primaryShade:4,
    colors:{
        'mineShaft': ['#fafafa','#f5f5f5','#e6e6e6', '#d6d6d6','#767676','#a5a5a5','#575757','#434343','#2d2d2d','#1a1a1a','#0a0a0a'],
        'brightSun':['#fffbeb','#fff3c6','#ffe588','#ffd149','#ffbd20','#f99b07','#dd7302','#b74f06','#943d0c','#7a320d','#461802']
    },
  })
  return (
     <MantineProvider defaultColorScheme='dark' theme ={theme}>
         <BrowserRouter>
         <div className='relative'> 
             <Header/>
             <Divider size="xs" mx="md" />
             <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/find-jobs' element={<FindJobsPage/>}/>
                <Route path='/jobs/:id' element={<JobDescPage/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='*' element={<HomePage/>} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/find-talent' element={<FindTalentPage/>}/>
                    <Route path='/apply-job/:jobId' element={<ApplyJobPage/>}/>
                    <Route path='/post-job' element={<PostJobPage/>}/>
                    <Route path='/talent-profile' element={<TalentProfilePage/>}/>
                    <Route path='/talent-profile/:id' element={<TalentProfilePage/>}/>
                  <Route path='/settings' element={<SettingsPage/>}/>
                </Route>
             </Routes>
             <Footer/>
         </div>
         </BrowserRouter>
     </MantineProvider>
  );
}
export default App;