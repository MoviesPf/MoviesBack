const banned = (name, reason) => {
  const date = new Date();
  const text = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
  <body
    style="
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f1f2f4;
      width: 70%;
      margin: auto;
      padding: 0 3rem;
      margin: auto;
    "
  >
    <h1
      style="
        color: #cf3617;
        font-size: 2.3rem;
        width: 90%;
        text-align: center;
        margin: 2rem auto 3rem;
      "
    >
      🚫 Account Suspension Notice for GreenScreen 🚫
    </h1>

    <h2 style=" color: #000; font-size: 2rem; margin-bottom: 2rem">
      <span style="color: #000;font-weight: 400">Dear</span> ${name},
    </h2>

    <p style="color: #000;font-size: 1.4rem; margin-bottom: 1rem; text-align: justify;">
      We regret to inform you that your account on
      <span style="color: #2a7713; font-weight: 600">GreenScreen</span> has been
      suspended due to <span style="color: #cf3617; font-weight: 600">${reason}</span>. The suspension took place on
      <span style="font-weight: bold">${date.toDateString()}</span>. We offer you the opportunity to review this action and
      reach out to us if you believe it to be an error or wish to provide
      additional information.
    </p>

    <p
      style="
        font-size: 1rem;
        margin-bottom: 2.5rem;
        color: #333;
        font-weight: 700;
      "
    >
      Please get in touch with our support team through to discuss your
      situation and address any concerns.
    </p>

    <h3 style="color: #000;font-weight: 700; margin-bottom: 1.5rem">
      We appreciate your understanding and cooperation.
    </h3>

    <h4 style="color: #000;font-weight: bold; margin-bottom: 0.5rem">Sincerely,</h4>
    <h4 style="color: #000;font-weight: bold; margin-bottom: 0.5rem">
      GreenScreen Support
    </h4>
    <h4 style="color: #000;font-weight: bold; margin-bottom: 0.5rem">support@greenscreenmovies.com</h4>
  </body>
</html>
  `;

  return text;
};

module.exports = banned;