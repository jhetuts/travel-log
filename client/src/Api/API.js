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
  try {
    const response = await fetch(`http://localhost:1337/api/logs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
