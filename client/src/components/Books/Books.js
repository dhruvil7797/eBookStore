import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from 'js-cookie'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Stylesheet for books component
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Books() {

  // Check for token when page loads, if token is not stored, redirect to dashboard
  useEffect(() => {
    let token = Cookies.get('x-access-token');
    if (!token) {
      history.push("/");
      return;
    }

    // Fetch book details from database
    fetchUpdate();
  }, []);

  const [books, setBooks] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const fetchUpdate = async () => {
    // Check for token
    if (Cookies.get('x-access-token')) {

      // If token is store call API endpoint to fetch the stock
      let res = await fetch("http://localhost:8080/BookStores", {
        credentials: "include",
        headers: {
          "x-access-token": Cookies.get('x-access-token')
        }
      });

      // If response returns success
      if (res.status === 200) {

        // Update stock and update the state to rerender the page
        const content = await res.json();
        if (content.data.books) {
          let bookData = content.data.books;
          let updatedData = [];
          for (let i = 0; i < bookData.length; i++) {
            updatedData.push({
              title: bookData[i].name,
              qty: bookData[i].qty,
              price: bookData[i].price
            });
          }
          setBooks(updatedData);
        }
      }

      // Start timer to update the stock after 1 minute
      setTimeout(async () => {
        fetchUpdate();
      }, 60000)
    }
  }

  return (
    <React.Fragment>
      {/* Snackbar to display the auth token that can be used to send further requests */}
      <Snackbar
        open={true}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}

      >
        <Alert severity="info">
          {"Auth token is " + Cookies.get('x-access-token')}
        </Alert>
      </Snackbar>

      {/* Bookstore appbar */}
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: "1" }}>
            Book Store
          </Typography>
          <Button variant="contained" color='secondary' onClick={() => {
            Cookies.remove('x-access-token');
            history.push("/");
          }} >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* Grid to display books */}
          <Grid container spacing={4}>
            {books.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    {/* Title of the book */}
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    {/* Qty of the book */}
                    {card.qty === 0 ? (
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: "grey" }} >
                        Out Of Stock
                      </Typography>
                    ) : (
                        <Typography gutterBottom variant="h5" component="h2">
                          Total Quanity {card.qty}
                        </Typography>
                      )}
                    {/* Price of the book */}
                    <Typography gutterBottom variant="h5" component="h2">
                      {"$" + card.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
