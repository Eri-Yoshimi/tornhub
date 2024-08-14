function requestREP() {
    const apiKey = document.getElementById('apiKey').value;
    const url = `https://api.torn.com/user/?selections=skills&key=${apiKey}`;
    
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
            return response.json();
        })
        .then(jsonResponse => {
            console.log(jsonResponse);
            document.getElementById('output').textContent = JSON.stringify(jsonResponse, null, 2);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('output').textContent = `Error: ${error.message}`;
    }
}
