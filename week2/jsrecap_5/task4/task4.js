async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

(async () => {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    document.body.innerHTML = `<pre>${JSON.stringify(userData, null, 2)}</pre>`;
  } catch (error) {
    console.error('An error occurred:', error);
    document.body.innerHTML = `<p>An error occurred: ${error.message}</p>`;
  }
})();
