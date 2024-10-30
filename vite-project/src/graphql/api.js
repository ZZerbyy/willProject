import { API_URL } from './config';

export async function fetchData(query, variables = {}) {
  try {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage after login
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (error) {
    console.error('fetchData error:', error);
    throw error;
  }
}
