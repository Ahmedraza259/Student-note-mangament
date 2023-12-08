import React, { useState, useEffect, useMemo } from "react";
import DeleteConfirmationBox from "../others/delete-confirmation-box";
import Filter from "../others/filter";
import CustomPagination from "../others/pagination";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LogOut from "../others/logout";
const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(ITEMS_PER_PAGE);
  const apiUrl = process.env.REACT_APP_URL;
  const accessToken = "Bearer " + localStorage.getItem("accessToken");
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    if (currentItems?.length > 0) {
      setSelectAll(!selectAll);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}note/list`, {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      });
      const fetchedData = await response.json();
      if (response.ok) {
        setData(fetchedData.notes);
        toast.success(`${fetchedData.message}`);
      } else {
        toast.error(`${fetchedData.message}`);
      }
    } catch (error) {
      toast.error("Error fetching the notes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}note/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
        },
      });
      const data = await response.json();

      if (response.ok) {
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting note:", error);
    }
  };
  const handleDeleteAll = async () => {
    try {
      const response = await fetch(`${apiUrl}note/delete-all`, {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting all notes:", error);
    }
  };
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * selectedFilter;
  const indexOfFirstItem = indexOfLastItem - selectedFilter;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = useMemo(() => {
    return Array.from(
      { length: Math.ceil(data.length / selectedFilter) },
      (_, i) => i + 1
    );
  }, [data.length, selectedFilter]);

  return (
    <div className="container mt-5">
      <Toaster />
      <LogOut />
      <h2 className="mb-4 text-success">Notes</h2>
      <Filter
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/add-note")}
      >
        Add Item
      </button>

      <table className="table table-striped">
        <thead className="thead-dark">
          {selectAll && (
            <th className="text-success">
              <DeleteConfirmationBox onDeleteAll={handleDeleteAll} />
            </th>
          )}
          <tr>
            <th className="text-success">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />{" "}
              Select All
            </th>

            <th className="text-success">ID</th>
            <th className="text-success">Name</th>
            <th className="text-success">Description</th>
            <th className="text-success">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems?.length > 0 ? (
            currentItems?.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </td>
                <td>{(currentPage - 1) * selectedFilter + index + 1}</td>{" "}
                <td>{item?.title}</td>
                <td>{item?.description}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate(`/edit-note/${item._id}`)}
                  >
                    Edit
                  </button>
                  <DeleteConfirmationBox onDelete={() => onDelete(item?._id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center font-weight-bold">
                There are no notes added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <CustomPagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Dashboard;
