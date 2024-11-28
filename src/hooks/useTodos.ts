import { useCallback, useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../api";
import { Todo } from "../types";

export function useTodos() {
  const { data: todos = [], isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo, {isLoading : updateLoading}] = useUpdateTodoMutation();
  const [deleteTodo , {isLoading: deleteLoading}] = useDeleteTodoMutation();

  const [inputValue, setInputValue] = useState("");
  const [editTodoId, setEditTodoId] = useState<number | string | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleAddOrUpdateTodo = useCallback(async () => {
    if (inputValue.trim()) {
      if (editTodoId !== null) {
        await updateTodo({
          id: editTodoId,
          title: inputValue,
          completed: false,
        });
        setEditTodoId(null); 
      } else {
        // Create mode
        await addTodo({ title: inputValue, completed: false });
      }
      setInputValue(""); 
    }
  }, [inputValue, addTodo,editTodoId, updateTodo]);

  const handleEditClick = useCallback((todo: Todo) => {
    setInputValue(todo.title); 
    setEditTodoId(todo.id); 
  } , [setEditTodoId, setInputValue]);


  return {
    addTodo,
    updateTodo,
    deleteTodo,
    todos,
    isLoading,
    deleteLoading,
    updateLoading,
    inputValue,
    editTodoId,
    handleAddOrUpdateTodo,
    handleInputChange,
    handleEditClick
  }
}
