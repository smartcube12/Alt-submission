import React, { useState } from 'react';
import './VotingBallotPage.css';
import { useNavigate } from 'react-router-dom';

const VotingBallotPage: React.FC = () => {
    type SelectionGroup = 
        | 'president' 
        | 'vicePresident' 
        | 'senate' 
        | 'houseOfRepresentatives' 
        | 'judges' 
        | 'mayor' 
        | 'measure1' 
        | 'measure2' 
        | 'measure3';

    const [selections, setSelections] = useState<Record<SelectionGroup, string>>({
        president: '',
        vicePresident: '',
        senate: '',
        houseOfRepresentatives: '',
        judges: '',
        mayor: '',
        measure1: '',
        measure2: '',
        measure3: '',
    });



    const handleSelection = (group: SelectionGroup, value: string) => {
        setSelections(prevSelections => ({
            ...prevSelections,
            [group]: prevSelections[group] === value ? '' : value // Toggle selection
        }));
    };
    
    
    const navigate = useNavigate();

        

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Selections submitted:', selections);
        // Submit to backend API or handle further
        navigate('/')
        // Redirect to home page
  

    };

    return (
        <div className="ballot-container">
            <h2>Voting Ballot</h2>
            <form onSubmit={handleSubmit}>
                <div className="ballot-columns">
                    {/* Left column - Candidates */}
                    <div className="ballot-column candidates-column">

                        <div className="ballot-section">
                            <h3>President</h3>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.president === 'candidate1' ? 'selected' : ''}`}
                                onClick={() => handleSelection('president', 'candidate1')}
                            >
                                Candidate 1
                            </button>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.president === 'candidate2' ? 'selected' : ''}`}
                                onClick={() => handleSelection('president', 'candidate2')}
                            >
                                Candidate 2
                            </button>
                        </div>

                        <div className="ballot-section">
                            <h3>Vice President</h3>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.vicePresident === 'candidate1' ? 'selected' : ''}`}
                                onClick={() => handleSelection('vicePresident', 'candidate1')}
                            >
                                Candidate 1
                            </button>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.vicePresident === 'candidate2' ? 'selected' : ''}`}
                                onClick={() => handleSelection('vicePresident', 'candidate2')}
                            >
                                Candidate 2
                            </button>
                        </div>

                        <div className="ballot-section">
                            <h3>Senate</h3>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.senate === 'candidate1' ? 'selected' : ''}`}
                                onClick={() => handleSelection('senate', 'candidate1')}
                            >
                                Candidate 1
                            </button>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.senate === 'candidate2' ? 'selected' : ''}`}
                                onClick={() => handleSelection('senate', 'candidate2')}
                            >
                                Candidate 2
                            </button>
                        </div>

                        {/* Add additional sections for House of Representatives, Judges, Mayor similarly... */}
                        
                    </div>

                    {/* Right column - Ballot Measures */}
                    <div className="ballot-column measures-column">
                        <h3>Ballot Measures</h3>

                        <div className="measure">
                            <p>Measure 1: Description of measure</p>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.measure1 === 'for' ? 'selected' : ''}`}
                                onClick={() => handleSelection('measure1', 'for')}
                            >
                                For
                            </button>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.measure1 === 'against' ? 'selected' : ''}`}
                                onClick={() => handleSelection('measure1', 'against')}
                            >
                                Against
                            </button>
                        </div>

                        <div className="measure">
                            <p>Measure 2: Description of measure</p>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.measure2 === 'for' ? 'selected' : ''}`}
                                onClick={() => handleSelection('measure2', 'for')}
                            >
                                For
                            </button>
                            <button 
                                type="button" 
                                className={`vote-button ${selections.measure2 === 'against' ? 'selected' : ''}`}
                                onClick={() => handleSelection('measure2', 'against')}
                            >
                                Against
                            </button>
                        </div>

                        {/* Additional ballot measures can be added similarly... */}

                    </div>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default VotingBallotPage;
