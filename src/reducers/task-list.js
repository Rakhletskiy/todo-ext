const initialState = {
  currentTasks: null
};

export default function taskList (state = initialState, action) {
  switch(action.type) {
    case 'FETCH_TASK_DATA':
      return {
        ...state,
        currentTasks: action.tasks
      }
    case 'ADD_TASK':
      return {
        ...state,
        currentTasks: action.tasks
      }
    case 'DEL_TASK':
      return {
        ...state,
        currentTasks: action.tasks
      }
    case 'EDIT_TASK':
      return {
        ...state,
        currentTasks: action.tasks
      }
    default:
      return state;
  }
}