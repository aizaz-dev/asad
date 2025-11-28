"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddPost() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !about) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.from("Pro").insert([{ name, about }]);
    setLoading(false);

    if (error) {
      console.log(error);
      setMessage("Error adding post");
    } else {
      setMessage("Post added successfully!");
      // small delay to show message before redirect
      setTimeout(() => {
        router.push("/"); // redirect to home page
      }, 1000);
    }
  };

  return (
    <div className="p-10 min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Add New Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter about info"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-600 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Post"}
          </button>

          {message && (
            <p
              className={`text-center mt-4 font-medium ${
                message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
