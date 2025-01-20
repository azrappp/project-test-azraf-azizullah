import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../../components/Card"; // Import komponen Card

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
  const [meta, setMeta] = useState(null);

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
      setMeta(response.data.meta);
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
    <div className="mx-auto py-6 px-6 max-w-[1080px]">
      {/* Sort and Items per Page Selection */}
      <div className="flex justify-between items-center mb-8 px-4">
        {/* Showing info */}
        <div className="text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {(page - 1) * size + 1}
          </span>
          -
          <span className="font-medium text-gray-700">
            {Math.min(page * size, 274)}
          </span>{" "}
          of
          <span className="font-medium text-gray-700"> 274</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor="items-per-page"
              className="text-sm font-medium text-gray-600"
            >
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={size}
              onChange={handleSizeChange}
              className="px-5 py-2 text-sm bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          {/* Sort by */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-by"
              className="text-sm font-medium text-gray-600"
            >
              Sort by:
            </label>
            <select
              id="sort-by"
              value={sort}
              onChange={handleSortChange}
              className="px-5 py-2 text-sm bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
        {/* Items per page */}
      </div>
      {/* Post List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-16">
          {Array(size)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-48 bg-gray-300"></div>

                {/* Content Skeleton */}
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>{" "}
                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>{" "}
                  {/* Excerpt Skeleton */}
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>{" "}
                  {/* Date Skeleton */}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-16">
          {posts.map((post) => {
            const imageUrl =
              post.medium_image[0]?.url ||
              "https://i.pinimg.com/736x/12/6a/65/126a656375ba45ac458c44a8fe2ce1c8.jpg";

            const formattedDate = format(
              new Date(post.created_at),
              "d MMMM yyyy",
            );

            return (
              <Card
                key={post.id}
                imageUrl={imageUrl}
                formattedDate={formattedDate}
                title={post.title}
                excerpt={post.excerpt}
                onError={handleImageError}
              />
            );
          })}
        </div>
      )}
      {/* Pagination */}
      <div className="my-10 flex justify-center items-center space-x-2 mx-auto">
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
      </div>
    </div>
  );
};

export default PostList;
