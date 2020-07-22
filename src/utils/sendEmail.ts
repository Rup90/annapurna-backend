
import * as nodemailer from 'nodemailer';
import * as  smtpTransport from 'nodemailer-smtp-transport';


export async function sendConfirmationEmail(userEmail: string, type: string) {

  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    // service: 'gmail',
    // host: 'smtp.gmail.com',
    // auth: {
    //     user: 'rupayan.mca1991@gmail.com',
    //     pass: '@ngularDeveloper01'
    // }
  });


  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Rupayan Dey👻" <rupayan.dey1990@gmail.com>', // sender address
    to: userEmail, // list of receivers
    subject: 'Confirmation ✔', // Subject line
    text: `You have successfully created an ${type} type account by : ${userEmail}`, // plain text body
    // html: `<a href="${userEmail}">${userEmail}</a>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return nodemailer.getTestMessageUrl(info);
}
