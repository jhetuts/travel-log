const API_URL = "http://localhost:1337";

export async function listLogEntries() {
  try {
    const response = await fetch(`http://localhost:1337/api/logs`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function createLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  const response = await fetch(`http://localhost:1337/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  const error = new Error(json.message);
  error.response = json;
  throw error;
}
