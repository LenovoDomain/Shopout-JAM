const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  ];
  
  // Function to get a random User-Agent from the list
  function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
  }
  
  // Function to simulate delay between actions
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Function to display data in the table
  function displayData(data) {
    let tableBody = document.querySelector('#laptopTable tbody');
    tableBody.innerHTML = ''; // Clear previous data
  
    data.forEach(item => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.brand}</td>
        <td>${item.model}</td>
        <td>${item.cpu}</td>
        <td>${item.cpuFamily}</td>
        <td>${item.aspectRatio}</td>
        <td>${item.ram}</td>
        <td>${item.storage}</td>
        <td>${item.gpu}</td>
        <td>${item.price}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Example data fetch function (replace with actual scraper)
  async function fetchDataWithDelay() {
    const userAgent = getRandomUserAgent();
  
    const response = await fetch('https://example.com/laptop1', {
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive'
      }
    });
  
    const data = await response.json();
    console.log(data); // Replace with actual data processing
  
    await delay(2000); // Delay for 2 seconds to prevent being flagged
  }
  
  // Export data to Excel
  function exportToExcel() {
    let table = document.getElementById('laptopTable');
    let wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'laptops.xlsx');
  }
  
  // Event listeners for button actions
  document.getElementById('startScraping').addEventListener('click', async function() {
    let brandFilter = document.getElementById('brand').value;
    let retailerFilter = document.getElementById('retailer').value;
    let cpuFilter = document.getElementById('cpu').value;
  
    // Simulate data - replace this with actual scraping logic
    let data = [
      {brand: 'HP', model: 'HP Laptop 15', cpu: 'Intel Core i5', cpuFamily: 'Intel', aspectRatio: '16:9', ram: '8GB', storage: '1TB HDD', gpu: 'Intel HD', price: 'R10,000'},
      {brand: 'Dell', model: 'Dell XPS 13', cpu: 'Intel Core i7', cpuFamily: 'Intel', aspectRatio: '16:9', ram: '16GB', storage: '512GB SSD', gpu: 'Intel Iris', price: 'R20,000'}
    ];
  
    // Filter data here based on inputs
  
    displayData(data);  // Display the fetched data in the table
  });
  
  document.getElementById('exportExcel').addEventListener('click', exportToExcel);
  