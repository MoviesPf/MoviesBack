const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'greenscreenpf',
    api_key: '388654548938432',
    api_secret: 'pigH9i_x0OS9tuhUlyJKg3G6e_0',
    secure: true
});



module.exports = { cloudinary }
