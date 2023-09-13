const unbanning = (name) => {
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
        color: #439c19;
        font-size: 2.3rem;
        width: 90%;
        text-align: center;
        margin: 2rem auto 3rem;
      "
    >
      💚 Account Suspension Notice for GreenScreen 💚
    </h1>

    <h2 style="color: #000;font-size: 2rem; margin-bottom: 2rem">
      <span style="color: #000;font-weight: 400">Dear</span> ${name},
    </h2>

    <p style="color: #000;font-size: 1.4rem; margin-bottom: 1rem; text-align: justify">
      We hope this message finds you well. We are pleased to inform you that we
      have reviewed your case and have decided to lift the suspension of your
      <span style="color: #2a7713; font-weight: 600">GreenScreen</span> account.
      We would like to thank you for your patience and cooperation during this
      process.
    </p>

    <p
      style="
        font-size: 1rem;
        margin-bottom: 2.5rem;
        color: #333;
        font-weight: 700;
      "
    >
    As a result of our review, we have determined that your account now complies with our terms of service and community guidelines. Therefore, we have proceeded to unban your account immediately.
    </p>

    <h3 style="color: #000;font-weight: 700; margin-bottom: 1.5rem">
      ✨ We are delighted to have you back as part of our community and thank you for your continued commitment to <span style="color: #2a7713; font-weight: 600">GreenScreen</span>. We hope you enjoy our services to the fullest ✨
    </h3>

    <h4 style="color: #000;font-weight: bold; margin-bottom: 0.5rem">Sincerely,</h4>
    <h4 style="color: #000;font-weight: bold; margin-bottom: 0.5rem;">GreenScreen Support</h4>
    <h4 style="color: #000;font-weight: bold; margin-bottom: 0.5rem">
      support@greenscreenmovies.com
    </h4>
  </body>
</html>
  `;

  return text;
};

module.exports = unbanning;