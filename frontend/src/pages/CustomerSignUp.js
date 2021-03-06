import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "../components/common/Navbar";
import DateFnsUtils from "@date-io/date-fns";
import MuiPhoneNumber from "material-ui-phone-number";
import { validateCustomerObj, createCustomer } from "../redux/actions/Customer.actions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Footer from "../components/common/Footer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: '#fff',
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
    color: theme.palette.secondary.dark,
    textDecoration: 'none',
    '&:visited': {

      color: '#fff'

    }
  }
}));



export default function CustomerSignUp() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [error,setError] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setState(prevState => ({ ...prevState,dateOfBirth: selectedDate}));
    console.log(state)
  };
  function handleSubmit() {
    let err = validateCustomerObj(state);
    if(err!=null){
      setError(err);
    }else{
      createCustomer(state,dispatch);
      history.push('/shop');
    }
    console.log(state);
 }

  function handlePhoneChange(value) {
    setState(prevState => ({ ...prevState,contactNumber: value}));
    console.log(state)
 }

  const [state,setState] =  React.useState({
    firstName: "", lastName: "", dateOfBirth: new Date(), contactNumber: "", address: "", emailAddress: "", password: "",type: "customer"
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
            Sign up
          </Typography>
          <div style={{ marginLeft: "20px", color: "red" }}>{error ? error : ""}</div>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  onChange={handleOnChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
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
                <TextField
                  variant="outlined"
                  required
                  onChange={handleOnChange}
                  fullWidth
                  id="lastName"
                  label="Last Name"
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    required
                    variant="inline"
                    fullWidth
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date of Birth"
                    name = "dateOfBirth"
                    value={selectedDate}
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
                <MuiPhoneNumber
                  variant="outlined"
                  defaultCountry={"lk"}
                  onChange={handlePhoneChange}
                  name = "contactNumber"
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
                <TextField
                  variant="outlined"
                  fullWidth
                  onChange={handleOnChange}
                  id="address"
                  label="Home Address"
                  name="address"
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
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleOnChange}
                  id="email"
                  label="Email Address"
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
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleOnChange}
                  name="password"
                  label="Password"
                  type="password"
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
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick = {handleSubmit}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/shop" variant="body2" className= {classes.text}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
