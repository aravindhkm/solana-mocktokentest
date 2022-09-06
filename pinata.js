var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
var dotenv = require('dotenv'); 

(async() => {
    const path = process.env.HOME + "/Documents/Solana/SolanaNftTest.zip";

    dotenv.config()
    data.append('file', fs.createReadStream(path));
    data.append('pinataOptions', '{"cidVersion": 1}');
    data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');
    
    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      headers: { 
        'Authorization':`Bearer ${process.env.PINATA_JWT}`, 
       // ...data.getHeaders()
      },
      data : data
    };
    
    const res = await axios(config);
    
    console.log("Response", res.data);
    console.log("Image URL", `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`)
})();



// PINATA_API_KEY="adcf9db8e56aa70f28fa"
// PINATA_API_SECRET="6d8dd7929c672fc5ebedfd8db7693052c7bad52b1372f07bc0cfa01989875985"
// PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2YTgzZDBiZS01NmNiLTRhY2YtYTA3Ni1hMDgzMmFmMzlkYzMiLCJlbWFpbCI6InRlc3RhazEwMDZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFkY2Y5ZGI4ZTU2YWE3MGYyOGZhIiwic2NvcGVkS2V5U2VjcmV0IjoiNmQ4ZGQ3OTI5YzY3MmZjNWViZWRmZDhkYjc2OTMwNTJjN2JhZDUyYjEzNzJmMDdiYzBjZmEwMTk4OTg3NTk4NSIsImlhdCI6MTY2MjQzMDIzNn0._vJf6KO5-k7YUc4mEJAyHvqlPFUAXe-C6FXYkFeO0to"

