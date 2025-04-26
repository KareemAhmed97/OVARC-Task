import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useSort } from "@table-library/react-table-library/sort";
import {
  SelectTypes,
  useRowSelect,
} from "@table-library/react-table-library/select";
import { SortToggleType } from "@table-library/react-table-library/types";
import { FaSort } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Table({
  reports,
  columns,
  sortFns,
  height,
  onSelectChange,
  checked,
  borderBottom,
}) {
  const BASELINE_THEME = {
    Table: `
        display: grid;
        overflow: auto;
        position: relative;
        border-collapse: collapse;
         grid-template-columns:  ${checked ? "70px" : ""} repeat(${
      columns.length
    }, minmax(0, 1fr));
      `,
    BaseRow: `
        font-size: 16px;
      `,
    Row: `
        font-size: 14px;
        &:not(:last-of-type) > .td {
          border-bottom: ${borderBottom ? borderBottom : "1"}px solid #D9D9D9;
        }
      
      `,
    BaseCell: `
        padding: 15px 20px;
        height: ${height ? height : "60"}px;
        cursor:pointer;
      `,
    HeaderCell: `
        font-weight: bold;
        border-bottom: 1px solid #D9D9D9;
        height: 50px;
       
       
      `,
  };
  //--------------------sorting --------------------
  const sort = useSort(
    reports,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        margin: "0px",
        iconDefault: <FaSort />,
        iconUp: <TiArrowSortedUp />,
        iconDown: <TiArrowSortedDown />,
      },
      sortToggleType: SortToggleType.AlternateWithReset,

      sortFns: sortFns,
    }
  );
  function onSortChange(action, state) {
    console.log(action, state);
  }
  //------------paginations------------
  const pagination = usePagination(reports, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });
  function onPaginationChange(action, state) {}
  //-----------------------------------------------
  const startIndex = pagination.state.page * pagination.state.size + 1;
  const endIndex = Math.min(
    (pagination.state.page + 1) * pagination.state.size,
    reports.nodes?.length
  );
  const currentPage = pagination.state.page;
  const totalPages = pagination.state.getTotalPages(reports.nodes);
  function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    pagination.fns.onSetPage(pageNumber - 1);
  }
  const select = useRowSelect(
    reports,
    {
      onChange: onSelectChange,
    },
    {
      rowSelect: SelectTypes.MultiSelect,
      buttonSelect: SelectTypes.MultiSelect,
    }
  );

  return (
    <div className="w-full">
      <div className="rounded-md overflow-hidden">
        <CompactTable
          columns={columns}
          data={reports}
          theme={BASELINE_THEME}
          pagination={pagination}
          sort={sort}
          select={select}
        />
      </div>

      {/* Pagination */}
      <div className="flex  justify-end mt-5 ">
        <div className="flex items-center  rounded-lg  w-[300px] bg-white ">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 0}
            className="disabled:opacity-50 size-10 flex  items-center justify-center border-r-2"
          >
            <LuChevronFirst className="text-xl" />
          </button>
          <button
            onClick={() => goToPage(currentPage)}
            disabled={currentPage === 0}
            className="disabled:opacity-50 size-10 flex  items-center justify-center border-r-2"
          >
            <BiChevronLeft className="text-xl" />
          </button>

          <span className="text-sm text-gray-600 border-r-2 w-[150px] h-full flex justify-center items-center">
            {startIndex} - {endIndex} of {reports.nodes.length}
          </span>

          <button
            onClick={() => goToPage(currentPage + 2)}
            disabled={currentPage === totalPages - 1}
            className="disabled:opacity-50 size-10 flex  items-center justify-center border-r-2"
          >
            <BiChevronRight className="text-xl" />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages - 1}
            className="disabled:opacity-50 size-10 flex  items-center justify-center "
          >
            <LuChevronLast className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
