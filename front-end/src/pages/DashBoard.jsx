import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Navigate, useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const Navigate = useNavigate();
    const handleClick = (e)=>{
        e.preventDefault();
        Navigate("/new-employee");
    }
    return (
        <div>
            <h1 className='text-center'>Welcome to Admin Panel</h1>
            <p className='text-center'>Get started by adding the employees to your organization.</p>
            <div className='text-center'><Button variant="contained" onClick={handleClick}><i className="fa-solid fa-user-plus"></i> &nbsp; New Employee</Button></div>
        </div>
    )
  
}

export default DashBoard;
