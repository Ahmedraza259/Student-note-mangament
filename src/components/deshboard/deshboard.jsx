import React, { useState } from 'react';
import DeleteConfirmationBox from '../others/delete-confirmation-box';
import Filter from '../others/filter';
import CustomPagination from '../others/pagination';

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
    
    const initialData = [
        { id: 1, name: 'Item 1', description: 'Description 1' },
        { id: 2, name: 'Item 2', description: 'Description 2' },
        { id: 3, name: 'Item 3', description: 'Description 3' },
        { id: 4, name: 'Item 4', description: 'Description 4' },
        { id: 5, name: 'Item 5', description: 'Description 5' },
        { id: 6, name: 'Item 6', description: 'Description 6' },
        { id: 7, name: 'Item 7', description: 'Description 7' },
        { id: 8, name: 'Item 8', description: 'Description 8' },
        { id: 9, name: 'Item 9', description: 'Description 9' },
        { id: 10, name: 'Item 10', description: 'Description 10' },
        { id: 11, name: 'Item 11', description: 'Description 11' },
        { id: 12, name: 'Item 12', description: 'Description 12' },
        { id: 13, name: 'Item 13', description: 'Description 13' },
        { id: 14, name: 'Item 14', description: 'Description 14' },

    ];

    const [data, setData] = useState(initialData);
    const [editingItem, setEditingItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState(ITEMS_PER_PAGE);

    const handleAdd = () => {
        const newItem = { id: Date.now(), name: 'New Item', description: 'New Description' };
        setData([...data, newItem]);
    };

    const handleEdit = (id) => {
        setEditingItem(id);
    };

    const handleSave = (id, newName, newDescription) => {
        const updatedData = data.map((item) =>
            item.id === id ? { ...item, name: newName, description: newDescription } : item
        );
        setData(updatedData);
        setEditingItem(null);
    };

    const onDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * selectedFilter;
    const indexOfFirstItem = indexOfLastItem - selectedFilter;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = Array.from({ length: Math.ceil(data.length / selectedFilter) }, (_, i) => i + 1);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Notes</h2>
            <Filter selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
            <button className="btn btn-success mb-3" onClick={handleAdd}>
                Add Item
            </button>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                {editingItem === item.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={item.name}
                                        onChange={(e) => handleSave(item.id, e.target.value, item.description)}
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td>
                                {editingItem === item.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={item.description}
                                        onChange={(e) => handleSave(item.id, item.name, e.target.value)}
                                    />
                                ) : (
                                    item.description
                                )}
                            </td>
                            <td>
                                {editingItem === item.id ? (
                                    <button className="btn btn-primary" onClick={() => handleSave(item.id, item.name, item.description)}>
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>
                                            Edit
                                        </button>
                                        <DeleteConfirmationBox onDelete={() => onDelete(item.id)} />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CustomPagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />    </div>
    );
};

export default Dashboard;
