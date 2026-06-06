const axios = require("axios");

const WRITE = "http://localhost:8080";
const READ = "http://localhost:8081";

async function runTest() {
  try {
    console.log("Creating product...");

    const createRes = await axios.post(`${WRITE}/api/products`, {
      name: "Test Laptop",
      price: 1000,
      category: "Electronics",
      stock: 5
    });

    const product = createRes.data;
    console.log("Created:", product);

    console.log("Waiting for sync...");
    await new Promise(r => setTimeout(r, 8000));

    const searchRes = await axios.get(`${READ}/api/products/search?query=Test`);

    console.log("MongoDB result:", searchRes.data);

    if (searchRes.data.length > 0) {
      console.log("✅ SYNC SUCCESS");
    } else {
      console.log("❌ SYNC FAILED");
    }

  } catch (err) {
    console.error("Test failed:", err.message);
  }
}

runTest();