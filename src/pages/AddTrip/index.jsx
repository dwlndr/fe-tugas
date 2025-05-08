import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    country: "",
    accommodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: "",
    quota: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Siapkan payload sesuai TRIPS schema:
    const payload = {
      title: form.title,
      description: form.description,
      image: form.image,
      price: Number(form.price),
      duration: `${form.day}D/${form.night}N`,
      location: form.country,
    };

    try {
      await axios.post("https://be-tugas-production.up.railway.app/api/trips", payload);
      alert("Trip added successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-black">Add Trip</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title Trip</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full h-10 bg-gray-200 rounded px-4"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              className="w-full h-10 bg-gray-200 rounded px-4"
            >
              <option value="">Select Country</option>
              <option>Australia</option>
              <option>South Korea</option>
              <option>Japan</option>
              <option>Indonesia</option>
            </select>
          </div>

          {/* Accommodation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Accommodation
            </label>
            <input
              name="accommodation"
              value={form.accommodation}
              onChange={handleChange}
              className="w-full h-10 bg-gray-200 rounded px-4"
            />
          </div>

          {/* Transportation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Transportation
            </label>
            <input
              name="transportation"
              value={form.transportation}
              onChange={handleChange}
              className="w-full h-10 bg-gray-200 rounded px-4"
            />
          </div>

          {/* Eat */}
          <div>
            <label className="block text-sm font-medium mb-1">Eat</label>
            <input
              name="eat"
              value={form.eat}
              onChange={handleChange}
              className="w-full h-10 bg-gray-200 rounded px-4"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <div className="flex items-center gap-3">
              <input
                name="day"
                type="number"
                placeholder="Day"
                value={form.day}
                onChange={handleChange}
                className="w-24 h-10 bg-gray-200 rounded px-3"
                required
              />
              <span className="text-sm">Day</span>
              <input
                name="night"
                type="number"
                placeholder="Night"
                value={form.night}
                onChange={handleChange}
                className="w-24 h-10 bg-gray-200 rounded px-3"
                required
              />
              <span className="text-sm">Night</span>
            </div>
          </div>

          {/* Date Trip */}
          <div>
            <label className="block text-sm font-medium mb-1">Date Trip</label>
            <input
              name="dateTrip"
              type="date"
              value={form.dateTrip}
              onChange={handleChange}
              className="w-full h-10 bg-gray-200 rounded px-4"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full h-10 bg-gray-200 rounded px-4"
              required
            />
          </div>

          {/* Quota */}
          <div>
            <label className="block text-sm font-medium mb-1">Quota</label>
            <input
              name="quota"
              type="number"
              value={form.quota}
              onChange={handleChange}
              className="w-full h-10 bg-gray-200 rounded px-4"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              required
              className="w-full bg-gray-200 rounded px-4 py-2 resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Image Url</label>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              className="w-full h-10 bg-gray-200 rounded px-4"
              required
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FFAF00] hover:brightness-110 text-white px-6 py-2 rounded font-semibold transition"
            >
              {loading ? "Adding..." : "Add Trip"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFAF00] text-white py-4 text-center text-sm mt-12">
        Copyright © 2025 Dewe Tour – Your Name – NIS. All Rights Reserved.
      </footer>
    </div>
  );
};

export default AddTrip;
