async function fetchUserData() {
  try {
    const response = await fetch('https://reqres.in/api/users/1');
    const data = await response.json();
    console.log(data);

    const userDataDiv = document.getElementById('user-data');
    userDataDiv.innerHTML = `
      <p>ID: ${data.data.id}</p>
      <p>Email: ${data.data.email}</p>
      <p>First Name: ${data.data.first_name}</p>
      <p>Last Name: ${data.data.last_name}</p>
      <img src="${data.data.avatar}" alt="User Avatar">
    `;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

fetchUserData();
