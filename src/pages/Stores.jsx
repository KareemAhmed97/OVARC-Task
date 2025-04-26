import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFormik } from "formik";
import Search from "../components/UI/Search";
import Button from "../components/UI/Button";
import Table from "../components/layout/Table/NewTable";
import StoresData from "../components/Data/stores.json";
import NewAuthorModal from "../components/layout/Modals/Modal";
import { Input } from "../components/UI/Input";

export default function Stories() {
  const [isOpen, setIsOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      storeName: "",
      storeAddress: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const openModal = () => setIsOpen(true);
  const handleSubmit = () => {
    formik.resetForm();
    setIsOpen(false);
  };
  const [stores, setStores] = useState({
    nodes: StoresData,
  });

  const COLUMNS = [
    {
      label: "Store ID",
      renderCell: (item) => "#" + item?.id,
      sort: { sortKey: "ID" },
      select: true,
    },
    {
      label: "Name",
      renderCell: (item) => item?.name,
    },
    {
      label: "Address",
      renderCell: (item) =>
        item.address_1 +
        " , " +
        item.state +
        ", " +
        item.city +
        "  " +
        item.zip,
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
  function onSelectChange(action, state) {
    // navigate(`${action?.payload?.id}`);
    console.log("id", state);
    // console.log("action", action?.payload?.id);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Book World - Stores List  ";
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-4">
          <p className="text-2xl font-medium">Stores List</p>
          <Search pathToSearch={"stores"} />
        </div>
        <Button color={"bg-[#D86128]"} onclick={openModal}>
          Add New Store
        </Button>
      </div>

      <div className=" mt-10">
        <Table
          columns={COLUMNS}
          reports={stores}
          sortFns={sortFns}
          onSelectChange={onSelectChange}
          checked
        />
      </div>

      <NewAuthorModal
        title={"New Store"}
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
            value={formik.values.storeName}
            name="storeName"
            label="Store Name"
            placeHolder="Enter Store Name"
          />
          <Input
            type="text"
            onchange={formik.handleChange}
            value={formik.values.storeAddress}
            name="storeAddress"
            label="Store Address"
            placeHolder="Enter Store Address"
          />
        </form>
      </NewAuthorModal>
    </>
  );
}
