import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const Navigate = useNavigate();
  const [auth, setAuth] = React.useState(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.clear();
    sessionStorage.clear();
    Navigate("/");
    
  };

  const handleLogo = (e)=>{
    e.preventDefault();
    Navigate("/");
  }

  React.useEffect(()=>{
    if(localStorage.getItem("token")){
      setAuth(true);
    }
    else{
      setAuth(false);
    }
  });
  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup sx={{display:"none"}}>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleLogo}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={require("../images/srs-logo.jpg")} alt="logo" width={"35px"} style={{borderRadius:'50%'}} />
          </IconButton>
          <Typography onClick={handleLogo} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SRS Tech
          </Typography>
          {auth && (
                <div>
                    <Button onClick={(e)=>{
                      e.preventDefault();
                      Navigate("/dashboard")
                    }} style={{color:"white"}}>Home</Button>
                    <Button onClick={(e)=>{
                      e.preventDefault();
                      Navigate("/employees")
                    }} style={{color:"white"}}>Employee List</Button>

                </div>
            )}
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />&nbsp;<span style={{fontSize:"20px"}}>Sriram</span>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
