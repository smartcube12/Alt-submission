import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginRegisterPage from './LoginAndRegister';
import VoterInformationPage from './VoterInformationPage';
import VotingBallotPage from './VotingBallotPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginRegisterPage />} />
                <Route path="/voter-information" element={<VoterInformationPage />} />
                <Route path="/voting-ballot" element={<VotingBallotPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
