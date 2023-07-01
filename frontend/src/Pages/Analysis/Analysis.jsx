import React, { useState } from 'react'
import './Analysis.css'
import Navbar from '../../Components/Navbar/Navbar'
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { green, lightGreen } from '@mui/material/colors';
import axios from 'axios'
import { useEffect } from 'react';
function Analysis() {

    const [questions, setQuestions] = useState([]);
    const [value,setValue] = useState(0)

    const getAllQuestions = () => {
        axios.get('https://dev-mindmate.onrender.com/api/v1/users/mindMateQuestions')
            .then((res) => {
                console.log(res.data.data);
                setQuestions(res?.data?.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAllQuestions();
    }, [])
console.log(value)
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
                {questions && questions.map((question, index) => (
                    <div className="analysis_que" key={index}>
                        <div className="question_row">
                            <span className="index">{index+1}.</span>
                            <span className="question">{question?.question}</span>
                        </div>
                        <div className="question_row">
                            <span className="agreetext">Agree</span>
                            <span class="material-icons agree3 agree" onClick={()=>{
                                setValue(3)
                            }}>radio_button_unchecked</span>
                            <span class="material-icons agree2 agree" onClick={()=>{
                                setValue(2)
                            }}>radio_button_unchecked</span>
                            <span class="material-icons agree1 agree" onClick={()=>{
                                setValue(1)
                            }}>radio_button_unchecked</span>
                            <span class="material-icons agree0" onClick={()=>{
                                setValue(0)
                            }}>radio_button_unchecked</span>
                            <span class="material-icons disagree1 disagree" onClick={()=>{
                                setValue(-1)
                            }}>radio_button_unchecked</span>
                            <span class="material-icons disagree2 disagree" onClick={()=>{
                                setValue(-2)
                            }}>radio_button_unchecked</span>
                            <span class="material-icons disagree3 disagree" onClick={()=>{
                                setValue(-3)
                            }}>radio_button_unchecked</span>
                            <span className="agreetext">Disagree</span>
                        </div>
                        <hr className='que' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Analysis