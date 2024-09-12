   // Variable to store input
   let baseCur = '';
   let newCur = '';
   let amt = '';
   let convertURL = 'https://api.forexrateapi.com/v1/convert?api_key=0c127bcebf16f68e6eaa1afb0bf2cf29';
   let rateURL = 'https://api.forexrateapi.com/v1/latest?api_key=0c127bcebf16f68e6eaa1afb0bf2cf29';
   let currencies = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD"];

   getRates("USD");
   console.log(rateURL);

   document.addEventListener("DOMContentLoaded", function() {
    const currencySelect = document.getElementById('currencySelect');

    // Trigger getRates when a new currency is selected
    currencySelect.addEventListener('change', () => {
        const selectedCurrency = currencySelect.value;
        getRates(selectedCurrency); // Pass selected currency to getRates function
    });

    // Initial load with the default selected currency
    getRates(currencySelect.value);
});

   function getRates(base){
        rateURL = rateURL + "&base=" + base + "&currencies=";
        appendCurrencies();

        fetch(rateURL)
        .then(response => {
            if (response.ok) {
            return response.json(); // Parse the response data as JSON
            } else {
            throw new Error('API request failed');
            }
        })
        .then(data => {
            console.log(data)
            const ratesData = data.rates
            const symbols = [];
            const rates = [];
            for (const [currency, rate] of Object.entries(ratesData)) {
                symbols.push(currency); // Storing currency codes
                rates.push(rate);           // Storing rates
              }
            console.log(symbols);
            console.log(rates);
            const tableBody = document.querySelector("#ratesTable tbody");
            tableBody.innerHTML = ''; // Clear existing rows

            for (let i = 0; i < symbols.length; i++) {
                const row = document.createElement('tr');

                const currencyCell = document.createElement('td');
                currencyCell.textContent = symbols[i];
                row.appendChild(currencyCell);

                const rateCell = document.createElement('td');
                rateCell.textContent = rates[i];
                row.appendChild(rateCell);

                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            // Handle any errors here
            console.error(error); // Example: Logging the error to the console
        });

   }

   
   // Function that converts the base currency to the target
   function convert() {
       baseCur = document.getElementById('inputBase').value;;
       newCur = document.getElementById('inputNew').value;
       amt = document.getElementById('inputAmt').value;

       convertURL = convertURL + '&from=' + baseCur + '&to=' + newCur + '&amount=' + amt;
       console.log(convertURL)
       fetch(convertURL)
       .then(response => {
           if (response.ok) {
           return response.json(); // Parse the response data as JSON
           } else {
           throw new Error('API request failed');
           }
       })
       .then(data => {
           // Process the response data here
           console.log(data); // Example: Logging the data to the console
           const rate = data.info.quote;
             const result = data.result;

             // Displaying the extracted data in the outputBox
             document.getElementById('outputBox').textContent = `Rate: ${rate}\nResult: ${result}`;
       })
       .catch(error => {
           // Handle any errors here
           console.error(error); // Example: Logging the error to the console
       });
     
   }

   // Adds the currnecies to the end of the URL used for the API call
   function appendCurrencies(){
        for(i = 0; i < 9; i++){
            rateURL = rateURL + currencies[i] + ","
        }
        rateURL = rateURL + currencies[9];
        
   }
