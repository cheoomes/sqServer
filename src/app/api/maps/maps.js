import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";

const MAPS_API_URL = "https://maps.googleapis.com/maps/api";
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Rate limiter configuration
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });

// Use middleware for rate limiting
// const withRateLimit = (handler) => async (req, res) => {
//   await limiter(req, res);
//   return handler(req, res);
// };

const handler = async (req, res) => {
  const { endpoint, params } = req.query;

  // Log the request
  console.log(
    `User requested ${endpoint} with params: ${JSON.stringify(params)}`
  );

  try {
    // Construct the API URL
    const url = `${MAPS_API_URL}/${endpoint}?${new URLSearchParams({
      ...params,
      key: API_KEY,
    })}`;

    // Fetch data from Google Maps API
    const response = await fetch(url);
    const data = await response.json();

    // Return the data to the client
    res.status(response.ok ? 200 : response.status).json(data);
  } catch (error) {
    console.error("Error fetching data from Google Maps API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the handler wrapped with rate limiting
export default withRateLimit(handler);
