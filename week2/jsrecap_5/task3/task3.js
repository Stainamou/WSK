async function fetchData() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23');
    if (!response.ok) {
      console.error(`GET request failed with status: ${response.status}`);
      return;
    }
    const data = await response.json();
    document.getElementById('user-data').innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Fetch GET request failed:', error);
  }
}

async function createUser() {
  try {
    const response = await fetch('https://reqres.in/api/nonexistent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'john.doe@reqres.in', first_name: 'John', last_name: 'Doe', job: 'Software Developer' })
    });
    if (!response.ok) {
      console.error(`POST request failed with status: ${response.status}`);
      return;
    }
    const data = await response.json();
    document.getElementById('user-data').innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Fetch POST request failed:', error);
  }
}

async function updateUser() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/9999', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'john.doe@reqres.in', first_name: 'John', last_name: 'Doe', job: 'Software Developer' })
    });
    if (!response.ok) {
      console.error(`PUT request failed with status: ${response.status}`);
      return;
    }
    const data = await response.json();
    document.getElementById('user-data').innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Fetch PUT request failed:', error);
  }
}

async function deleteUser() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/9999', {
      method: 'DELETE'
    });
    if (!response.ok) {
      console.error(`DELETE request failed with status: ${response.status}`);
      return;
    }
    document.getElementById('user-data').innerText = 'User deleted successfully';
  } catch (error) {
    console.error('Fetch DELETE request failed:', error);
  }
}

fetchData();
createUser();
updateUser();
deleteUser();
