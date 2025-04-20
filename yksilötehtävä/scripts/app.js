const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1'
const modal = document.querySelector('#modal');
let restaurants = [];
let selectedMenuType = 'daily';

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
    throw new Error(`Error ${response.status} occured!`);
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
        const menuHtml = createMenuHtml(coursesResponse.courses);

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

async function main() {
  try {
    await getRestaurants();
    sortRestaurants();
    createTable();
  } catch (error) {
    console.error(error);
  }
}

main();
