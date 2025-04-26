import Search from "../components/UI/Search";
import BooksData from "../components/Data/books.json";
import StoresData from "../components/Data/stores.json";
import AuthorsData from "../components/Data/authors.json";
import { Card } from "../components/Shared/Card";
import { useEffect, useState } from "react";
export default function ShopBooks() {
  const [loading, setLoading] = useState(false);
  const booksWithAuthorName = BooksData.map((book) => {
    const author = AuthorsData.find((author) => author.id === book.author_id);
    return {
      id: book.id,
      bookName: book.name,
      authorName: author
        ? `${author.first_name} ${author.last_name}`
        : "Unknown Author",
    };
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.title = "BOOK WORLD | Shop Books";
  }, []);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTimeout(() => setLoading(false), 500);
    }, 1000);
    // Clean up timeout if the component unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium">Browse Books</p>
        <Search pathToSearch={"shop/books"} />
      </div>
      <div className="flex items-center gap-6 p-4 ">
        {/* Author Filter */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#3E435D]">Author</span>
          <select className="rounded-md  px-3 py-2 bg-white outline-none">
            {AuthorsData.map((author, index) => (
              <>
                {index === 0 ? (
                  <option key={0} value={"All"} selected>
                    All
                  </option>
                ) : null}
                <option key={author.id} value={author.id}>
                  {author.first_name} {author.last_name}
                </option>
              </>
            ))}
          </select>
        </div>

        {/* Store Filter */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#3E435D]">Store</span>
          <select className="rounded-md  px-3 py-2 bg-white outline-none">
            {StoresData.map((store, index) => (
              <>
                {index === 0 ? (
                  <option key={0} value={"All"} selected>
                    All
                  </option>
                ) : null}
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              </>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#3E435D]">Sort by</span>
          <select className="rounded-md  px-3 py-2 bg-white outline-none">
            <option>Least Price</option>
            <option>Highest Price</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
      {/* books */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-4 mt-6">
        {booksWithAuthorName.slice(0, 20).map((book) => (
          <Card
            key={book.id}
            title={book.bookName.slice(0, 30) + "..."}
            id={book.id}
            author={book.authorName}
            bookName={book.bookName.slice(0, 20) + "..."}
            type={"book"}
          />
        ))}
      </div>
    </>
  );
}
