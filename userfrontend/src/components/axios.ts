import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8080"; // 로컬 테스트용 🔵
axios.defaults.baseURL = 'https://api.bouncesto.site';   // 배포 테스트용 🔵

export default axios;
