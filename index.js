const express =  require('express') 
const multer = require('multer');
const path = require('path')
const app = express();



app.get("/", (req,res) => {
    res.send("Hello")
})


//File storage and files upload configurations
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });
  
  //configuration of file types to  upload
  const imgFileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

app.use(multer({ storage: fileStorage, fileFilter: imgFileFilter }).any()); // any() supports multiple image uploads


app.use("/assets", express.static(path.join("./", "assets")));


app.get("/cron-job", (req,res) => {
  console.log("request called")
  res.send("response send")
})
app.post("/add-data", (req,res) => {
    console.log(req.files[0])
    res.send("Hello")
})

app.listen(8080, () => {
    console.log("running")
})