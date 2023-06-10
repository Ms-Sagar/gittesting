import Todo from './components/Todo';
import { useReducer,useState } from "react";



function App() {
  let InitialTodos = [
    {
      id: 1,
      title: "Set Todos",
      complete: false,
    }
    
  ];
  const AddTodo = (title) => {
     dispatch({ type: "ADD",title:title })
  }
  const DeleteTodo =(id) =>{
    dispatch({type :"DELETE",id:id})
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case "COMPLETE":
        return state.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, complete: !todo.complete };
          } else {
            return todo;
          }
        });

        case "ADD":
          return [...state,{
            id: state.length+1,
            title: action.title,
            complete: false,
          }];
        case "DELETE":
          return state.filter(todo => todo.id !== action.id)
      default:
        return state;
    }
  };
  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };
  const [Todos, dispatch] = useReducer(reducer, InitialTodos);
  const [Title,settitle]  = useState("");
  return (
    <div>
      <h1>My Todos</h1>
      <input type ='text' height='50px' value={Title}  onChange={(e)=>{settitle(e.target.value)}}></input>
      <button className='btn' onClick={() => {AddTodo(Title)} }>Add</button>
      <br/>
      {Todos.map((todo)=> {
        return(
          
        <Todo key={todo.id} text={todo.title} id={todo.id} delete={DeleteTodo}/>
        )
      })}
    </div>
  );
}

export default App;
