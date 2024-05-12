import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login';
import NavBar from './components/navbar';
import DashBoard from './pages/DashBoard';
import CreateEmployee from './pages/CreateEmployee';
import Employees from './pages/EmployeesList';
import UpdateEmployee from './pages/UpdateEmployee';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  
  const handleClickVariant = (variant) => () => {
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <BrowserRouter>
        {/* <NavBar /> */}
        <NavBar />
        <div>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/dashboard' element={<DashBoard />} />
            <Route exact path='/new-employee' element={<CreateEmployee />} />
            <Route exact path='/employees' element={<Employees />} />
            <Route exact path='/update-employee' element={<UpdateEmployee />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default function App() {
  return (
    <SnackbarProvider autoHideDuration={1500} maxSnack={1} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <MyApp />
    </SnackbarProvider>
  );
}