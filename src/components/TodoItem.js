import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const checked = todo.status === 'complete';
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = React.useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = React.useState(false);

  const handleCheck = () => {
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleFormatDate = (date) => {
    try {
      return format(new Date(date), 'p, MM/dd/yyyy');
    } catch (error) {
      console.error('Invalid date value:', date);
      return 'Invalid date';
    }
  };

  return (
    <>
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: 'var(--white)',
          marginBottom: '1.5rem',
          borderRadius: '4px',
        }}
        variants={child}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
          }}
        >
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                wordBreak: 'break-all',
                fontWeight: 500,
                fontSize: '1.4rem',
                color: 'black',
                textDecoration: todo.status === 'complete' ? 'line-through' : 'none',
                opacity: todo.status === 'complete' ? 0.7 : 1,
              }}
            >
              {todo.title}
            </p>
            <p
              style={{
                display: 'block',
                fontSize: '1.2rem',
                fontWeight: 300,
                marginTop: '-0.2rem',
                color: 'var(--black-2)',
              }}
            >
              {handleFormatDate(todo.time)}
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              padding: '0.5rem',
              borderRadius: '4px',
              backgroundColor: isHoveredDelete ? '#B0BEC5' : 'var(--gray-1)',
              color: 'var(--black-2)',
              cursor: 'pointer',
              transition: '0.3s ease background-color',
            }}
            onClick={handleDelete}
            onMouseEnter={() => setIsHoveredDelete(true)}
            onMouseLeave={() => setIsHoveredDelete(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
            tabIndex={0}
            role="button"
            aria-label="Delete todo"
          >
            <MdDelete />
          </div>
          <div
            style={{
              fontSize: '2rem',
              padding: '0.5rem',
              borderRadius: '4px',
              backgroundColor: isHoveredEdit ? '#B0BEC5' : 'var(--gray-1)',
              color: 'var(--black-2)',
              cursor: 'pointer',
              transition: '0.3s ease background-color',
            }}
            onClick={handleUpdate}
            onMouseEnter={() => setIsHoveredEdit(true)}
            onMouseLeave={() => setIsHoveredEdit(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
            tabIndex={0}
            role="button"
            aria-label="Edit todo"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal type="update" modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} todo={todo} />
    </>
  );
}

export default TodoItem;
