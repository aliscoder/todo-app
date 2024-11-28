import React, { memo } from 'react';
import { Box, IconButton, ListItem, Checkbox, ListItemText, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Todo } from '../types';
import { useTodos } from '../hooks/useTodos';


interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const {updateTodo , deleteTodo , deleteLoading} = useTodos()

  const handleToggle = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Checkbox checked={todo.completed} onChange={handleToggle} />
      <ListItemText
        primary={todo.title}
        sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
      <Box display="flex" gap={1}>
        <IconButton color="primary" onClick={() => onEdit(todo)}>
          <EditIcon />
        </IconButton>
        {deleteLoading ? <CircularProgress size={12} /> : <IconButton color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>}
      </Box>
    </ListItem>
  );
};

export default memo(TodoItem);
