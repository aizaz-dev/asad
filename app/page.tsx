import Head from "next/head";

const blogs = [
  {
    id: 1,
    title: "My First Blog Post",
    description: "This is a short description of my first blog post.",
    date: "Nov 23, 2025",
  },
  {
    id: 2,
    title: "Next.js + Tailwind Tips",
    description: "Tips and tricks for building websites with Next.js and Tailwind CSS.",
    date: "Nov 22, 2025",
  },
  {
    id: 3,
    title: "Learning Web Development",
    description: "How to start learning web development from scratch.",
    date: "Nov 20, 2025",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Simple Blog</title>
      </Head>

      {/* Header */}
      <header className="bg-purple-600 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">My Simple Blog</h1>
          <p className="mt-2">All in one page blog using Next.js & Tailwind CSS</p>
        </div>
      </header>

      {/* Blog Section */}
      <main className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <p className="text-sm text-gray-400">{blog.date}</p>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Read More
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 My Simple Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
