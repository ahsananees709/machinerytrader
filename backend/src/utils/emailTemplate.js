
// emailTemplates.js
const generateEmailTemplate = (subject, greeting, messageBody, footerText) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background-color: #4caf50;
            padding: 20px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Section -->
          <div class="header">
            <h1>${subject}</h1>
          </div>

          <!-- Content Section -->
          <div class="content">
            <p>${greeting}</p>
            <p>${messageBody}</p>

            <!-- Add a button if needed -->
           <!-- <a href="#" class="button">Take Action</a> -->
          </div>

          <!-- Footer Section -->
          <div class="footer">
            <p>${footerText}</p>
          </div>
        </div>
      </body>
    </html>
    `;
};


const onFavouriteEmail = (userEmail, vehicleUrl, RECEIPIENT_EMAIL) => {
  const subject = "Someone Added a Vehicle to Favourites!";
  const greeting = `Hello ${RECEIPIENT_EMAIL},`;
  const messageBody = `
    <p>We noticed that someone with the email address <strong>${userEmail}</strong> added a vehicle to their wishlist.</p>
    <p>You can view the vehicle details by clicking the link below:</p>
    <p><a href="${vehicleUrl}" target="_blank">${vehicleUrl}</a></p>
  `;
  const footerText = "This is a system-generated email, please do not reply.";

  return generateEmailTemplate(subject, greeting, messageBody, footerText);
};


const onVehicleSaleEmail = (fullName, phone, userEmail, vehicleLocation, make, model, year, price, images) => {
  const subject = "Vehicle Sale Inquiry";
  const greeting = `Hello,`;

  const messageBody = `
    <p>We have received an inquiry about selling a vehicle. Here are the details:</p>
    <ul>
      <li><strong>Full Name:</strong> ${fullName}</li>
      <li><strong>Phone Number:</strong> ${phone}</li>
      <li><strong>Email Address:</strong> ${userEmail}</li>
      <li><strong>Vehicle Location:</strong> ${vehicleLocation}</li>
      <li><strong>Make:</strong> ${make}</li>
      <li><strong>Model:</strong> ${model}</li>
      <li><strong>Year:</strong> ${year}</li>
      <li><strong>Price:</strong> $${price}</li>
    </ul>
    <p><strong>Uploaded Images:</strong></p>
    <div>
      ${images.map((url) => `<img src="${url}" alt="Vehicle Image" style="max-width: 100%; height: auto; margin: 10px 0;" />`).join("")}
    </div>
  `;

  const footerText = "This is a system-generated email. Please do not reply.";

  return generateEmailTemplate(subject, greeting, messageBody, footerText);
};

const onContactEmail = (fullName, email, subject, message, RECEIPIENT_EMAIL) => {
  const contactSubject = "New Contact Us Form Submission";
  const greeting = `Hello ${RECEIPIENT_EMAIL},`;
  const messageBody = `
    <p>We have received a new message from a ${fullName} via the contact form:</p>
    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;
  const footerText = "This is a system-generated email, please do not reply.";

  return generateEmailTemplate(contactSubject, greeting, messageBody, footerText);
};

const onBuyEmail = (userEmail, vehicleUrl, RECEIPIENT_EMAIL) => {
  const subject = "New Buy Now Form Submission!";
  const greeting = `Hello ${RECEIPIENT_EMAIL},`;
  const messageBody = `
    <p>We noticed that someone with the email address <strong>${userEmail}</strong> want to buy a vehicle.</p>
    <p>You can view the vehicle details by clicking the link below:</p>
    <p><a href="${vehicleUrl}" target="_blank">${vehicleUrl}</a></p>
  `;
  const footerText = "This is a system-generated email, please do not reply.";

  return generateEmailTemplate(subject, greeting, messageBody, footerText);
};

export {
  onFavouriteEmail,
  onVehicleSaleEmail,
  onContactEmail,
  onBuyEmail
};
