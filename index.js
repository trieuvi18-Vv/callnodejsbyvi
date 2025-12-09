require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.API_KEY;

// Nhận CITY từ terminal
const CITY = process.argv[2];

if (!CITY) {
    console.log(" Bạn chưa nhập tên thành phố.");
    console.log(" Ví dụ: node index.js \"Thai Nguyen\"");
    process.exit(1);
}

async function getWeather() {
    try {
        if (!API_KEY) {
            console.error(" Thiếu API_KEY trong file .env");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=vi`;

        const res = await axios.get(url);
        const data = res.data;

        console.log(`🌤️ Thời tiết tại ${CITY}:`);
        console.log(`🌡️ Nhiệt độ: ${data.main.temp}°C`);
        console.log(`💧 Độ ẩm: ${data.main.humidity}%`);
        console.log(`☁️ Mô tả: ${data.weather[0].description}`);
    } catch (err) {
        console.error(" Lỗi API:", err.message);
    }
}

getWeather();
