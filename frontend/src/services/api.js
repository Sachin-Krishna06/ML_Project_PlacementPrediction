import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Change in production

export const getHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    return { status: "error", models_loaded: false };
  }
};

export const predictPlacement = async (profileData) => {
  const response = await axios.post(`${API_URL}/predict`, profileData);
  return response.data;
};

export const getCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies`);
  return response.data;
};

export const getModelMetrics = async () => {
  const response = await axios.get(`${API_URL}/model-metrics`);
  return response.data;
};
