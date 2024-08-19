async function fetchData(id, category, selection) {
    const apiKey = document.getElementById('apiKey').value;

    if (!apiKey || !category || !selection) {
        document.getElementById('output').textContent = 'Please provide an API key and select both category and selection.';
        return;
    }

    const url = `https://api.torn.com/${category.toLowerCase()}/${id}?selections=${selection}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const jsonResponse = await response.json();
        return jsonResponse; // Return the JSON data from the API
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('output').textContent = `Error: ${error.message}`;
    }
}

async function lowestBUY(id) {
    const json0 = await fetchData(id, "Market", "bazaar");
    const json1 = await fetchData(id, "Market", "itemmarket");

    if (json0 && json1) {
		return Math.min(json0.bazaar[0].cost, json1.itemmarket[0].cost);
    }
}

// Function to check search for cash data
async function lowestMEDsup() {
	let MEDsup = await lowestBUY(365);
    document.getElementById('output').innerHTML += 'The lowest price for A Box Of Medical Suplies is <strong>' + MEDsup + '</strong>.<br>';
    document.getElementById('output').innerHTML += '<a href="https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname=Box+of+Medical+Supplies">Buy A Box Of Medical Suplies Here!</a><br><br>';
	
	let morphine = await lowestBUY(66);
    document.getElementById('output').innerHTML += 'The lowest price for morphine is <strong>' + morphine + '</strong>.<br>';
	let Bbags = await lowestBUY(731);
    document.getElementById('output').innerHTML += 'The lowest price for empty blood bags is <strong>' + Bbags + '</strong>.<br>';
	let aid = await lowestBUY(67);
    document.getElementById('output').innerHTML += 'The lowest price for first aid kits is <strong>' + aid + '</strong>.<br>';
	let Said = await lowestBUY(68);
    document.getElementById('output').innerHTML += 'The lowest price for small first aid kits is <strong>' + Said + '</strong>.<br><br>';
	
    document.getElementById('output').innerHTML += 'From selling all (20) the morphine at the lowest price ' + (morphine-1) + '(-1 so you are always displayed at the top) you will get <strong>' + ((morphine-1)*20) + '</strong>.<br>';
    document.getElementById('output').innerHTML += 'From selling all (20) the empty blood bags at the lowest price ' + (Bbags-1) + '(-1 so you are always displayed at the top) you will get <strong>' + ((Bbags-1)*20) + '</strong>.<br>';
    document.getElementById('output').innerHTML += 'From selling all (30) the first aid kits at the lowest price ' + (aid-1) + '(-1 so you are always displayed at the top) you will get <strong>' + ((aid-1)*30) + '</strong>.<br>';
    document.getElementById('output').innerHTML += 'From selling all (50) the small first aid kits at the lowest price ' + (Said-1) + '(-1 so you are always displayed at the top) you will get <strong>' + ((Said-1)*50) + '</strong>.<br><br>';
	
    document.getElementById('output').innerHTML += 'That means that you can gain a minimum of <strong>' + (Math.min(((morphine-1)*20), ((Bbags-1)*20), ((aid-1)*30), ((Said-1)*50)) - MEDsup) + '</strong>.<br>';
    document.getElementById('output').innerHTML += 'That means that you can gain a maximum of <strong>' + (Math.max(((morphine-1)*20), ((Bbags-1)*20), ((aid-1)*30), ((Said-1)*50)) - MEDsup) + '</strong>.<br>';
}

// Function to call both checkSFC and checkSL
function fetchHub() {
    document.getElementById('output').textContent = ''; // Clear previous output
    lowestMEDsup(); // Fetch and display Search for Cash results
}