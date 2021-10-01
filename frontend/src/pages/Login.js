import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from "../components/common/Navbar";
import { superUserLogin, superUserLogout, superUserLoginReset } from '../redux/actions/Auth.action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Roboto",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  paperStyle: {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "100px auto",
    background: theme.palette.primary.main,
    borderRadius: "15px",
  },
  iconStyle: {
    backgroundColor: "#FFF",
    color: "#6c7a89",
  },
  textStyle: {
    color: "#FFF",
  },
  fieldStyle: {
    margin: "10px auto",
    color: "#FFF",
  },
  buttonStyle: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    marginRight: 20,
    marginTop: 20,
    "&:hover": { backgroundColor: theme.palette.secondary.dark },
  },
  text: {
    color: "#fff",
    textDecoration: "none",
    "&:visited": {
      color: "#fff",
    },
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({ username: "", password: ""});
  const [fail, setFail] = React.useState(false);
  const globalState = useSelector((state) => state);
  let history = useHistory();

  if(globalState.auth.logged){
      let user = globalState.auth.loggedUser;
      if(user.type == 'admin')
          history.push('/admin');
      else if(user.type == 'customer')
          history.push('/shop');
  } else if(globalState.auth.fail) {
      setFail(true);
      setState({ username: "", password: ""});
      superUserLoginReset(dispatch);
  }

  //Event Handler
  const handleLogin = () => {
      let user = {};
      user.emailAddress = state.username;
      user.password = state.password;
      superUserLogin(dispatch,user);
  }

  const handleLogout = () => {
      superUserLogout(dispatch);
  }

  const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setFail(false);
    };

  return (
    <div style={{ flexGrow: 1 }}>
      <Navbar />
      <div className={classes.root}>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.iconStyle}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <h2 className={classes.textStyle}>Customer Login</h2>
            </Grid>
            <TextField name="username" label="Username" placeholder="Enter Username" onChange={handleChange} fullWidth required className={classes.fieldStyle}/>
                    <TextField type="password" name="password" label="Password" placeholder="Enter Password" onChange={handleChange} fullWidth required className={classes.fieldStyle} />
                    <Button onClick={handleLogin} variant="contained" className={classes.buttonStyle} fullWidth>Login</Button>
            {/* <Button onClick={handleLogout} variant="contained" className={classes.buttonStyle} fullWidth>Logout</Button> */}
          </Paper>
        </Grid>
        <Snackbar /*open={fail}*/ autoHideDuration={4000}>
          <Alert severity="error">
            Invalid Username or Password, Please try again
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Login;
