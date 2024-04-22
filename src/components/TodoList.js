
import React, { useState,useContext,useEffect } from 'react'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TodoContext } from '../Contexts/TodosContext';

//components
import Todo from './Todo';
// OTHERS
import { v4 as uuidv4 } from 'uuid';


const TodoList = () => {
const[displayedTodosType,setDisplayedTodosType]=useState("all")
const {todos,setTodos} = useContext(TodoContext)

  const[titleInput ,setTitleInput]=useState("")

    // filteration arrys
    const completedTodos=todos.filter((t)=>{return  t.isCompleted})
    
    const notCompletedTodos=todos.filter((t)=>{return  !t.isCompleted})

  let todosToRendered=todos
  if(displayedTodosType=="completed"){
    todosToRendered=completedTodos
  }
  else if(displayedTodosType=="non-completed"){
    todosToRendered=notCompletedTodos
  }
  else{
    todosToRendered=todos
  }

    const todoJSX =todosToRendered.map((t)=>{return( <Todo key={t.id}  todo={t}  /> )});

  
  useEffect(()=>{
     const storageTodos= JSON.parse(localStorage.getItem("todos")) ??[]
     setTodos(storageTodos)
    },[])

const changeDisplayedTodosType = (eo) => {
 setDisplayedTodosType(eo.target.value)
}

const handleAddClick = (eo) => {

  const newTodo={
    id:uuidv4(),
    title:titleInput,
    details:"",
    isCompleted : false
  }
  const updatedTodos= [...todos , newTodo]
  setTodos(updatedTodos)
  localStorage.setItem("todos",JSON.stringify(updatedTodos))
  setTitleInput("")

 
}



  return (
    <>
    
      <Container maxWidth="sm">

      <Card sx={{ minWidth: 275 ,marginTop:"30px"} }>
      <CardContent >

        <Typography variant='h2' component={"h2"} style={{fontWeight:"bold"}} >
          مهامى
        </Typography>
        <Divider style={{position:"relative",bottom:"15px"}}/>

        <ToggleButtonGroup
      color="primary"
      value={displayedTodosType}
      onChange={changeDisplayedTodosType}
      exclusive
      aria-label="Platform"
      style={{direction:"ltr",marginTop:"10px"}}
      
    >
      <ToggleButton onClick={()=>{}} value="non-completed" color='error'>غير المنجز</ToggleButton>
      <ToggleButton onClick={()=>{}} value="completed" color='success'>المنجز</ToggleButton>
      <ToggleButton onClick={()=>{}} value="all" color='secondary'>الكل</ToggleButton>
    </ToggleButtonGroup>

    {/* All Todos */}
   <div className='boxTodos'>
    {todoJSX}
   </div>
    
    {/* All Todos */}

    {/* INPUT ALL + ADD BTN */}


    <Grid container spacing={2} style={{marginTop:"10px"}}>
        <Grid xs={8}>

        <TextField value={titleInput} onChange={(eo)=>{setTitleInput(eo.target.value)}} style={{width:"100%"}} id="outlined-basic" label="عنوان المهمه" variant="outlined" />

        </Grid>

        <Grid  xs={4} display={'flex'} justifyContent={"space-around"} alignItems={"center"}>

        <Button type="submit" disabled={titleInput.length===0} style={{width:"100%",height:"100%"}} variant="contained" onClick={()=>{handleAddClick()}}>اضافة</Button>

        </Grid>

    </Grid>


      </CardContent>

    </Card>

    <div style={{ marginTop:"50px" ,marginBottom:"20px",height:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <p className='Copyright'>Copyright ©{new Date().getFullYear()} All rights reserved | This template is made with by <span className='nameDev'><a style={{all:"unset"}} href='https://www.facebook.com/AymanIbrahim.official'>Ayman Ibrahim</a></span></p>
    </div>
      </Container>

    </>
  )
}

export default TodoList

