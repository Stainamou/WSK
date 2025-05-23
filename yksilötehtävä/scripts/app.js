const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1'
const modal = document.querySelector('#modal');
let restaurants = [];
let selectedMenuType = 'daily';
let map;
let markers = [];
let favorites = [];

async function getWeeklyMenu(id, lang) {
  try {
    return await fetchData(`${apiUrl}/restaurants/weekly/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
}

document.getElementById('daily-menu-btn').addEventListener('click', () => {
  selectedMenuType = 'daily';
});

document.getElementById('weekly-menu-btn').addEventListener('click', () => {
  selectedMenuType = 'weekly';
});

async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    if (json.message) {
      throw new Error(`${json.message}, code:${response.status}`);
    }
    throw new Error(`Error ${response.status} occurred!`);
  }
  return json;
}

function createModalHtml(restaurant, modal) {
  const nameH3 = document.createElement('h3');
  nameH3.innerText  = restaurant.name;
  const addressP = document.createElement('p');
  addressP.innerText = `${restaurant.address}, puhelin: ${restaurant.phone}`;
  modal.append(nameH3, addressP);
}

function createMenuHtml(courses) {
  console.log(courses);
  let html = '';
  for (const course of courses) {
    html += `
    <article class="course">
      <p><strong>${course.name}</strong>,
      Hinta: ${course.price},
      Allergeenit: ${course.diets}</p>
    </article>
   `;
  }
  return html;
}

async function getRestaurants() {
  try {
    restaurants = await fetchData(apiUrl + '/restaurants');
  } catch (error) {
    console.error(error);
  }
}

async function getDailyMenu(id, lang) {
  try {
    return await fetchData(`${apiUrl}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
}

function sortRestaurants() {
  restaurants.sort(function (a, b) {
    return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  });
}

function createTable() {
  const restaurantContainer = document.querySelector('.container');
  const menuDetails = document.querySelector('#menu-details');

  const existingRows = restaurantContainer.querySelectorAll('.restaurant-row');
  existingRows.forEach(row => row.remove());

  for (const restaurant of restaurants) {
    const restaurantDiv = document.createElement('div');
    restaurantDiv.classList.add('restaurant-row');
    restaurantDiv.innerText = `${restaurant.name}, ${restaurant.address}, ${restaurant.city}`;

    const favoriteButton = document.createElement('button');
    favoriteButton.innerText = '★';
    favoriteButton.classList.add('favorite-btn');
    favoriteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleFavorite(restaurant)
    });
    restaurantDiv.appendChild(favoriteButton);

    restaurantDiv.addEventListener('click', async function () {
      try {
        for (const elem of document.querySelectorAll('.highlight')) {
          elem.classList.remove('highlight');
        }

        restaurantDiv.classList.add('highlight');

        let coursesResponse;
        if (selectedMenuType === 'daily') {
          coursesResponse = await getDailyMenu(restaurant._id, 'fi');
        } else {
          coursesResponse = await getWeeklyMenu(restaurant._id, 'fi');
        }

        console.log('Courses Response:', coursesResponse);

        const courses = coursesResponse?.courses || [];
        if (!courses.length) {
          console.warn('No courses available for this restaurant.');
        }

        const menuHtml = createMenuHtml(courses);

        modal.innerHTML = '';
        modal.showModal();
        createModalHtml(restaurant, modal);
        modal.insertAdjacentHTML('beforeend', menuHtml);
      } catch (error) {
        console.error(error);
      }
    });

    restaurantContainer.append(restaurantDiv);
  }
}

function filterRestaurants() {
  const city = document.getElementById('filter-city').value.toLowerCase();
  const provider = document.getElementById('filter-provider').value.toLowerCase();

  const filtered = restaurants.filter(r => {
    const matchesCity = !city || r.city.toLowerCase().includes(city);
    const matchesProvider = !provider || r.company.toLowerCase().includes(provider);
    return matchesCity && matchesProvider;
  });

  createTable(filtered);
  const map = initializeMap();
  addRestaurantMarkers(map, filtered);
}

function initializeMap() {
  if (map) {
    return map;
  }

  map = L.map('map').setView([60.1695, 24.9354], 13); // Centered on Helsinki

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  return map;
}

function addRestaurantMarkers(map, restaurants) {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];


  restaurants.forEach(restaurant => {
    if (restaurant.location && restaurant.location.coordinates) {
      console.log(`Adding marker for ${restaurant.name} at ${restaurant.location.coordinates}`);
      const { coordinates } = restaurant.location;
      const marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);

      marker.bindPopup(`
        <h3>${restaurant.name}</h3>
        <p>${restaurant.address}</p>
      `);

      markers.push(marker);
    } else {
      console.warn(`Missing coordinates for ${restaurant.name}`);
    }
  });
}

function toggleFavorite(restaurant) {
  const index = favorites.findIndex(fav => fav._id === restaurant._id);
  if (index === -1) {
    favorites.push(restaurant);
    console.log(`${restaurant.name} added to favorites`);
  } else {
    favorites.splice(index, 1);
    console.log(`${restaurant.name} removed from favorites`);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesUI();
}

function updateFavoritesUI() {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  favoriteButtons.forEach(button => {
    const restaurantDiv = button.parentElement;
    const restaurantName = restaurantDiv.innerText.split(',')[0];
    const isFavorite = favorites.some(fav => fav.name === restaurantName);

    button.style.color = isFavorite ? 'gold' : 'black';
  });
}

function loadFavorites() {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
}

function handleFavoritesButton() {
  modal.innerHTML = '<h3>Favorites Restaurants</h3>';

  if (favorites.length === 0) {
    modal.innerHTML += '<p>No favorite restaurants yet.</p>';
  } else {
    const favoritesList = document.createElement('ul');
    favorites.forEach(favorite => {
      const listItem = document.createElement('li');
      listItem.innerText = `${favorite.name}, ${favorite.city}`;
      favoritesList.appendChild(listItem);
    });
    modal.appendChild(favoritesList);
  }

  modal.showModal();
}

function handleContactButton() {
  modal.innerHTML = `
  <h3>Contact</h3>
  <p>Address: 123 Bing Bong Street, Helsinki</p>
  <p>Phone: +358 123456789</p>
  <p>Email: studentrestaurants@example.com</p>
`;
  modal.showModal();
}

async function main() {
  try {
    loadFavorites();
    await getRestaurants();
    sortRestaurants();
    createTable();

    const map = initializeMap();
    addRestaurantMarkers(map, restaurants);

    document.getElementById('filter-city').addEventListener('input', filterRestaurants);
    document.getElementById('filter-provider').addEventListener('input', filterRestaurants);
    document.getElementById('fav').addEventListener('click', handleFavoritesButton);
    document.getElementById('contact').addEventListener('click', handleContactButton);

    updateFavoritesUI();
  } catch (error) {
    console.error(error);
  }
}

main();
