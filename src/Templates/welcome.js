const welcome = ({ name }) => {

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
      width: 90%;
      margin: auto;
      padding: 0 3rem;
      display: grid;
      justify-items: center;
      justify-content: center;
    "
  >
    <h1 
    style="
    background-color: #34ad30;
    border-radius: 1rem 3rem;
    outline: 4px solid #0e5927;
    padding: 1rem 1.5rem;
    font-size: 2rem; 
    letter-spacing: 2px; 
    color: #0e5927;
    margin: 0.5rem auto 1rem; 
    text-align: center;
    width: 85% "
    >✨ Welcome to GreenScreen 🎉 <br> Your Ultimate Movie Destination!</h1>
    <h2
    style="
    padding: 0 1.5rem;
    font-size: 2rem; 
    letter-spacing: 2.5px; 
    color: #0e5927;
    margin: 0.5rem auto 1rem; 
    text-align: center; 
    border-bottom: 3px solid #0e5927; 
    width: auto">
    Dear ${name}</h2>

    <h3
    style="
    font-size: 1.6rem; 
    color: #555;
    margin: .5rem auto;
    width: 75%;
    text-align: center;">
      🎬 We are thrilled to welcome you to GreenScreen, your new go-to destination
      for all things movies! 🍿
    </h3>

    <p
    style="
    font-size: 1.3rem; 
    color: #000; 
    margin: 1rem auto 0;
    width: 80%;
    text-align: justify;
    font-weight: bold;">
      At GreenScreen, we're passionate about bringing you the latest and
      greatest in the world of cinema. Whether you're a dedicated cinephile or
      just looking for some entertainment, we've got you covered. Get ready to
      dive into a world of blockbuster hits, timeless classics, indie gems, and
      everything in between.
    </p>

    <p
    style="
    font-size: 1.3rem; 
    margin: .5rem auto;
    color: #000; 
    width: 80%;
    text-align: justify;
    font-weight: bold;">
      Thank you for choosing GreenScreen as your movie destination. We're
      excited to embark on this cinematic journey with you. If you have any
      questions, feedback, or suggestions, feel free to reach out to our
      friendly support team at support@greenscreenmovies.com.
    </p>

    <h2
    style="
    margin: 1rem auto .5rem;
    color: #000;"
    >Lights, camera, action! 🎥🍀</h2>

    <h4
    style="
    margin: .5rem auto;
    color: #34ad30; 
    text-align: center;
    font-weight: bold;"
    >Best regards, The GreenScreen Team</h4>
  </body>
</html>
  `;

  return text;
};

module.exports = welcome;