import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { addTodo, updateTodo } from '../slices/todoSlice';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState('');
  const [status, setStatus] = React.useState('incomplete');
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: format(new Date(), 'p, MM/dd/yyyy'),
          })
        );
        toast.success('Task added successfully');
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success('Task Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={{
              backgroundColor: 'var(--bg-2)',
              maxWidth: '500px',
              width: '90%',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              borderRadius: '8px',
              position: 'relative',
            }}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              style={{
                position: 'absolute',
                top: '-10px',
                right: 0,
                transform: 'translateY(-100%)',
                fontSize: '2.5rem',
                padding: '0.5rem',
                borderRadius: '4px',
                backgroundColor: isHovered ? 'red' : 'var(--gray-1)', // Change background color on hover
                color: 'var(--black-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.3s ease all',
              }}
              onClick={() => setModalOpen(false)}
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
              onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <h1
                style={{
                  color: '#444444',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  marginBottom: '2rem',
                  textTransform: 'uppercase',
                }}
              >
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title" style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem', color: '#707070' }}>
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    marginTop: '0.5rem',
                    marginBottom: '2rem',
                    width: '100%',
                    padding: '1rem',
                    border: 'none',
                    backgroundColor: 'var(--white)',
                    fontSize: '1.8rem',
                  }}
                />
              </label>
              <label htmlFor="type" style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem', color: '#707070' }}>
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    marginTop: '0.5rem',
                    marginBottom: '2rem',
                    width: '100%',
                    padding: '1rem',
                    border: 'none',
                    backgroundColor: 'var(--white)',
                    fontSize: '1.8rem',
                  }}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: '2rem',
                  gap: '1rem',
                }}
              >
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
