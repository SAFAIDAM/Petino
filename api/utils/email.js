import SMTPConnection from 'smtp.js';

const sendEmail = async (option) => {
  // Create an SMTP connection
  const connection = new SMTPConnection({
    host: 'smtp.example.com',
    secure: false, // Set to true if using SSL/TLS
    port: 587, // Port for SMTP (default is 587)
    auth: {
      user: "your-email@example.com",
      pass: "your-password"
    }
  });

  // Define email options 
  const mailOptions = {
    from: "your-email@example.com",
    to: option.email,
    subject: option.subject,
    text: option.message
  };

  try {
    // Connect to the SMTP server
    await connection.connect();

    // Send the email
    await connection.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      content: mailOptions.text
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  } finally {
    // Close the connection
    connection.close();
  }
};

export default sendEmail;
