require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

const API_KEY = process.env.API_KEY;

app.use(express.static("public"));
app.use(express.json());


function getEmoji(icon) {
    const map = {
        "01d": "☀️",  // trời nắng
        "01n": "🌕",

        "02d": "🌤️", // ít mây
        "02n": "☁️",

        "03d": "⛅",  // nhiều mây
        "03n": "☁️",

        "04d": "☁️",
        "04n": "☁️",

        "09d": "🌧️", // mưa
        "09n": "🌧️",

        "10d": "🌦️", // mưa rào
        "10n": "🌧️",

        "11d": "⛈️", // giông
        "11n": "⛈️",

        "13d": "❄️", // tuyết
        "13n": "❄️",

        "50d": "🌫️", // sương mù
        "50n": "🌫️"
    };

    return map.hasOwnProperty(icon) ? map[icon] : "🌡️";
}

app.post("/weather", async (req, res) => {
    const city = req.body.city;

    if (!city) {
        return res.json({ error: "Bạn phải nhập tên thành phố!" });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`;
        const response = await axios.get(url);
        const data = response.data;

        res.json({
            city,
            emoji: getEmoji(data.weather[0].icon),
            temp: data.main.temp,
            humidity: data.main.humidity,
            desc: data.weather[0].description
        });
    } catch (err) {
        res.json({ error: "Không tìm thấy thành phố!" });
    }
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});
