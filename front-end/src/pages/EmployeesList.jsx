import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useNavigate } from 'react-router-dom';
import ResponsiveDialog from '../components/responsiveDialog';
import Axios from 'axios';
import { useSnackbar } from 'notistack';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const [rows, setRows] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const Navigate = useNavigate();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditEmployee = async(uniqueId) => {
    //console.log(uniqueId);
    // await Axios.get(`http://localhost:8000/employee/update?id=${uniqueId}`, {
    //   headers:{
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   uniqueId
    // })
  
    Navigate(`/update-employee?id=${uniqueId}`);
  };

  const handleDeleteEmployee = (e) => {
    e.preventDefault();
    
    // handle delete logic
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/employee", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.status === 200) {
        const employeeDetails = response.data.employeeDetails;
        //console.log(employeeDetails);
        setRows(employeeDetails.map(data => ({
          uniqueId: data._id,
          name: data.f_Name,
          email: data.f_Email,
          mobile: data.f_Mobile,
          designation: data.f_Designation,
          createDate: data.f_Createdate,
          gender: data.f_gender,
          course: data.f_Course,
          image: data.f_Image
        })));
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  React.useEffect(() => {
    
    fetchEmployeeDetails();
  }, [enqueueSnackbar]);

  return (
    <TableContainer component={Paper}>
      <div style={{textAlign:"right", padding:"10px"}}>
      <Button variant="contained" color='secondary'>Total Employees = {rows.length}</Button> &nbsp; <Button variant="contained" onClick={(e)=>{
        e.preventDefault();
        Navigate("/new-employee");
      }}><i className="fa-solid fa-user-plus"></i> &nbsp; New Employee</Button>
      </div>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell><span className='tableColHeading'>Unique ID</span></TableCell>
            <TableCell><span className='tableColHeading'>Image</span></TableCell>
            <TableCell><span className='tableColHeading'>Email</span></TableCell>
            <TableCell><span className='tableColHeading'>Mobile No.</span></TableCell>
            <TableCell><span className='tableColHeading'>Designation</span></TableCell>
            <TableCell><span className='tableColHeading'>Gender</span></TableCell>
            <TableCell><span className='tableColHeading'>Course</span></TableCell>
            <TableCell><span className='tableColHeading'>Create Date</span></TableCell>
            <TableCell align="center"><span className='tableColHeading'>Action</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.uniqueId}>
              <TableCell component="th" scope="row">
                {row.uniqueId}
              </TableCell>
              <TableCell>
                {row.image && <img src={row.image} alt="Uploaded" style={{ maxWidth: '100px' }} />}
              </TableCell>
              <TableCell>
                {row.email}
              </TableCell>
              <TableCell>
                {row.mobile}
              </TableCell>
              <TableCell>
                {row.designation}
              </TableCell>
              <TableCell>
                {row.gender}
              </TableCell>
              <TableCell>
                {row.course.map((item)=>{
                  return (
                    <div>{item}</div>
                  );
                })}
              </TableCell>
              <TableCell>
                {row.createDate.slice(0, 10)}
              </TableCell>
              <TableCell align="right" style={{ minWidth: "180px" }}>
                <Button variant="outlined" onClick={(e)=>{
                  e.preventDefault();
                  handleEditEmployee(row.uniqueId)
                }}>Edit</Button> &nbsp;
                {row.uniqueId && <ResponsiveDialog empId={row.uniqueId} fetchEmployeeDetails={fetchEmployeeDetails} />}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={9} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={9}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
