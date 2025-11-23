// app/page.tsx
import { client } from "../sanity/lib/client";
import {urlFor} from "../sanity/lib/image";
interface Author {
  name: string;
  image?: {
    asset: { _ref: string; _type: string; url?: string };
  };
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  mainImage?: {
    asset: { _ref: string; _type: string; url?: string };
    alt?: string;
  };
  author?: Author;
}

export default async function Page() {
  // Fetch blogs from Sanity
  const blogs: Blog[] = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      description,
      publishedAt,
      mainImage{
        asset->{_id,url},
        alt
      },
      author->{name, image{asset->{_id,url}}}
    }
  `);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Our Latest Blogs
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {blog.mainImage?.asset && (
                <img
                  src={urlFor(blog.mainImage).width(600).height(400).url()}
                  alt={blog.mainImage.alt || blog.title}
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {blog.description}
                </p>

                <div className="flex items-center mt-4">
                  {blog.author?.image?.asset && (
                    <img
                      src={urlFor(blog.author.image).width(40).height(40).url()}
                      alt={blog.author.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  )}
                  <div>
                    <p className="text-gray-900 font-semibold">
                      {blog.author?.name || "Unknown Author"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
