"use client";
import { useState } from "react";

export default function Home() {
  const [location, setlocation] = useState("");
  const [weather, setWeather] = useState<JSX.Element | null>(null);

  const getweather = async () => {
    const api_key = "099d9dbc55644136a6c201541241610";
    const api_url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;

    if (location) {
      try {
        const res = await fetch(api_url);
        const data = await res.json();
        if (data) {
          const api_data = {
            country: data.location.country,
            city: data.location.name,
            temp: data.current.temp_f,
            humidity: data.current.humidity,
            wind: data.current.wind_mph,
            gust: data.current.gust_mph,
            visibility: data.current.vis_miles,
            condition: data.current.condition.text,
            img: data.current.condition.icon,
          };

          // Set JSX in weather state
          setWeather(
            <div className="bg-gradient-to-r from-blue-500 to-indigo-700 p-5 rounded-lg shadow-lg text-white">
              <div className="text-center text-3xl font-bold mb-2">
                {api_data.city}, {api_data.country}
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={api_data.img}
                  width="100"
                  height="100"
                  alt="condition"
                />
                <div className="text-5xl font-bold ml-4">
                  {api_data.temp}°F
                </div>
              </div>
              <div className="text-center text-xl mt-2">
                {api_data.condition}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-lg">
                <div>
                  <strong>Humidity:</strong> {api_data.humidity}%
                </div>
                <div>
                  <strong>Wind:</strong> {api_data.wind} mph
                </div>
                <div>
                  <strong>Visibility:</strong> {api_data.visibility} mi
                </div>
                <div>
                  <strong>Gust:</strong> {api_data.gust} mph
                </div>
              </div>
            </div>
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/mnt/data/Screenshot 2024-10-17 131254.png')",
        }}
      >
        <div className="flex justify-center items-center h-1/3">
          <div className="relative w-96">
            <input
              id="location"
              placeholder="Search location (ie. Islamabad)"
              type="text"
              value={location}
              className="w-full bg-slate-800 text-white text-lg rounded-lg opacity-90 pl-6 p-3"
              onChange={(e) => setlocation(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-800 text-white p-2 rounded-full shadow-lg transition duration-300 ease-in-out"
              id="search"
              onClick={getweather}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                className="mx-auto"
              >
                <path
                  fill="#FFFFFF"
                  d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {weather && (
          <div className="flex w-full p-10 justify-center">
            <div className="w-full max-w-md">
              <div className="mb-4">
                <div className="bg-black bg-opacity-60 shadow-lg rounded-3xl px-8 pt-6 pb-8 mb-4 text-white">
                  {weather}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
