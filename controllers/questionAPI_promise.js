// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
//const EmpModel = require('../models/employee_model');
const QueModel = require('../models/question_schema');

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gunnoeghosh@gmail.com",
    pass: "9836077628",
  },
});

// URL :- localhost:4500/emp/register  (USING POSTMAN POST)
/*
{
  "empname": "Chandan",
  "empemail": "chan@gmail.com",
  "empmobile": "9831125144",
  "empdob": "05/09/1984",
  "emppass": "abcd",
  "empgender": "Male",
  "empcountry": "India",
  "empaddress": "Kol",
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 
router.post('/question', (req, res) => {

  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  const queobj = new QueModel({
    authorname: req.body.authorname,
    authoremail: req.body.authoremail,
    empquestion: req.body.empquestion,
    empcatagory: req.body.empcatagory,
  });//CLOSE EmpModel
  //INSERT/SAVE THE RECORD/DOCUMENT

  var mailOptions = {
    from: "gunnoeghosh@gmail.com",
    to: req.body.authoremail,
    subject: "Question post Sucessfully",
    text: " your question : " + req.body.empquestion,
    text: "Thank you. Visit again."
  };
  queobj.save()
    .then(inserteddocument => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log(error);
          res.status(500).send(error);
        } else {
          // console.log('Email sent: ' + info.response);
          res.status(200).send({ message: "Question post Successfull and mail send sucessfull" });
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26

// => localhost:4500/emp/remove/30     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMPID
//EmpModel.findOneAndRemove({"empid" : parseInt(req.params.empid)})

// => localhost:4500/emp/remove/abc@gmail.com     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMAILID
router.delete('/remove/:emailid', (req, res) => {
  QueModel.findOneAndRemove({ "empemail": req.params.emailid })
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


// localhost:4500/emp/10
//SEARCH EMPLOYEE BY EMPID
// "empid" : parseInt(req.params.empid) Convert empid String to Int
// EmpModel.find({"empid" : parseInt(req.params.empid)})

// localhost:4500/emp/abc@gmail.com
//SEARCH EMPLOYEE BY EMPEMAIL
// CALLBACK function for get method using lambda 
router.get('/search/:empid', (req, res) => {
  QueModel.find({ "authoremail": req.params.empid })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.empid });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 88
);//CLOSE GET METHOD Line 87 

router.get('/view/:catagory', (req, res) => {
  var myregex = new RegExp(req.params.catagory, "i");
  QueModel.find({ "empcatagory": myregex })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.catagory });
      }
    })
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.cata });
    })
}
);


// BROWSER URL :- localhost:4500/emp 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/:empid', (req, res) => {
  QueModel.find({ "authoremail": req.params.empid })
  .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109 

 

router.get('/', (req, res) => {
  QueModel.find()
  .sort({ "createdAt": -1 })
    .then(questions => {
      res.status(200).send(questions);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109

router.post('/:qid', (req, res) => {
  QueModel.find({'_id':req.params.qid})
  .sort({ "createdAt": -1 })
    .then(questions => {
      console.log(questions)
      res.status(200).send(questions);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109



//SHOULD BE EXPORTED
module.exports = router;