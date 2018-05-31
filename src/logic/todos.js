export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';
export const TOGGLE_ITEM = 'qgo/assessment/TOGGLE_ITEM';
export const ACTIVE_ITEM = 'qgo/assessment/ACTIVE_ITEM';
export const ITEMS_COMPLETED = 'qgo/assessment/ITEMS_COMPLETED';

export const addItem = (content) => {
  return { type: ADD_ITEM, content };
};
export const deleteItem = (id) => {
  return { type: DELETE_ITEM, id };
};
export const toggleItem = (id) => {
  return { type: TOGGLE_ITEM, id };
};
export const itemsCompleted = (id) => {
  return { type: ITEMS_COMPLETED, id };
};
export const itemsActive = (id) => {
  return { type: ACTIVE_ITEM, id };
};

export const initialState = {
  items: [
    { id: 1, content: 'Call mum', completed: false },
    { id: 2, content: 'Buy cat food', completed: false},
    { id: 3, content: 'Water the plants', completed: false},
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };

    case DELETE_ITEM:
      const newItems = state.items.filter(todo => todo.id !== action.id);
      return { ...state, items: newItems};

    case TOGGLE_ITEM:
      const res = state.items.map(todo => (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo);
      return { ...state, items: res};

    case ACTIVE_ITEM:
      const activeItem = state.items.filter(todo => todo.completed === false);
      return { ...state, items: activeItem};

    case ITEMS_COMPLETED:
      const completedItem = state.items.filter(todo => todo.completed === true);
      return { ...state, items: completedItem};

    default:
      return state;
  }
};

export default reducer;
