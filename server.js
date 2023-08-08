app.get('/data', async (req, res) => {
  try {
    // ... (your existing code to fetch API data and calculate individual account results)

    const capitalMap = new Map([
      [32101201, { title: 'G9', capital: 500, bots: ['11454883', '11454884'] }],
    
      [31876293, { title: 'G11', capital: 1000, bots: ['botId1', 'botId2'] }],
    
      [31814867, { title: 'G13', capital: 1000, bots: ['botId1', 'botId2'] }],
    
      [32103676, {title: 'G14', capital: 2000, bots: ['botId1', 'botId2'] }],    
    
      [32178454, { title: 'G24',capital: 1000, bots: ['botId1', 'botId2'] }],    
    
      [32427107 ,{ title: 'G122',capital: 4000, bots: ['botId1', 'botId2'] }],    
    
      [32427154,{ title: 'G124', capital: 2000, bots: ['botId1', 'botId2'] }],    
    
      [32428979, { title: 'G66',capital: 2000, bots: ['botId1', 'botId2'] }],    
    
      [32433201 ,{ title: 'G67',capital: 345, bots: ['botId1', 'botId2'] }],    
    
      [32208556 ,{ title: 'G27',capital: 500, bots: ['botId1', 'botId2'] }],    
    
      [32244363, { title: 'G117',capital: 3000, bots: ['botId1', 'botId2'] }],    
    
      [32244371, { title: 'G118',capital: 2000, bots: ['botId1', 'botId2'] }],    
    
      [32423630 ,{title: 'G98',capital: 427, bots: ['botId1', 'botId2'] }],    
    
      [ 32435532,{title: 'G72',capital: 2000, bots: ['botId1', 'botId2'] }],   
    
      [ 32152427,{title: 'G22',capital: 500, bots: ['botId1', 'botId2'] }],  
    
      [ 32260429,{title: 'G30',capital: 500, bots: ['botId1', 'botId2'] }],    
    
    ]);
    
    const api1TotalCapital = api1Results.reduce((total, account) => total + account.capital, 0);
    const api2TotalCapital = api2Results.reduce((total, account) => total + account.capital, 0);
    
    const dataWithTotalCapital = {
      api1: api1Results.sort((account1, account2) => account2.balance - account1.balance),
      api2: api2Results.sort((account1, account2) => account2.balance - account1.balance),
      totalCapital: api1TotalCapital + api2TotalCapital,
    };
    
    res.json(dataWithTotalCapital);
  

  } catch (error) {
    res.status(500).json({ error: 'Error fetching balances from APIs' });
  }
});
