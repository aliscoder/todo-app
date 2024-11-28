import React from "react";
import {
  Box,
  List,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";

const TodoList: React.FC = () => {
  const {
    todos,
    isLoading,
    handleEditClick,
    inputValue,
    handleAddOrUpdateTodo,
    handleInputChange,
    editTodoId,
  } = useTodos();

  return (
    <Box>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo or edit an existing one"
          size="small"
        />
        <Button
          variant="contained"
          color={editTodoId !== null ? "secondary" : "primary"}
          onClick={handleAddOrUpdateTodo}
        >
          {editTodoId !== null ? "Update" : "Add"}
        </Button>
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onEdit={handleEditClick} />
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default TodoList;
