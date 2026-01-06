export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    people: [],
    planets: [],
    vehicles :[],
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){


    // 1. Generic action to save people, planets, or vehicles
    case 'set_data':
      return {
        ...store,
        [action.resource]: action.payload
      };

    // 2. Add to favorites and save to localStorage
    case 'add_favorite':
      // Prevent duplicates
      if (store.favorites.find(fav => fav.uid === action.payload.uid)) return store;
      
      const updatedAdd = [...store.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedAdd)); // Store Storage
      return {
        ...store,
        favorites: updatedAdd
      };

    // 3. Remove from favorites
    case 'remove_favorite':
      const updatedRemove = store.favorites.filter(fav => fav.uid !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(updatedRemove)); // Store Storage
      return {
        ...store,
        favorites: updatedRemove
      };
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
