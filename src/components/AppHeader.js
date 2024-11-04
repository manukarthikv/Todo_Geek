import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import TodoModal from './TodoModal';
import { updateFilterStatus, toggleModal } from '../slices/todoSlice';

function AppHeader() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.todo.modalOpen);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem', // Small gap between buttons and task container
      }}
    >
      <Button variant="primary" onClick={() => dispatch(toggleModal())}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={updateFilter}
        value={filterStatus}
        style={{
          marginLeft: '0.5rem',
          padding: '0.8rem 1.5rem', // Adjust padding to fit text better
          borderRadius: '6px',
          backgroundColor: '#cccccc', // Light gray background
          fontSize: '1.6rem',
          cursor: 'pointer',
          width: '150px', // Slightly increased width to accommodate options
          textAlign: 'left', // Left align text for better visibility
        }}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoModal
        type="add"
        modalOpen={modalOpen}
        setModalOpen={() => dispatch(toggleModal())}
      />
    </div>
  );
}

export default AppHeader;