import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL

export default axios;

