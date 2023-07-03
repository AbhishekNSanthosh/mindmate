import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './ResultModal.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function ResultModal({ handleClose, modalOpen, result }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 785,
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px'
          }}>
            <div className="result_container">
              <div className="result_row top">
                <div className="result_row_item">
                  <span className="result_name">
                    You’ve been diagnosed with :
                  </span>
                </div>
                <div className="result_row_item">
                  <span className="result_name result">
                    {result && result}
                  </span>
                </div>
              </div>
              <div className="result_row">
                <NavLink to='/book'>
                  <div className="result_row_item">
                    <button className="result_row_button">Book Appointment.</button>
                  </div>
                </NavLink>
                <NavLink to='/resources'>
                  <div className="result_row_item">
                    <button className="result_row_button">Resourse</button>
                  </div>
                </NavLink>
                <NavLink to='/progress'>
                  <div className="result_row_item">
                    <button className="result_row_button">Progress</button>
                  </div>
                </NavLink>
                <NavLink to='/'>
                  <div className="result_row_item">
                    <button className="result_row_button">Exit</button>
                  </div>
                </NavLink>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}