// EditModal.js
import React, { useState } from 'react';

const EditModal = ({ item, onSave, onClose }) => {
  const [newName, setNewName] = useState(item.name);
  const [newDescription, setNewDescription] = useState(item.description);

  const handleSave = () => {
    onSave(item.id, newName, newDescription);
    onClose();
  };

  return (
    <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Edit Item</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="editName">Name</label>
                <input type="text" className="form-control" id="editName" value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="editDescription">Description</label>
                <input type="text" className="form-control" id="editDescription" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
