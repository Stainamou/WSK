const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1'
const modal = document.querySelector('#modal');
let restaurants = [];
let selectedMenuType = 'daily';
let map;
let markers = [];

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

async function main() {
  try {
    await getRestaurants();
    sortRestaurants();
    createTable();

    const map = initializeMap();
    addRestaurantMarkers(map, restaurants);

    document.getElementById('filter-city').addEventListener('input', filterRestaurants);
    document.getElementById('filter-provider').addEventListener('input', filterRestaurants);
  } catch (error) {
    console.error(error);
  }
}

main();
