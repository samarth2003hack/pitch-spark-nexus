import React, { useState } from 'react';
import { db } from '../firebase/config';
import { ref, push, set } from 'firebase/database';

const CreatePitch: React.FC = () => {
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    category: '',
    description: '',
    location: '',
    imageUrl: 'https://via.placeholder.com/400x200.png?text=Startup+Image',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Push the new pitch to Firebase Realtime Database
      const pitchRef = push(ref(db, 'pitches'));
      await set(pitchRef, {
        ...formData,
        createdAt: new Date().toISOString(), // Store the timestamp
      });

      setSuccess(true);
      setFormData({
        startupName: '',
        founderName: '',
        category: '',
        description: '',
        location: '',
      });
    } catch (err) {
      console.error('Error adding pitch: ', err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Startup Pitch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="startupName"
          placeholder="Startup Name"
          value={formData.startupName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="founderName"
          placeholder="Founder Name"
          value={formData.founderName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
        </select>
        <textarea
          name="description"
          placeholder="Pitch Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Submit Pitch'}
        </button>
        {success && <p className="text-green-600 mt-2">Pitch submitted successfully!</p>}
      </form>
    </div>
  );
};

export default CreatePitch;
