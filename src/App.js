import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LoginPage } from './LoginPageComponents/LoginPage';
import { ChooseServicePage } from './ChooseServicePageComponents/ChooseServicePage';
import { RegistrationPage } from './RegistrationPageComponents/RegPage';
import { ResumesPage } from './ResumesBranch/ResumePageComponents/ResumesPage';
import { GroupClientsPage } from './ResumesBranch/GroupClientsPageComponents/GroupClientsPage';
import { ClientResumesRouter } from './ResumesBranch/ClientResumesPageComponents/СlientResumesRouter';
import { ClientReviewsPage } from './ResumesBranch/ClientReviewsPageComponents.js/ClientReviewsPage';
import { TutorClientsPage } from './ResumesBranch/AllTutorResidentsPageComponents/TutorClientsPage';
import { ClientsreviewsPage } from './ReviewsBranch/AllTutorClientsReviewsPage';

// function App() {
//   return (
//     <div className="App">
//       <LoginPage/>
//     </div>
//   );
// }

function App(props) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chooseService" element={<ChooseServicePage />} />
            <Route path="/Registration" element={<RegistrationPage />} />
            <Route path="/Resumes" element={<ResumesPage />} />
            <Route path="/GroupClients" element={<GroupClientsPage />} />
            <Route path="/ClientsResumes" element={<ClientResumesRouter />} />
            <Route path="/ClientReviews" element={<ClientReviewsPage />} />
            <Route path="/AllResidents" element={<TutorClientsPage />} />
            <Route path="/ClientsWithReviews" element={<ClientsreviewsPage />} />
          </Routes>
        </BrowserRouter>
      );
    }

export default App;
