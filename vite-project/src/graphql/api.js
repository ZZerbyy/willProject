// src/graphql/api.js
import { API_URL } from './config';

export async function fetchData(query, variables = {}) {
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

  const json = await response.json();
  return json.data;
}
