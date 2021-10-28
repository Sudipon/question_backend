const { response } = require('express');
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
//const EmpModel = require('../models/employee_model');
const AnsModel = require('../models/answer_schema');

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gunnoeghosh@gmail.com",
    pass: "9836077628",
  },
});

router.post("/", (req, res) => {

  const ansobj = new AnsModel({
    empanswer: req.body.empanswer,
    img_path: req.body.img_path,
    empquestion: req.body.empquestion,
    qid: req.body.qid,
    empemail: req.body.empemail,
    eid: req.body.eid,
  })
  var mailOptions = {
    from: "gunnoeghosh@gmail.com",
    to: req.body.empemail,
    subject: "Answer post Sucessfully",
    text: " your answer : " + req.body.empanswer,
    text: "Thank You Visit again."
  };
  ansobj.save()
    .then(response => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log(error);
          res.status(500).send(error);
        } else {
          // console.log('Email sent: ' + info.response);
          res.status(200).send({ message: "Answer post Successfull and mail send sucessfull" });
        }
      });
    })
    .catch(error => {
      res.status(500).send(error)
    })

})


router.post('/view/:qid', (req, res) => {
  AnsModel.find({ 'qid': req.params.qid })
    .sort({ "createdAt": -1 })
    .then(answers => {
      // console.log(answers)
      res.status(200).send(answers);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109

router.get('/', (req, res) => {
  AnsModel.find()
    .sort({ "createdAt": -1 })
    .then(answers => {
      res.status(200).send(answers);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109

router.delete('/remove/:emailid', (req, res) => {
  AnsModel.findOneAndRemove({ "empemail": req.params.emailid })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID EMP ID ' + req.params.empid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 60
); //CLOSE Delete METHOD Line 59







module.exports = router;