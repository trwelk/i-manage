import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import PaymentIcon from '@material-ui/icons/Payment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    color: '#fff'
  },
  root: {
    width: "100%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    color: '#fff'
  },
  total: {
    width: "100%",
    marginTop: theme.spacing(3),
    color: '#fff',
    alignItems:'left'
  },
  text: {
    color: '#fff'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff'
  },
  icon: {
      marginRight: theme.spacing(1)
  }
}));

export default function PaymentForm() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date()
  );
  let history = useHistory();
  const [open,setOpen] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePayment = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    history.push('/shop');
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography variant="h5">
            <PaymentIcon className={classes.icon}/>
            Payment Details
          </Typography>
          <form className={classes.form} noValidate>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: classes.text
                  }}
                InputLabelProps={{
                    className: classes.text
                }}
                  id="firstName"
                  label="Card No"
                  autoFocus
                />
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
                    label="Expiry Date"
                    InputProps={{
                        className: classes.text
                    }}
                    InputLabelProps={{
                        className: classes.text
                    }}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  className = {classes.text}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: classes.text
                  }}
                  InputLabelProps={{
                    className: classes.text
                }}
                  id="firstName"
                  label="Security Code"
                  autoFocus
                />
                <Typography className={classes.total}>Total amount: Rs.3500</Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handlePayment}
            >
              Confirm Payment
            </Button>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Order Placed Successfully!
              </Alert>
            </Snackbar>
          </form>
        </div>
      </Container>
    </div>
  );
}
