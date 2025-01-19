import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(Number(localStorage.getItem("page")) || 1);
  const [size, setSize] = useState(Number(localStorage.getItem("size")) || 10);
  const [sort, setSort] = useState(
    localStorage.getItem("sort") || "-published_at",
  );
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [page, size, sort]);

  useEffect(() => {
    // Simpan pengaturan di localStorage
    localStorage.setItem("page", page);
    localStorage.setItem("size", size);
    localStorage.setItem("sort", sort);
  }, [page, size, sort]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://suitmedia-backend.suitdev.com/api/ideas",
        {
          params: {
            "page[number]": page,
            "page[size]": size,
            append: ["small_image", "medium_image"],
            sort: sort,
          },
        },
      );
      setPosts(response.data.data);
      setTotalPages(response.data.meta.last_page);
      setPaginationLinks(response.data.meta.links);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeChange = (e) => {
    setSize(Number(e.target.value));
    setPage(1); // Reset ke halaman 1 saat ukuran per halaman berubah
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1); // Reset ke halaman 1 saat pengurutan berubah
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://i.pinimg.com/736x/12/6a/65/126a656375ba45ac458c44a8fe2ce1c8.jpg";
  };

  return (
    <div className="container mx-auto p-4">
      {/* Sort and Items per Page Selection */}
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Sort by:</label>
          <select value={sort} onChange={handleSortChange}>
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Items per page:</label>
          <select value={size} onChange={handleSizeChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      {/* Post List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const imageUrl =
              post.medium_image[0]?.url ||
              "https://i.pinimg.com/736x/12/6a/65/126a656375ba45ac458c44a8fe2ce1c8.jpg";

            const formattedDate = format(
              new Date(post.created_at),
              "d MMMM yyyy",
            );

            return (
              <div
                key={post.id}
                className="card bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="p-4">
                  <p className="text-xs text-gray-400">{formattedDate}</p>
                  <h3 className="text-lg font-semibold line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{post.excerpt}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        {/* Prev button */}
        {paginationLinks[0]?.url && (
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`p-2 rounded-full ${
              page === 1 ? "text-gray-400" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaChevronLeft size={18} />
          </button>
        )}

        {/* Page numbers */}
        {paginationLinks.slice(1, paginationLinks.length - 1).map((link) => (
          <button
            key={link.label}
            onClick={() => handlePageChange(Number(link.label))}
            className={`px-3 py-1 rounded-md ${
              link.active
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </button>
        ))}

        {/* Next button */}
        {paginationLinks[paginationLinks.length - 1]?.url && (
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`p-2 rounded-full ${
              page === totalPages
                ? "text-gray-400"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <FaChevronRight size={18} />
          </button>
        )}
      </div>{" "}
    </div>
  );
};

export default PostList;
