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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate } from 'react-router-dom';
import Axios from "axios"
import { useSnackbar } from 'notistack';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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

const defaultTheme = createTheme();

export default function CreateEmployee() {
  const Navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [gender, setGender] = React.useState('');
  const [designation, setDesignation] = React.useState('');
  const [age, setAge] = React.useState('');
  const [courses, setCourses] = React.useState({
    MCA: false,
    BCA: false,
    BSC: false,
  });
  const [image, setImage] = React.useState(null);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourses({ ...courses, [event.target.name]: event.target.checked });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // //console.log({
    //   name: data.get('name'),
    //   email: data.get('email'),
    //   phone: data.get('phone'),
    //   avatar: data.get('userAvatar')
    // }, age);

    // let employeeData = 
    // //console.log(employeeData);
    await Axios.post("https://emoployee-management-h6ms.vercel.app/employee/create", {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      designation: designation,
      gender: gender,
      courses: courses,
      image:image
    }).then(async(res)=>{
      if(res.status === 200){
        let variant = "success";
        enqueueSnackbar(res.data.message, { variant });
      }
      else{
        localStorage.removeItem("token");
        let variant = "error";
            enqueueSnackbar(res.data.message, { variant });
            // Navigate("/");
      }
    }).catch((err)=>{
      //console.log("Connection Error", err);
      let variant = "error";
      enqueueSnackbar("Connection Error", { variant });

    });
    // Navigate("/employees");
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
            <BadgeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Employee
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              type="text"
              autoComplete="fname"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="Phone"
              type="text"
              id="phone"
              autoComplete="phone"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="designation"
                value={designation}
                label="Designation"
                onChange={(e) => setDesignation(e.target.value)}
              >
                <MenuItem value={"HR"}>HR</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
                <MenuItem value={"Sales"}>Sales</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ margin: "10px 0" }}>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <FormGroup margin="normal">
              <FormLabel id="" style={{ margin: "10px 0" }}>Course</FormLabel>
              <FormControlLabel 
                control={<Checkbox checked={courses.MCA} onChange={handleCourseChange} name="MCA" />} 
                label="MCA" 
              />
              <FormControlLabel 
                control={<Checkbox checked={courses.BCA} onChange={handleCourseChange} name="BCA" />} 
                label="BCA" 
              />
              <FormControlLabel 
                control={<Checkbox checked={courses.BSC} onChange={handleCourseChange} name="BSC" />} 
                label="BSC" 
              />
            </FormGroup>

            <div style={{ margin: "15px 0" }}>
              <FormLabel id="">Profile Photo</FormLabel>
              <br />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="contained-button-file">
                <Button
                  style={{ margin: "10px 0" }}
                  component="span"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
            </div>
            {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100px' }} />}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
