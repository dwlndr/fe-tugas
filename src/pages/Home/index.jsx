// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("https://be-tugas-production.up.railway.app/api/trips")
      .then((res) => setTrips(res.data.data))
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-black">Income Trip</h1>
          <Link
            to="/add-trip"
            className="bg-[#FFAF00] hover:brightness-110 text-white font-semibold px-5 py-2 rounded transition"
          >
            Add Trip
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              to={`/detail-trip/${trip.id}`}
              className="block bg-white p-3 rounded-xl shadow-md hover:shadow-lg overflow-hidden transition relative"
            >
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white text-sm px-2 py-1 rounded shadow text-gray-700 font-medium">
                {trip.quota || "12/15"}
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <p className="text-sm text-gray-600 font-medium">
                  {trip.duration}
                </p>
                <h2 className="text-base font-semibold text-black truncate">
                  {trip.title}
                </h2>
                <p className="text-[#FFAF00] font-bold text-sm">
                  IDR {trip.price.toLocaleString()}
                </p>
                <p className="text-right text-gray-400 text-sm">
                  {trip.location?.split(",").pop().trim()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-[#FFAF00] text-white py-4 text-center text-sm mt-12">
        Copyright © 2025 Dewe Tour - Ardhilla - NIS. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
