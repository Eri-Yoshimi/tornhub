document.addEventListener('DOMContentLoaded', () => {
    // Inline JSON data
    const selections = {
        "User": ["ammo","attacks","attacksfull","bars","basic","battlestats","bazaar","cooldowns","crimes","criminalrecord","discord","display","education","equipment","events","gym","hof","honors","icons","inventory","jobpoints","log","medals","merits","messages","missions","money","networth","newevents","newmessages","notifications","offset","perks","personalstats","profile","properties","refills","reports","revives","revivesfull","skills","stocks","timestamp","travel","weaponexp","workstats"],
        "Property": ["offset","property","timestamp"],
        "Faction": ["applications","armor","armorynews","attacknews","attacks","attacksfull","basic","boosters","caches","cesium","chain","chainreport","chains","checkPermissions","contributors","crimeexp","crimenews","crimes","currency","donations","drugs","fundsnews","mainnews","medical","membershipnews","offset","positions","rankedwars","reports","revives","revivesfull","stats","temporary","territory","territorynews","timestamp","upgrades","weapons"],
        "Company": ["applications","companies","detailed","employees","news","offset","profile","stock","timestamp"],
        "Market": ["bazaar","itemmarket","offset","pointsmarket","timestamp"],
        "Torn": ["bank","cards","chainreport","cityshops","companies","competition","dirtybombs","education","factiontree","getCards","getDirtyBombs","gyms","honors","itemdetails","items","itemstats","logcategories","logtypes","medals","offset","organisedcrimes","pawnshop","pokertables","properties","rackets","raidreport","raids","rankedwarreport","rankedwars","rockpaperscissors","searchforcash","shoplifting","stats","stocks","territory","territorynames","territorywarreport","territorywars","timestamp"]
    };
    
    populateCategorySelect(selections);
    
    document.getElementById('categorySelect').addEventListener('change', function() {
        const selectedCategory = this.value;
        if (selectedCategory) {
            populateSelectionSelect(selections, selectedCategory);
        } else {
            clearSelectionSelect();
        }
    });
});

function populateCategorySelect(data) {
    const categorySelect = document.getElementById('categorySelect');
    Object.keys(data).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function populateSelectionSelect(data, category) {
    const selectionSelect = document.getElementById('selectionSelect');
    clearSelectionSelect();

    data[category].forEach(selection => {
        const option = document.createElement('option');
        option.value = selection;
        option.textContent = selection;
        selectionSelect.appendChild(option);
    });
}

function clearSelectionSelect() {
    const selectionSelect = document.getElementById('selectionSelect');
    selectionSelect.innerHTML = '<option value="">Select Selection</option>';
}

function fetchData() {
    const apiKey = document.getElementById('apiKey').value;
    const category = document.getElementById('categorySelect').value;
    let id = document.getElementById('id').value;
    const selection = document.getElementById('selectionSelect').value;

    if (!apiKey || !category || !selection) {
        document.getElementById('output').textContent = 'Please provide an API key and select both category and selection.';
        return;
    }
	
	if (!id) {
		id = '';
	}

    const url = `https://api.torn.com/${category.toLowerCase()}/${id}?selections=${selection}&key=${apiKey}`;
    
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
        });
}


// document.addEventListener('DOMContentLoaded', () => {
    // fetch('selections.json')
        // .then(response => response.json())
        // .then(data => populateCategorySelect(data))
        // .catch(error => console.error('Error loading JSON:', error));
    
    // document.getElementById('categorySelect').addEventListener('change', function() {
        // const selectedCategory = this.value;
        // if (selectedCategory) {
            // fetch('selections.json')
                // .then(response => response.json())
                // .then(data => populateSelectionSelect(data, selectedCategory))
                // .catch(error => console.error('Error loading JSON:', error));
        // } else {
            // clearSelectionSelect();
        // }
    // });
// });

// function populateCategorySelect(data) {
    // const categorySelect = document.getElementById('categorySelect');
    // Object.keys(data).forEach(category => {
        // const option = document.createElement('option');
        // option.value = category;
        // option.textContent = category;
        // categorySelect.appendChild(option);
    // });
// }

// function populateSelectionSelect(data, category) {
    // const selectionSelect = document.getElementById('selectionSelect');
    // clearSelectionSelect();

    // data[category].forEach(selection => {
        // const option = document.createElement('option');
        // option.value = selection;
        // option.textContent = selection;
        // selectionSelect.appendChild(option);
    // });
// }

// function clearSelectionSelect() {
    // const selectionSelect = document.getElementById('selectionSelect');
    // selectionSelect.innerHTML = '<option value="">Select Selection</option>';
// }

// function fetchData() {
    // const apiKey = document.getElementById('apiKey').value;
    // const category = document.getElementById('categorySelect').value;
    // const selection = document.getElementById('selectionSelect').value;

    // if (!apiKey || !category || !selection) {
        // document.getElementById('output').textContent = 'Please provide an API key and select both category and selection.';
        // return;
    // }

    // const url = `https://api.torn.com/${category.toLowerCase()}/?selections=${selection}&key=${apiKey}`;
    
    // fetch(url)
        // .then(response => {
            // if (!response.ok) {
                // throw new Error('Network response was not ok ' + response.statusText);
            // }
            // return response.json();
        // })
        // .then(jsonResponse => {
            // console.log(jsonResponse);
            // document.getElementById('output').textContent = JSON.stringify(jsonResponse, null, 2);
        // })
        // .catch(error => {
            // console.error('There was a problem with the fetch operation:', error);
            // document.getElementById('output').textContent = `Error: ${error.message}`;
        // });
// }
