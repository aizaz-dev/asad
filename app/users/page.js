"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UsersDashboard() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
      return;
    }
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    let imageUrl = "";

    if (file) {
      // Upload image
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("image")
        .upload(`public/${Date.now()}_${file.name}`, file);

      if (uploadError) return setMessage(uploadError.message);

      // Get public URL
      const { data } = supabase.storage.from("image").getPublicUrl(uploadData.path);
      imageUrl = data.publicUrl;
    }

    // Insert into DB
    const { error } = await supabase.from("users").insert([
      { name, about, img: imageUrl }
    ]);

    if (error) return setMessage(error.message);

    setMessage("User added successfully!");
    setName("");
    setAbout("");
    setFile(null);

    // Refresh list
    fetchUsers();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Users Dashboard</h1>

      {/* Add User Form */}
      <div className="max-w-md mx-auto mb-10 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-2 text-center">{message}</p>}
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length === 0 && <p>No users found</p>}

        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded shadow p-4 flex flex-col items-center"
          >
            {user.img ? (
              <img
                src={user.img}
                alt={user.name}
                className="w-32 h-32 object-cover rounded-full mb-3"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                No Image
              </div>
            )}
            <h2 className="font-bold text-lg">{user.name || "Unnamed"}</h2>
            <p className="text-gray-600 text-center">{user.about || "No info"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
