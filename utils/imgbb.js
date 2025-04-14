const axios = require('axios');

const IMGBB_API_KEY = '2104c228330729c970465a4e95c7a88c'; // Replace with your real key

async function uploadToImgbb(buffer) {
  const base64Image = buffer.toString('base64');

  const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    image: base64Image
  });

  return res.data.data.url;
}

module.exports = uploadToImgbb;