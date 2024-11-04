import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// Inline styles for the container and empty message
const styles = {
  contentWrapper: {
    maxWidth: '750px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#f0f4f8',
    padding: '2rem',
    borderRadius: '12px',
  },
  emptyText: {
    fontSize: '1.6rem',
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    margin: '0 auto',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    backgroundColor: '#d3d3d3',
    width: 'max-content',
    height: 'auto',
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      style={styles.contentWrapper} // Apply inline styles here
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} /> // No parentheses around this line
          ))
        ) : (
          <motion.p variants={child} style={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
