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
import { useDispatch } from 'react-redux'
import { createOrder } from '../../../redux/actions/Order.actions';
import { deleteCart } from '../../../redux/actions/Cart.actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    color: theme.palette.primary.contrastText
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
    color: theme.palette.primary.contrastText
  },
  total: {
    width: "100%",
    marginTop: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    alignItems:'left'
  },
  text: {
    color: theme.palette.primary.contrastText
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.contrastText
  },
  icon: {
      marginRight: theme.spacing(1)
  }
}));

export default function PaymentForm(props) {
  const {total, cart} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [card, setCard] = React.useState(
    {
      "cardNo": false,
      "expiryDate": new Date(),
      "cvv": null
    }
  );
  let history = useHistory();
  const [snackbarMessage,setSnackbarMessage] = React.useState(
    {
      "open": false,
      "message": " ",
      "severity": " "
    }
  );

  const handleDateChange = (date) => {
    setCard({...card, expiryDate: date});
  };

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value })
  } 

  const handlePayment = () => {
    if(card.cardNo < 1000000000000000 || card.cardNo > 9999999999999999){
      setSnackbarMessage({
        "open": true,
        "message": "Card number is invalid",
        "severity": "error"
      });
    }
    else if(card.expiryDate < new Date()){
      setSnackbarMessage({
        "open": true,
        "message": "Card is expired or expiry date is invalid",
        "severity": "error"
      });
    }
    else if(card.cvv < 100 || card.cvv > 999){
      setSnackbarMessage({
        "open": true,
        "message": "Security Code is invalid",
        "severity": "error"
      });
    }
    else {
      setSnackbarMessage({
        "open": true,
        "message": "Contacting Payment Server",
        "severity": "info"
      });
      setTimeout(() => {
        setSnackbarMessage({
          "open": true,
          "message": "Payment Sucessfull",
          "severity": "success"
        });
        const order = {
          "userId": cart.userId,
          "source": "Website",
          "date": new Date(),
          "items": cart.items,
          "total": total+150,
          "status": "New"
        }
        createOrder(order, dispatch);
      },4000);
    }     
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarMessage({...snackbarMessage, open: false});
    if(snackbarMessage.severity === "success"){
      deleteCart(cart,dispatch);
      history.push("/shop");
    }
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
                  name="cardNo"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: classes.text
                  }}
                  InputLabelProps={{
                    className: classes.text
                  }}
                  onChange={handleChange}
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
                    value={card.expiryDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  className = {classes.text}
                  name="cvv"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: classes.text
                  }}
                  InputLabelProps={{
                    className: classes.text
                  }}
                  onChange={handleChange}
                  label="Security Code"
                  autoFocus
                />
                <Typography className={classes.total}>Total amount: Rs.{total+150}</Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handlePayment}
            >
              Confirm Payment
            </Button>
            <Snackbar open={snackbarMessage.open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={snackbarMessage.severity}>
                {snackbarMessage.message}
              </Alert>
            </Snackbar>
          </form>
        </div>
      </Container>
    </div>
  );
}
