import React, { useState } from 'react';
import './LoginAndRegister.css';
import { useNavigate } from 'react-router-dom';

const LoginRegisterPage: React.FC = () => {

    const navigate = useNavigate();



    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/voting-ballot');
        
    };

    return (
        <div className="container">
            <div className="info-section">
                <div className="info-content">
                    <h2>VOTER INFORMATION</h2>
                    <p>**placeholder**</p>
                    <p>**placeholder**</p>
                    <p>**placeholder**</p>
                    <p>**placeholder**</p>
                    <p>**placeholder**</p>
                    <button className="info-button" onClick={() => navigate('/voter-information')}>
                        Already Registered?
                    </button>
                </div>
            </div>
            <div className="form-section">
                <form onSubmit={handleRegister}>
                    <div className="form-content">
                        <h2>REGISTER FORM</h2>
                        <div className="form-group">
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                        </div>
                        <input type="Text" placeholder="ID Number" required />
                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="City" 
                                required 
                            />
                            <input 
                                type="number" 
                                placeholder="Zip Code" 
                                required 
                            />
                        </div>
                        <div className="checkbox">
                            <label>
                                Please review the <a href="https://sos.nebraska.gov/elections/voter-id" className="terms-link" target="_blank" rel="noopener noreferrer">Voter ID Information</a>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default LoginRegisterPage;