import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch, useSelector } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "../components/common/Navbar";
import DateFnsUtils from "@date-io/date-fns";
import MuiPhoneNumber from "material-ui-phone-number";
import { validateCustomerObj, updateCustomer } from "../redux/actions/Customer.actions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import { colors } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import Footer from "../components/common/Footer";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      
        shan.eryn_
{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: colors.black,
    margin: "100px auto",
    padding: "20px",
    background: theme.palette.primary.main,
    borderRadius: "15px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff'
  },
  text: {
    color: colors.black,
    textDecoration: 'none',
    '&:visited': {

      color: '#fff'

    }
  }
}));



export default function ProfilePage() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [error,setError] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  let user = globalState.auth.loggedUser;
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setState(prevState => ({ ...prevState,dateOfBirth: selectedDate}));
    console.log(state)
  };
  if(!globalState.auth.logged){
    history.push('/shop/login');
  }
  function handleSubmit() {
    let err = validateCustomerObj(state);
    if(err!=null){
      setError(err);
    }else{
      updateCustomer(state,dispatch);
    }
    console.log(state);
 }

  function handlePhoneChange(value) {
    setState(prevState => ({ ...prevState,contactNumber: value}));
    console.log(state)
 }

  const [state,setState] =  React.useState({
    firstName: user.firstName, lastName: user.lastName, dateOfBirth: user.dateOfBirth, contactNumber: user.contactNumber, address: user.address, emailAddress: user.emailAddress, password: user.password, id : user.id
  });

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    console.log(state)
}
  return (
    <div style={{ flexGrow: 1 }}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile Page
          </Typography>
          <div style={{ marginLeft: "20px", color: "red" }}>{error ? error : ""}</div>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h6">
            First Name
          </Typography>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  onChange={handleOnChange}
                  required
                  fullWidth
                  id="firstName"
                  defaultValue = {user.firstName}
                  autoFocus
                  InputProps={{
                    className: classes.text
                }}
                InputLabelProps={{
                    className: classes.text
                }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h6">
            Last Name
          </Typography>
                <TextField
                  variant="outlined"
                  required
                  onChange={handleOnChange}
                  fullWidth
                  id="lastName"
                  defaultValue = {user.lastName}
                  name="lastName"
                  autoComplete="lname"
                  InputProps={{
                    className: classes.text
                }}
                InputLabelProps={{
                    className: classes.text
                }}
                />
              </Grid>
              <Grid item xs={12} spacing={2}>
              <Typography component="h1" variant="h6">
            Date Of Birth
          </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    required
                    variant="inline"
                    fullWidth
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    margin="normal"
                    defaultValue = {user.dateOfBirth}
                    id="date-picker-inline"
                    label={user.dateOfBirth}
                    name = "dateOfBirth"
                    value={user.dateOfBirth}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    InputProps={{
                      className: classes.text
                  }}
                  InputLabelProps={{
                      className: classes.text
                  }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
              <Typography component="h1" variant="h6">
            Contact Number
          </Typography>
                <MuiPhoneNumber
                  label={user.contactNumber}
                  variant="outlined"
                  defaultCountry={"lk"}
                  onChange={handlePhoneChange}
                  name = "contactNumber"
                  defaultValue = {user.contactNumber}
                  value = {user.contactNumber}
                  fullWidth
                  InputProps={{
                    className: classes.text
                }}
                InputLabelProps={{
                    className: classes.text
                }}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography component="h1" variant="h6">
              Home Address
          </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  onChange={handleOnChange}
                  id="address"
                  name="address"
                  defaultValue ={user.address}
                  autoComplete="address"
                  InputProps={{
                    className: classes.text
                }}
                InputLabelProps={{
                    className: classes.text
                }}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography component="h1" variant="h6">
              Email Address
          </Typography>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleOnChange}
                  id="email"
                  defaultValue = {user.emailAddress}
                  name="emailAddress"
                  autoComplete="email"
                  InputProps={{
                    className: classes.text
                }}
                InputLabelProps={{
                    className: classes.text
                }}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography component="h1" variant="h6">
            Password
          </Typography>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleOnChange}
                  name="password"
                  label="Password"
                  type="password"
                  defaultValue = {user.password}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    className: classes.text
                }}
                InputLabelProps={{
                    className: classes.text
                }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick = {handleSubmit}
              className={classes.submit}
            >
              Update
            </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick = {handleSubmit}
              className={classes.submit}
            >
              Delete Account
            </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
