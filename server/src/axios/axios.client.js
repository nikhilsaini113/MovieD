import axios from "axios";

const get = async (url) => {
  const maxRetries = 5;
  const timeout = 3000; // 3 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(url, {
        headers: {
          "Accept": "application/json",
          "Accept-Encoding": "identity"
        },
        timeout: timeout
      });
      return response.data;
    } catch (e) {
      console.log(`Attempt ${attempt} failed:`, e.message);
      
      if (attempt === maxRetries) {
        console.log("Max retries reached. Throwing error.");
        throw e;
      }
      
      // Wait for 1 second before the next retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

export default { get };