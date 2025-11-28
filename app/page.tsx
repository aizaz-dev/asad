"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("Pro").select("*"); // your table
      console.log("Data:", data, "Error:", error); // Debug
      if (error) return;
      setProfiles(data);
    };
    fetchProfiles();
  }, []);

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Profiles Table
        </h1>
        <Link
          href="/add-post"
          className="bg-blue-500 text-white font-semibold px-5 py-2 rounded shadow hover:bg-blue-600 transition-colors"
        >
          + Add New Post
        </Link>
      </div>

      {/* Table */}
      {profiles.length === 0 ? (
        <div className="p-10 text-center text-gray-500 text-lg">
          No data found!
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  About
                </th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p, index) => (
                <tr
                  key={p.id}
                  className={
                    index % 2 === 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  <td className="border-b border-gray-200 px-6 py-3 text-gray-700">
                    {p.id}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-3 text-gray-700">
                    {p.name}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-3 text-gray-700">
                    {p.about}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
