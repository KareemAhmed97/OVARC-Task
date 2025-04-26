import { Card } from "../components/Shared/Card";
import Button from "../components/UI/Button";
import StoresData from "../components/Data/stores.json";
import AuthorsData from "../components/Data/authors.json";
import BooksData from "../components/Data/books.json";
import { useNavigate } from "react-router";
export default function Shop() {
  const navigate = useNavigate();
  const authorsWithBookCount = AuthorsData.map((author) => {
    const booksByAuthor = BooksData.filter(
      (book) => book.author_id === author.id
    );
    return {
      id: author.id,
      fullName: `${author.first_name} ${author.last_name}`,
      bookCount: booksByAuthor.length,
    };
  });
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

  return (
    <div className="flex flex-col gap-8">
      {/* STORES */}
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl">Browse by Stores</p>
          <Button onclick={() => console.log("click")} color={"bg-[#D86128]"}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-4 mt-6">
          {StoresData.slice(0, 3).map((store) => (
            <Card
              key={store.id}
              id={store.id}
              title={store.name}
              author={store.author}
              image={store.image}
              type={"store"}
            />
          ))}
        </div>
      </div>
      {/* AUTHORS */}
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl">Browse by Authors</p>
          <Button onclick={() => console.log("click")} color={"bg-[#D86128]"}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-4 mt-6">
          {authorsWithBookCount.slice(0, 3).map((author) => (
            <Card
              key={author.id}
              id={author.id}
              title={author.fullName}
              type={"author"}
              numberOfBooks={author.bookCount}
            />
          ))}
        </div>
      </div>
      {/* BOOKS */}
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl">Browse by Books</p>
          <Button onclick={() => navigate("books")} color={"bg-[#D86128]"}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-4 mt-6">
          {booksWithAuthorName.slice(0, 3).map((book) => (
            <Card
              key={book.id}
              title={book.bookName}
              id={book.id}
              author={book.authorName}
              bookName={book.bookName}
              type={"book"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
