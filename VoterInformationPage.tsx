import React from 'react';
import './VoterInformationPage.css';
import { useNavigate } from 'react-router-dom';

const VoterInformationPage: React.FC = () => {
    const navigate = useNavigate(); // Hook to navigate between routes

    const handleRegisterClick = () => {
        navigate('/voting-ballot'); // Redirects to the voting ballot page
    };

    return (
        <div className="voter-info-container">
            <button className="back-button" onClick={() => navigate('/')}>
                Back to Registration
            </button>
            <h2>Enter Voter Information</h2>
            <form>
                <label>
                    Voter ID:
                    <input type="text" placeholder="Enter your Voter ID" required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" required />
                </label>
                <button type="button" className="register-button" onClick={handleRegisterClick}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default VoterInformationPage;
