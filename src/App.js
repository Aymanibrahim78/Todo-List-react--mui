import './App.css';
import TodoList from './components/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodoContext } from './Contexts/TodosContext';
import { useState } from 'react';

// OTHERS
import { v4 as uuidv4 } from 'uuid';



const theme = createTheme({
  typography: {
    fontFamily:[ "Alexandria" ]
  },
});
function App() {
  let intialTodos =[

   
  ]
  const[todos ,setTodos]=useState(intialTodos)
  return (
    <ThemeProvider theme={theme}>
    <TodoContext.Provider value={{todos:todos,setTodos:setTodos}}>
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#191b1f",minHeight:"100vh",fontFamily:"Alexandria"}}>
      <TodoList/>  
    </div>
    </TodoContext.Provider>
    </ThemeProvider>
  );
}

export default App;
