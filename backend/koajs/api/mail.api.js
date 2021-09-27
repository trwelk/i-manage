const nodemailer = require('nodemailer');

var transport = {
    service: 'gmail',
    auth: {
      user: 'trevengers.team@gmail.com',
      pass: 'trewoniscool'
    }
  }
  
var transporter = nodemailer.createTransport(transport)
  
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Node Mailer Started');
  }
});

function sendMail(subject, text, email){
  var mailOptions = {
    from: 'trevengers.team@gmail.com',
    to: email,
    subject: subject,
    text: text
  };
      
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } 
      else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = {sendMail};