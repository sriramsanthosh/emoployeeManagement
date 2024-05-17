import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';
import { useSnackbar } from 'notistack';

export default function AlertDialog(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDeleteClose = async(e)=>{
    e.preventDefault();
    let empId = props.empId;
    await Axios.delete(`https://emoployee-management-h6ms.vercel.app/employee/delete?empId=${empId}`).then(async(res)=>{
      //console.log(res.data);
      if(res.status === 200){
        let variant = "success";
        enqueueSnackbar(res.data.message, { variant });
        await props.fetchEmployeeDetails();
      }
    }).catch((err)=>{
      //console.log(err);
      let variant = "error";
      enqueueSnackbar("Connection Error..", { variant });
    });
    
    
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="contained" color='error' onClick={handleClickOpen}>
        delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Delete Employee
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this employee data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
