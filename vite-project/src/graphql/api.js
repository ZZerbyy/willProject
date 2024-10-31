import { API_URL } from './config.js';

export async function fetchData(query, variables = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
