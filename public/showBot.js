// showBot.js

// Function to show bot details
const showBotDetails = async (botId, api) => {
    try {
      const response = await fetch(`/bot/${api}/${botId}`);
      const botData = await response.json();
  
      // Do something with botData (e.g., display details in the DOM)
      console.log('Bot Details:', botData);
    } catch (error) {
      console.error('Error fetching bot details:', error);
    }
  };
  
  // Export the function for use in other files
  module.exports = { showBotDetails };
  