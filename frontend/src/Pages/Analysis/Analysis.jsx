import React from 'react'
import './Analysis.css'
import Navbar from '../../Components/Navbar/Navbar'
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { green, lightGreen } from '@mui/material/colors';

function Analysis() {
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
                <div className="analysis_que">
                    <div className="question_row">
                        <span className="index">1.</span>
                        <span className="question">Do you often find it difficult to concentrate or focus on tasks?</span>
                    </div>
                    <div className="question_row">
                        <span className="agreetext">Agree</span>
                        <span class="material-icons agree3 agree">radio_button_unchecked</span>
                        <span class="material-icons agree2 agree">radio_button_unchecked</span>
                        <span class="material-icons agree1 agree">radio_button_unchecked</span>
                        <span class="material-icons agree0">radio_button_unchecked</span>
                        <span class="material-icons disagree1 disagree">radio_button_unchecked</span>
                        <span class="material-icons disagree2 disagree">radio_button_unchecked</span>
                        <span class="material-icons disagree3 disagree">radio_button_unchecked</span>
                        <span className="agreetext">Disagree</span>
                    </div>
                    <hr className='que'/>
                </div>
            </div>
        </div>
    )
}

export default Analysis