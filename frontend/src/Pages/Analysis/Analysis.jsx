import React, { useState } from 'react'
import './Analysis.css'
import Navbar from '../../Components/Navbar/Navbar'
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { green, lightGreen } from '@mui/material/colors';
import axios from 'axios'
import { useEffect } from 'react';
import ResultModal from '../../Components/ResultModal/ResultModal';
import { useNavigate } from 'react-router-dom';


function Analysis() {

    const [questions, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [result, setResult] = useState("")
    const url = 'https://dev-mindmate.onrender.com/api/v1/users'
    const handleClose = () => setModalOpen(true);

    const getAllQuestions = () => {
        axios.get(url + '/mindMateQuestions')
            .then((res) => {
                setQuestions(res?.data?.data)
            }).catch((err) => {

            })
    }

    useEffect(() => {
        getAllQuestions();
    }, [])

    const navigate = useNavigate()
const token = localStorage.getItem('accessToken')
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])


    const options = [
        { label: "Strongly Agree", value: 2 },
        { label: "Agree", value: 1 },
        { label: "Neutral", value: 0 },
        { label: "Disagree", value: -1 },
        { label: "Strongly Disagree", value: -2 },
    ];

    const mentalStates = {
        depression: "Depression",
        anxiety: "Anxiety",
        ptsd: "PTSD",
        ocd: "OCD",
        bpd: "BPD",
        eatingDisorders: "Eating Disorders",
        schizophrenia: "Schizophrenia",
        adhd: "ADHD",
        substanceUseDisorders: "Substance Use Disorders",
        bipolarDisorders: "Bipolar Disorders",
    };

    const [answers, setAnswers] = useState([]);

    const handleAnswerChange = (questionIndex, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = value;
        setAnswers(updatedAnswers);
    };

    const calculateMentalState = () => {
        // Calculate the total score for each mental state category
        let mentalStateScores = {};

        questions.forEach((question, index) => {
            const answerValue = answers[index] || 0;
            question.mentalStates.forEach(mentalState => {
                mentalStateScores[mentalState] = (mentalStateScores[mentalState] || 0) + answerValue;
            });
        });

        // Determine the mental state based on the scores
        let mentalState = '';
        let highestScore = -Infinity;

        for (const [state, score] of Object.entries(mentalStateScores)) {
            if (score > highestScore) {
                mentalState = state;
                highestScore = score;
            }
        }

        return mentalState;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = calculateMentalState();
        // Display the result to the user or perform any additional actions
        setResult(result);
        setAnswers([]); // Reset the answers after submitting
    };
    return (
        <div className='analysis'>
            <div className="analysis_wrapper">
                <Navbar />
                <hr />
                <div className="analysis_box">
                    <span className='analysis_title'>Mental Health Analysis Test</span>
                </div>
            </div>
            <div className="analysis_que_box">
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="analysis_que">
                            <div className="question_row">
                                <span className="index">{index + 1}.</span>
                                <span className="question">{question?.question}</span>
                            </div>
                            {options.map((option, optionIndex) => (
                                <div className="question_row">
                                    <label key={optionIndex} >
                                        <input className='check_box'
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option.value}
                                            checked={answers[index] === option.value}
                                            onChange={() => handleAnswerChange(index, option.value)}
                                        />
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit" className='submit_button' onClick={() => {
                        setTimeout(() => {
                            setModalOpen(true)
                        }, 900);
                    }}>Submit</button>
                </form>
                <hr />
            </div>
            <ResultModal handleClose={handleClose} modalOpen={modalOpen} result={result} />
        </div>
    )
}

export default Analysis