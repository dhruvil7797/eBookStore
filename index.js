const { json } = require('body-parser');
const express = require('express')
const { rw } = require('./Helper/ResponseGenerator');
const { bookRouter } = require('./Router/Books');
const { bookStoreRouter } = require('./Router/BookStores');
const app = express();
const cors = require('cors');

app.use(json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

app.use(bookRouter)
app.use(bookStoreRouter)

app.get("/", (req, res) => {
  res.send("Server connected");
})

app.use((req, res) => {
  res.send(rw(false, "Invalid URL"));
})


app.listen(8080, () => {
  console.log("Server running on PORT 8080")
})