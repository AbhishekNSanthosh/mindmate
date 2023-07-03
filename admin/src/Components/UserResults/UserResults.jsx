import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './UserResults.css'


export default function UserResults({ open, handleClose, results }) {


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 450,
                        bgcolor: 'background.paper',
                        border: 'none',
                        boxShadow: 24,
                        p: 4,
                        borderRadius:'10px'
                    }}>
                        <div className="results_container">
                            <div className="results_row">
                                <span className="user_results_name">Your Previous Analysis Reports</span>
                            </div>
                            <div className="result_col">
                                {results && results.map((result, index) => (
                                    <div className="results_row_item">
                                        <span className="results_row_item_index">
                                           {index+1}.
                                        </span>
                                        <span className="progressess">
                                            Stages of <span className="bold">{result?.result}</span> were found
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}