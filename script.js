let allCountries = [];

async function getCountries() {
    try {
        const response = await fetch('db.json'); // Replace with 'http://localhost:5000/countries' if using a server
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
        const result = await response.json();
        allCountries = result.countries;
        renderList(allCountries);
        sortCountries(allCountries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function renderList(countries) {
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = ''; // Clear current content
    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'card w-80 bg-base-100 shadow-xl';
        card.innerHTML = `
            <figure><img src="${country.flag}" alt="Flag of ${country.name}" class="w-full h-40 object-cover"/></figure>
            <div class="card-body">
                <h2 class="card-title">${country.name}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString('en-US')}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Currency:</strong> ${country.evro}</p>
            </div>
        `;
        wrapper.appendChild(card);
    });
}

function sortCountries(countries) {
    const asia = document.getElementById('asia');
    const evro = document.getElementById('evro');

    asia.addEventListener('click', () => {
        const filteredCountries = countries.filter(country => country.region.includes('Asia'));
        renderList(filteredCountries);
    });

    evro.addEventListener('click', () => {
        const filteredCountries = countries.filter(country => country.evro === true);
        renderList(filteredCountries);
    });

    document.querySelector('.dropdown summary').addEventListener('click', () => {
        renderList(countries);
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCountries = allCountries.filter(country =>
        country.name.toLowerCase().includes(searchTerm)
    );
    renderList(filteredCountries);
});

getCountries();