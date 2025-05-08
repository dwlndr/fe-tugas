// src/pages/TripDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdHotel,
  MdFlight,
  MdRestaurant,
  MdAccessTime,
  MdCalendarToday,
} from "react-icons/md";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/trips/${id}`)
      .then((res) => {
        setTrip(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load trip");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/trips/${id}`);
      alert("Trip deleted");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title & Location */}
        <div>
          <h1 className="text-4xl font-bold text-black">
            {trip.duration}{" "}
            {trip.title.split(trip.duration)[1]?.trim() || trip.title}
          </h1>
          <p className="text-gray-500 mt-1">{trip.location}</p>
        </div>

        {/* Main Image */}
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />

        {/* Info Icons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-6 gap-x-4 text-center">
          {/* Accommodation */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Accommodation</span>
            <div className="flex items-center mt-1 gap-1 text-gray-700">
              <MdHotel size={20} />
              <span className="font-medium">{trip.accommodation || "-"}</span>
            </div>
          </div>

          {/* Transportation */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Transportation</span>
            <div className="flex items-center mt-1 gap-1 text-gray-700">
              <MdFlight size={20} />
              <span className="font-medium">{trip.transportation || "-"}</span>
            </div>
          </div>

          {/* Eat */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Eat</span>
            <div className="flex items-center mt-1 gap-1 text-gray-700">
              <MdRestaurant size={20} />
              <span className="font-medium">{trip.eat || "-"}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Duration</span>
            <div className="flex items-center mt-1 gap-1 text-gray-700">
              <MdAccessTime size={20} />
              <span className="font-medium">{trip.duration}</span>
            </div>
          </div>

          {/* Date Trip */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Date Trip</span>
            <div className="flex items-center mt-1 gap-1 text-gray-700">
              <MdCalendarToday size={20} />
              <span className="font-medium">
                {new Date(trip.dateTrip).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {trip.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="space-y-4">
          <div className="text-2xl font-bold text-[#FFAF00]">
            IDR {trip.price.toLocaleString()}{" "}
            <span className="text-lg font-medium text-black">/ Person</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            {/* Delete */}
            <button
              onClick={handleDelete}
              className="w-full bg-[#FF6200] hover:brightness-110 text-white py-3 rounded font-semibold transition"
            >
              Delete Trip
            </button>
            {/* Edit */}
            <button
              onClick={() => navigate(`/edit-trip/${id}`)}
              className="w-full bg-amber-500 hover:brightness-90 text-white py-3 rounded font-semibold transition"
            >
              Edit Trip
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFAF00] text-white py-4 text-center text-sm mt-12">
        Copyright © 2025 Dewe Tour – Your Name – NIS. All Rights Reserved.
      </footer>
    </div>
  );
};

export default TripDetail;
