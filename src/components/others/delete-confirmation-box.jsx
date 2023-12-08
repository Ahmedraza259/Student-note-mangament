import React, { useCallback } from 'react';
import Swal from 'sweetalert2';

const DeleteConfirmationBox = ({ onDelete, onDeleteAll }) => {
  const handleDelete = useCallback(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: onDelete ? 'You will not be able to recover this item!' : 'This action will delete all items!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: onDelete ? 'Yes, delete it!' : 'Yes, delete all!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (onDelete) {
          onDelete();
          Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        } else {
          onDeleteAll();
          Swal.fire('Deleted All!', 'All items have been deleted.', 'success');
        }
      }
    });
  }, [onDelete, onDeleteAll]);

  return (
    <button className="btn btn-danger ml-2" onClick={handleDelete}>
      {onDelete ? 'Delete' : 'Delete All'}
    </button>
  );
};

export default DeleteConfirmationBox;
