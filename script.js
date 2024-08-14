fetch("https://api.torn.com/user/?selections=skills&key=APIKEY") // Fetches data from API
.then((response) => response.json()) // Converts the fetched data into JSON
.then((jsonResponse) => console.log(jsonResponse)); // Prints the JSON
