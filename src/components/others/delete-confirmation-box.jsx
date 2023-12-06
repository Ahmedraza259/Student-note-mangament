// DeleteConfirmationDialog.js
import React from 'react';
import Swal from 'sweetalert2';

const DeleteConfirmationBox = ({ onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  };

  return (
    <button className="btn btn-danger ml-2" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteConfirmationBox;
