import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useSnackbar } from 'notistack';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        SRS Tech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();

  React.useEffect(()=>{
    const checkToken = async()=>{
      if(localStorage.getItem("token")){
      
        await Axios.post("http://localhost:8000/", {
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }).then((res)=>{
          //console.log(res.data);
          if(res.status === 200){

            let variant = "";
            enqueueSnackbar(res.data.message, { variant });
            Navigate("/dashboard");
          }
          else{
            let variant = "error";
            enqueueSnackbar(res.data.message, { variant });
            localStorage.removeItem("token");
          }
        }).catch((err)=>{
          let variant = "error";
          enqueueSnackbar("Connection Error", { variant });
        });
      }
    }

    checkToken();
    
  }, []);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await Axios.post("http://localhost:8000/login", {
      userName: data.get('userName'),
      password: data.get('password'),
    }).then(async(res)=>{
      //console.log(res.data);
      if(res.status === 200){
        let variant = "success";
        enqueueSnackbar(res.data.message, { variant });
        localStorage.setItem("token", res.data.token);
        //console.log(localStorage.getItem("token"), "localStorage");
        Navigate("/dashboard");
      }else{
        let variant = "error";
        enqueueSnackbar(res.data.message, { variant });
      }
    }).catch(async(err)=>{
      let variant = 'error';
      enqueueSnackbar('Connection Error!', { variant });
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}