export interface Todo {
    id: number | string;
    title: string;
    completed: boolean;
  }
  
  export interface TodosState {
    todos: Todo[];
  }
  