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


// PINATA_API_KEY="d34b7e25a4e232000251"
// PINATA_API_SECRET="0d1fd768ff8d8116e210bc5cee5ebf95c35677937f63cb92f7bd3f37bce1b162"
// PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZjFiNGZiMS0yZTcxLTQ3MGMtOGIwNS00N2I4OGNkZTk0NTMiLCJlbWFpbCI6InBldGVyaGVyZTgzMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQzNGI3ZTI1YTRlMjMyMDAwMjUxIiwic2NvcGVkS2V5U2VjcmV0IjoiMGQxZmQ3NjhmZjhkODExNmUyMTBiYzVjZWU1ZWJmOTVjMzU2Nzc5MzdmNjNjYjkyZjdiZDNmMzdiY2UxYjE2MiIsImlhdCI6MTY2MjQyNjQ1Mn0.5GwEnIUbK1Ii5iaWQtvkAkENRlieY_7aKsWWYZHZgM4"
