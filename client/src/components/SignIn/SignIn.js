import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'


// Stylesheet for signin page
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState({
    show: 0,
    messsage: ""
  })

  const history = useHistory()

  // When page loads check for token, if token is stored redirect to books page
  useEffect(() => {
    let token = Cookies.get('x-access-token');
    if (token)
      history.push("/books");
  }, [])

  // When login button is pressed, check for data validation
  // If data is valid, call the API endpoint to authenticate the user
  const loginUser = async (e) => {
    setError({ ...error, show: 0 })
    e.preventDefault();
    if (!user.email) {
      setError({
        ...error,
        show: 1
      })
      return;
    }

    if (!user.password) {
      setError({
        ...error,
        show: 2
      })
      return;
    }

    (async () => {
      // Send id and password to authenticate the user
      const rawResponse = await fetch('http://localhost:8080/Login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      // If response is not success
      // Set error in snackbar
      if (rawResponse.status !== 200) {
        setError({ show: 3, messsage: "Invalid credentials" });
      }

      // If response is success set the token in cookie for further uses
      else {
        const content = await rawResponse.json();
        if (content.success) {
          Cookies.set('x-access-token', content.data.token, { expires: 84000 });
          history.push("/books");
        }
      }
    })();

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => { loginUser(e) }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value })
              setError({ ...error, show: 0 })
            }}
            label="Email Address"
            name="email"
            autoComplete="email"
            error={error.show === 1}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value })
              setError({ ...error, show: 0 })
            }}
            type="password"
            id="password"
            error={error.show === 2}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Snackbar
        open={error.show === 3}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}

      >
        <Alert severity="error">
          {error.messsage}
        </Alert>
      </Snackbar>
    </Container>
  );
}