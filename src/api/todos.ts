import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types';


// @IMPORTANT NOTE : Because Jsonplaceholder doesn't mutate data directly I plan to update the cache based on the edited data
// @IMPORTANT NOTE : In a real scenario we use ProvideTags and invalidateTags to refetch the data on mutate success

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: ['Todos'],
    }),


    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            draft.unshift({ ...newTodo, id: Date.now() }); 
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
              const index = draft.findIndex((todo) => todo.id === newTodo.id);
              if (index !== -1) draft[index] = data; 
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),



    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      async onQueryStarted(updatedTodo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const index = draft.findIndex((todo) => todo.id === updatedTodo.id);
            if (index !== -1) draft[index] = updatedTodo;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),




    deleteTodo: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            return draft.filter((todo) => todo.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),



  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
