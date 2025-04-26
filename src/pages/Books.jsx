import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Search from "../components/UI/Search";
import Button from "../components/UI/Button";
import Table from "../components/layout/Table/NewTable";
import BooksData from "../components/Data/books.json";
import AuthorsData from "../components/Data/authors.json";
import NewAuthorModal from "../components/layout/Modals/Modal";
import { Input } from "../components/UI/Input";

export default function Books() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [title, setTitle] = useState("New Book");
  const formik = useFormik({
    initialValues: {
      bookName: "",
      page_count: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const openModal = () => {
    setIsOpen(true);
    setTitle("New Book");
    formik.resetForm();
  };
  const handleSubmit = () => {
    formik.resetForm();
    setSelectedBook(null);
    setIsOpen(false);
    setTitle("New Book");
  };

  const booksWithAuthorName = BooksData.map((book) => {
    const author = AuthorsData.find((author) => author.id === book.author_id);
    return {
      id: book.id,
      bookName: book.name,
      page_count: book.page_count,
      authorName: author
        ? `${author.first_name} ${author.last_name}`
        : "Unknown Author",
    };
  });
  const [books, setBooks] = useState({
    nodes: booksWithAuthorName,
  });

  const COLUMNS = [
    {
      label: "Book ID",
      renderCell: (item) => "#" + item?.id,
      sort: { sortKey: "ID" },
      select: true,
    },
    {
      label: "Name",
      renderCell: (item) => item?.bookName,
    },
    {
      label: "Pages",
      renderCell: (item) => item.page_count,
    },
    {
      label: "Author Name",
      renderCell: (item) => item.authorName,
    },
    {
      label: "Actions",
      renderCell: (item) => (
        <div className="flex gap-2">
          <button
            onClick={() => onSelectChange({ payload: item })}
            className=" text-sm bg-main size-12 flex justify-center items-center rounded-md"
          >
            <FiEdit2 className="text-white text-xl" />
          </button>
          <button
            onClick={() => onSelectChange({ payload: item })}
            className=" text-sm bg-main size-12 flex justify-center items-center rounded-md"
          >
            <RiDeleteBin6Line className="text-white text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const sortFns = {
    Name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
  };

  function onSelectChange(action) {
    const book = action.payload;
    setTitle("Edit Book");
    setSelectedBook(book);
    formik.setValues({
      bookName: book.bookName || "",
      page_count: book.page_count || "",
      author_id: book.author_id || "",
    });
    setIsOpen(true);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Book World - Books List  ";
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-4">
          <p className="text-2xl font-medium">Books List</p>
          <Search pathToSearch={"books"} />
        </div>
        <Button color={"bg-[#D86128]"} onclick={() => openModal()}>
          Add New Book
        </Button>
      </div>

      <div className=" mt-10">
        <Table columns={COLUMNS} reports={books} sortFns={sortFns} checked />
      </div>
      <NewAuthorModal
        title={title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={() => {
          handleSubmit();
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full pb-6"
        >
          <Input
            type="text"
            onchange={formik.handleChange}
            value={formik.values.bookName}
            name="bookName"
            label="Book Name"
            placeHolder="Enter Book Name"
          />
          <Input
            type="number"
            onchange={formik.handleChange}
            value={formik.values.page_count}
            min={0}
            name="page_count"
            label="Number of Pages"
            placeHolder="Enter Number of Pages"
          />
          <div className="flex flex-col gap-2">
            <span className="">Author</span>
            <select
              className="rounded-md bg-[#FAFAFA] border border-[#13131340] py-3 px-6 outline-none"
              name="author_id"
              value={formik.values.author_id}
              onChange={formik.handleChange}
            >
              <option value="">Select Author</option>
              {AuthorsData.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.first_name} {author.last_name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </NewAuthorModal>
    </>
  );
}
