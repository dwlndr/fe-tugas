import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditTrip = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing data
  useEffect(() => {
    axios
      .get(`https://be-tugas-production.up.railway.app/api/trips/${id}`)
      .then((res) => {
        const t = res.data.data;
        // parse duration "6D/4N" → day, night
        const [day, night] = t.duration
          .split("/")
          .map((s) => s.replace(/[^\d]/g, ""));
        setForm({
          title: t.title,
          country: t.location,
          accommodation: t.accommodation || "",
          transportation: t.transportation || "",
          eat: t.eat || "",
          day,
          night,
          dateTrip: t.dateTrip ? t.dateTrip.split("T")[0] : "",
          price: t.price,
          quota: t.quota || "",
          description: t.description,
          image: t.image,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load trip data");
        navigate("/");
      });
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      image: form.image,
      price: Number(form.price),
      duration: `${form.day}D/${form.night}N`,
      location: form.country,
      accommodation: form.accommodation,
      transportation: form.transportation,
      eat: form.eat,
      dateTrip: form.dateTrip,
      quota: form.quota,
    };

    try {
      await axios.put(`http://localhost:3001/api/trips/${id}`, payload);
      alert("Trip updated successfully");
      navigate(`/detail-trip/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update trip");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#F1F1F1] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-black">Edit Trip</h1>
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
                required
                className="w-24 h-10 bg-gray-200 rounded px-3"
              />
              <span className="text-sm">Day</span>
              <input
                name="night"
                type="number"
                placeholder="Night"
                value={form.night}
                onChange={handleChange}
                required
                className="w-24 h-10 bg-gray-200 rounded px-3"
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
              required
              className="w-full h-10 bg-gray-200 rounded px-4"
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
              required
              className="w-full h-10 bg-gray-200 rounded px-4"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#FFAF00] hover:brightness-110 text-white px-6 py-2 rounded font-semibold transition"
            >
              {saving ? "Saving..." : "Save Changes"}
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

export default EditTrip;
