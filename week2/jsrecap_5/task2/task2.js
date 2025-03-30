async function createUser() {
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'john.doe@reqres.in', first_name: 'John', last_name: 'Doe', job: 'Software Developer' })
  });
  const data = await response.json();
  console.log(data);
}

createUser();
