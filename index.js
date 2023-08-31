const threeCommasAPI = require('3commas-api-node');
const express = require('express');
const path = require('path');

//amm3ro api10
const api1 = new threeCommasAPI({
     //Trusted IPs: 5.27.45.192
  // apiKey:'19210c07ebe54264a5427bacbd1163f22b7204c6488e437e974a70c87afa6ff4',
   //apiSecret: '4b4e208a88a568b30bd9f809fa5d57d48c8d1ce6e5de84cc4f24311062245c69066130fcdacea9ffe8be881df4f659b9beb437380b2c7737b2d83556df3a63266268e1118e2bbf8586df12c0a1fc6ad6c213be11c498c3e0aa895ed13ff323e294d47dc9',

   apiKey:'35c1fd4032924b3aad132a6d135294f8192816f541da44039dcea439f3e6cce3',
   apiSecret: '25d7622eb5df82eace388295ab8872cdd6b6ea89dfb66bd31dde8ae26cd904c9f32511bdb166baa5b3ac8ddfb181d79e838636ec6baf929a454ad1e96d67e5ffa8d98091d9d51b044122c43638ea0a473688e48832d3a28ba81777bf965a23c5d37b1825',
   
   forcedIpAddress: "5.27.45.192", // Provide your forced IP address here

  });


//bot api9
const api2 = new threeCommasAPI({
    //Trusted IPs: 5.27.45.192
    
  //apiKey:'78e5ac54a2314b14812a6517d5d780057b1c7d716fb747549a51211efe472d3c',
  //apiSecret: '8ac1d3d62709609d537fded1d614a8abfb8a32af5dc1537ec7a6d936e0b97a6ea8bf7770f15f62b0b7666155de91cd26d4192c7897a424be89260db39a9a52703d3d9ebaaa9fae213ba417416cf0b1824cad9ab20dea74a4bc5e35ee7f09f695d7249c38',

  apiKey:'4d92b7d77e504372aa71127afca240acf546cf35d70a4dc79d8cc97b85a397c2',
  apiSecret: '43c7fe02916ed459d08b03ef3b45315168a2487e15eedbb34a6fc6a7cd37923c7cfc5d59f120daf2d351e9869bfcef2bc49e40828306f21c1179c229d799afde6862d16d255baca141d36ec3619e37963c66b2e72c3ca0555c3b040b4efee9dccd6d430a',
  
  forcedIpAddress: "5.27.45.192", // Provide your forced IP address here

  });

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

const capitalMap = new Map([
  [32101201, { title: 'G9', capital: 1000 }],
  [31876293, { title: 'G11', capital: 2000 }],
  [31814867, { title: 'G13', capital: 1000 }],
  [32103676, { title: 'G14', capital: 2000 }],
  [32178454, { title: 'G24', capital: 1000 }],
  [32427107, { title: 'G122', capital: 2700 }],
  [32427154, { title: 'G124', capital: 2000 }],
  [32428979, { title: 'G66', capital: 2000 }],
  [32433201, { title: 'G67', capital: 345 }],
  [32208556, { title: 'G27', capital: 1000 }],
  [32244363, { title: 'G117', capital: 1000 }],
  [32244371, { title: 'G118', capital: 2000 }],
  [32423630, { title: 'G98', capital: 427 }],
  [32435532, { title: 'G72', capital: 2000 }],
  [32152427, { title: 'G22', capital: 500 }],
  [32260429, { title: 'G30', capital: 500 }],
  [ 32244961,{title: 'G56 Fast',capital: 500}],
  [ 32101635,{title: 'G16 Fast',capital: 500}], 
  [ 32153351,{title: 'G17',capital: 2000}], 


]);


app.get('/data', async (req, res) => {
  try {
    const api1Ids = [
      32101201, 31876293, 32103676, 32178454, 32427154,
      32427107, 32428979, 32433201, 31814867,32152427,32101635,32153351,
    ];
    const api2Ids = [
      32208556, 32244363, 32244371,
      32423630, 32435532,32260429,32244961,
    ];

    // ... (Your existing code)

const api1Results = await Promise.all(api1Ids.map(async (id) => {
  const account = await api1.accountLoadBalances(id);
  const capitalInfo = capitalMap.get(id);
  const balance = Math.floor(account?.primary_display_currency_amount?.amount) || 0;
  const capital = capitalInfo?.capital || 0;
  const percentage = ((balance - capital) / capital * 100).toFixed(1);
  return {
    title: capitalInfo?.title || '',
    id,
    name: account?.name,
    balance,
    capital,
    percentage,
  };
}));

const api2Results = await Promise.all(api2Ids.map(async (id) => {
  const account = await api2.accountLoadBalances(id);
  const capitalInfo = capitalMap.get(id);
  const balance = Math.floor(account?.primary_display_currency_amount?.amount) || 0;
  const capital = capitalInfo?.capital || 0;
  const percentage = ((balance - capital) / capital * 100).toFixed(1);
  return {
    title: capitalInfo?.title || '',
    id,
    name: account?.name,
    balance,
    capital,
    percentage,
  };
}));


    const data = {
      api1: api1Results.sort((account1, account2) => account2.balance - account1.balance),
      api2: api2Results.sort((account1, account2) => account2.balance - account1.balance),
    };

   
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching balances from APIs' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
