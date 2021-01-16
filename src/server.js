const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const chicken = require("ckey"); //using this because i can not use dotenv. i like to call it chicken
const MyUser = chicken.GMAIL_USER;
const MyPassword = chicken.GMAIL_PASSWORD;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

/* check if backend is running on port 5000. if it is running tell me everything is ok */
app.listen(5000, () =>
  console.log("my teacher is beautiful || BACKEND RUNNING")
);

/* here i am logging in my beautiful email */
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MyUser,
    pass: MyPassword,
  },
});

/* telling the user if login failed or not */
contactEmail.verify(error => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

/* if front end does a POST to mybackend/contact */
router.post("/contact", (req, res) => {
  /* then create 3 things: name, email, message */
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  /* hey create an email */
  const mail = {
    from: name,
    to: MyUser,
    subject: "Someone contacted you about Authors",
    /* this is what i see inside my maail. you can style that if you want, but i dont fkkkkk care */
    html: `<h1>Hey beaty, ${name} just contacted you!!!</h1>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7NXpl3jN2meumly4Lk3VGGlJao44Ojm7_oaUNWgA6h1Bgulz_X7ewj3YDpxp0tiRsAvopB0vb&usqp=CAc" alt="love"/>
           <p>and he wants you to know that ${message}.</p>
           <p>reply to him here ${email}</p>`,
  };

  contactEmail.sendMail(mail, error => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
