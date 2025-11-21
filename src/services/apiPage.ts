const API_URL = "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com";
let cachedApiKey: string | null = null;

async function fetchApiKey(): Promise<string> {
  console.log("Fetched API key:", cachedApiKey);
  if (!cachedApiKey) {
    try {
      const response = await fetch(`${API_URL}/key`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch API key");
      }

      const data = await response.json();
      cachedApiKey = data.key || data.apiKey || data;
    } catch (error) {
      throw new Error("Couldn't fetch API key. Please try again.");
    }
  }

  if (!cachedApiKey) {
    throw new Error("API key unavailable.");
  }

  return cachedApiKey;
}

interface Booking {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
}

async function postBooking(bookingData: Booking, apiKey: string) {
  return fetch(`${API_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(bookingData),
  });
}

export async function sendBookingInfo(bookingData: Booking): Promise<any> {
  const apiKey = await fetchApiKey();
  const response = await postBooking(bookingData, apiKey);

  if (!response.ok) {
    throw new Error("Booking failed, please try again!");
  }

  return response.json();
}
