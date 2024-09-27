const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const os = require("os");
const firebase = require("firebase/app");
const storage = require("firebase/storage");
const bodyParser = require("body-parser");
const Schema = mongoose.Schema;

const app = express();
const mongoURL = "mongodb://127.0.0.1/dealsdray";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCu3KztzDXqWSRkKTJQb0k0cPK5WgYtFuE",
  authDomain: "park-it-35aa8.firebaseapp.com",
  databaseURL: "https://park-it-35aa8-default-rtdb.firebaseio.com",
  projectId: "park-it-35aa8",
  storageBucket: "park-it-35aa8.appspot.com",
  messagingSenderId: "145271158950",
  appId: "1:145271158950:web:872eb8e419a309f190dc67",
  measurementId: "G-0TGJ3K37EK",
});

const str = storage.getStorage(firebaseApp);
// const storageRef = storage.ref(str,'')

var cors = require("cors"); //import cors module

var whitelist = ["http://localhost:3000"]; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};
app.use(cors(corsOptions));
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const AdminSchema = new Schema({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true, maxlength: 25, unique: true },
  password: { type: String, required: true, maxlength: 25 },
});

const EmployeeSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: { type: String, required: true, maxlength: 25 },
  gender: { type: String, enum: ["Male", "Female", "Others"] },
  email: { type: String, required: true, maxlength: 25, unique: true },
  mobile: { type: String, required: true, maxlength: 10 },
  designation: {
    type: String,
    required: true,
    enum: ["HR", "Manager", "Sales"],
  },
  course: { type: String, required: true },
  createDate: { type: Date, default: Date.now() },
  image: { type: String },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
const Admin = mongoose.model("Admin", AdminSchema);

const upload = multer({ dest: os.tmpdir() });

//login - GET
app.post("/login", (req, res) => {
  const body = req.body;
  console.log(body);
  Admin.findOne({ ...body })
    .then((data) => {
      if (data) {
        res.send(data).status(200);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//users get - GET
app.get("/users", (req, res) => {
  const body = req.body;
  console.log(body);
  Employee.find()
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/users/:employeeId", (req, res) => {
  const employeeId = req.params["employeeId"];
  Employee.findOne({ _id: employeeId })
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//user create - POST
app.post("/users", (req, res) => {
  const body = req.body;
  console.log(body);
  Employee.create({ ...body })
    .then((d) => {
      res.status(200).send({ id: d["_id"] });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/admin", (req, res) => {
  const body = req.body;
  console.log(body);
  Admin.create({ ...body })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//user edit - POST
app.patch("/users/:employeeId", (req, res) => {
  const body = req.body;
  const employeeId = req.params["employeeId"];
  delete body.email;
  delete body.createDate;
  Employee.updateOne({ _id: employeeId }, { ...body })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//user delete - DELETE
app.delete("/users/:employeeId", (req, res) => {
  const employeeId = req.params["employeeId"];
  Employee.deleteOne({ _id: employeeId })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});
