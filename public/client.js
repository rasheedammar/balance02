// Define api1Table and api2Table
const api1Table = document.getElementById('api1-table');
const api2Table = document.getElementById('api2-table');

// Function to create an account row with a stop bot button
const createAccountRow = (accountId, accountData) => {
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
      <td>${accountId}</td>
      <td>${accountData.name}</td>
      <td>$${accountData.balance}</td>
      <td>$${accountData.capital}</td>
      <td>${accountData.title}</td>
      <td>${accountData.percentage}%</td>
  `;

  // Apply percentage color based on the percentage value
  const percentageCell = tableRow.querySelector('td:nth-child(6)');
  
  console.log('tableRow:', tableRow); // Log the table row
  console.log('percentageCell:', percentageCell); // Log the selected element
  
  const percentage = parseFloat(accountData.percentage);
  if (!isNaN(percentage)) {
    if (percentage < 0) {
      percentageCell.style.color = 'red';
    } else {
      percentageCell.style.color = 'green';
    }
  }

  return tableRow;
};

// Fetch the account data from the server and append rows to api1-table and api2-table
const fetchData = async () => {
  try {
    const response = await fetch('/data'); // Corrected URL here
    const data = await response.json();

    const api1TotalCapital = data.api1.reduce((total, account) => total + account.capital, 0);
    const api2TotalCapital = data.api2.reduce((total, account) => total + account.capital, 0);

    // Update total capital display
    document.getElementById('api1-total-capital').textContent = `$${api1TotalCapital}`;
    document.getElementById('api2-total-capital').textContent = `$${api2TotalCapital}`;

    // Clear existing table rows
    api1Table.innerHTML = '';
    api2Table.innerHTML = '';

    // Iterate over the account data and create the table rows for API1
    data.api1.forEach((account) => {
      const row = createAccountRow(account.id, account);
      api1Table.appendChild(row);
    });

    // Iterate over the account data and create the table rows for API2
    data.api2.forEach((account) => {
      const row = createAccountRow(account.id, account);
      api2Table.appendChild(row);
    });



    // client.js

// Import the showBotDetails function from the showBot.js file
const { showBotDetails } = require('./showBot');

// Add an event listener to the button
document.addEventListener('DOMContentLoaded', () => {
  const loadBotButton = document.getElementById('load-bot-button');

  loadBotButton.addEventListener('click', async () => {
    // Replace 'yourBotId' and 'yourApi' with the actual bot ID and API
    const botId = 11500872;
    const api = api1;

    // Call the showBotDetails function
    await showBotDetails(botId, api);
  });
});

const loadBotButtons = document.querySelectorAll('.load-bot-button');



  } catch (error) {
    console.error('Error fetching account data:', error);
  }
};

// Call the fetchData function when the page loads
fetchData();
