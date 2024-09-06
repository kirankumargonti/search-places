import axios from 'axios'
import {City} from '../types/city'

const API_URL = import.meta.env.VITE_APP_API_URL
const API_KEY = import.meta.env.VITE_APP_API_KEY

interface ApiResponse {
  data: City[]
  metadata: {
    currentOffset: number
    totalCount: number
  }
}

export const fetchCities = async (
  searchTerm: string,
  limit: number,
  offset: number
): Promise<ApiResponse> => {
  const options = {
    method: 'GET',
    url: `${API_URL}/v1/geo/cities`,
    params: {namePrefix: searchTerm, limit, offset},
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    },
  }

  try {
    const response = await axios.request<ApiResponse>(options)
    return response.data
  } catch (error) {
    console.error('Error fetching cities:', error)
    throw error
  }
}
