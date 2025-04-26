import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFormik } from "formik";
import Search from "../components/UI/Search";
import Button from "../components/UI/Button";
import Table from "../components/layout/Table/NewTable";
import Authors from "../components/Data/authors.json";
import NewAuthorModal from "../components/layout/Modals/Modal";
import { Input } from "../components/UI/Input";

export default function Author() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [title, setTitle] = useState("New Author");
  const formik = useFormik({
    initialValues: {
      authorName: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const openModal = () => {
    setIsOpen(true);
    setTitle("New Author");
    formik.resetForm();
  };

  const handleSubmit = () => {
    formik.resetForm();
    setSelectedItem(null);
    setIsOpen(false);
  };

  const [authors, setAuthors] = useState({
    nodes: Authors,
  });

  const COLUMNS = [
    {
      label: "Author ID",
      renderCell: (item) => "#" + item?.id,
      sort: { sortKey: "ID" },
      select: true,
    },
    {
      label: "Name",
      renderCell: (item) => item?.first_name + " " + item?.last_name,
    },
    {
      label: "Actions",
      renderCell: (item) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="text-sm bg-main size-12 flex justify-center items-center rounded-md"
          >
            <FiEdit2 className="text-white text-xl" />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="text-sm bg-main size-12 flex justify-center items-center rounded-md"
          >
            <RiDeleteBin6Line className="text-white text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    formik.setValues({
      authorName: `${item.first_name} ${item.last_name}`,
    });
    setIsOpen(true);
  };

  const handleDelete = (item) => {
    console.log("DeleteId", item.id);
  };

  const sortFns = {
    Name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Book World - Authors List";
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-4">
          <p className="text-2xl font-medium">Authors List</p>
          <Search pathToSearch={"author"} />
        </div>
        <Button
          color={"bg-[#D86128]"}
          onclick={() => {
            setSelectedItem(null);
            formik.resetForm();
            openModal();
          }}
        >
          Add New Author
        </Button>
      </div>

      <div className="mt-10">
        <Table columns={COLUMNS} reports={authors} sortFns={sortFns} checked />
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
          className="flex flex-col gap-4 w-full"
        >
          <Input
            type="text"
            onchange={formik.handleChange}
            value={formik.values.authorName}
            name="authorName"
            label="Author Name"
            placeHolder="Enter Author Full Name"
          />
        </form>
      </NewAuthorModal>
    </>
  );
}
