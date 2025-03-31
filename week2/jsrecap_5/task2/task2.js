async function createUser() {
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'john.doe@reqres.in', first_name: 'John', last_name: 'Doe', job: 'Software Developer' })
    });
    const data = await response.json();
    console.log(data);

    const userDataDiv = document.getElementById('user-data');
    const createdAt = data.createdAt ? new Date(data.createdAt).toLocaleString() : '';
    userDataDiv.innerHTML = `
      <p>ID: ${data.id}</p>
      <p>Email: ${data.email}</p>
      <p>First Name: ${data.first_name}</p>
      <p>Last Name: ${data.last_name}</p>
      <p>Job: ${data.job}</p>
      ${createdAt ? `<p>Created At: ${createdAt}</p>` : ''}
    `;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

createUser();
