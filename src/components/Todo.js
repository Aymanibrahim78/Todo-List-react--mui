import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { TodoContext } from '../Contexts/TodosContext';



// ICONS
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';



const Todo = ({todo}) => {


 const {todos,setTodos} = useContext(TodoContext)
const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [showUpdateDialog, setShowUpdateDialog] = useState(false);
const [updatedTodo,setUpdatedTodo] =useState({title:todo.title,details:todo.details})
// EVVENT HANDLERS
const handleCheckClick = () => {


    const updatedTodos = todos.map((t)=>{
      if(t.id===todo.id){
        t.isCompleted=! t.isCompleted
      }

      return t
    })
   setTodos(updatedTodos)
   localStorage.setItem("todos",JSON.stringify(updatedTodos))

  
}

const handleDeleteClick = () => {
  setShowDeleteDialog(true)
}

const handleDeleteColseClick = () => {
  setShowDeleteDialog(false)
  
}
const handleDeleteConfirm = () => {
  const updatedTodos =todos.filter((t)=>{
    if(t.id==todo.id){
      return false
    }
    else{
      return true
    }
  })
  setTodos(updatedTodos)
  localStorage.setItem("todos",JSON.stringify(updatedTodos))

}     

const handleUpdateClick = () => {
  setShowUpdateDialog(true)
}

const handleUpdateColseClick = () => {
  setShowUpdateDialog(false)
  
}

const handleUpdateConfirm = () => {
  const updatedTodos =todos.map((t)=>{
    if(t.id==todo.id){
      return {...t, title:updatedTodo.title,details:updatedTodo.details}
    }
    else{
      return t
    }
  })
  setTodos(updatedTodos)
  setShowUpdateDialog(false)
  localStorage.setItem("todos",JSON.stringify(updatedTodos))


}

// EVVENT HANDLERS

  return (
    <>

    {/* DELET DIALOG */}


      <Dialog
        onClose={handleDeleteColseClick}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك فى حذف المهمه ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteColseClick} >اغلاق </Button>
          <Button onClick={()=>{handleDeleteConfirm()}}  autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
    {/*====// DELET DIALOG //====*/}
    {/* UPDDATE DIALOG */}
    <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateColseClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>تعديل المهمه</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"  
            id="name"
            name="email"
            label="عنوان المهمه"          
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(eo)=>{setUpdatedTodo({...updatedTodo,title:eo.target.value})}}
          />
            <TextField
            autoFocus
            margin="dense"  
            id="name"
            name="email"
            label="التفاصيل "         
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(eo)=>{setUpdatedTodo({...updatedTodo,details:eo.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleUpdateColseClick()}}>اغلاق</Button>
          <Button onClick={()=>{handleUpdateConfirm()}} >تاكيد</Button>
        </DialogActions>
      </Dialog>
    {/* UPDDATE DIALOG */}


     <Card className='cordBox' sx={{ minWidth: 275 ,backgroundColor:"#283593",color:"white",marginTop:5 ,marginLeft:2,marginRight:2} }>
      <CardContent>

        <Grid container spacing={2}>
        <Grid xs={7}>
        <Typography variant='h5' component={"h5"} sx={{textAlign:"right",textDecoration:todo.isCompleted?"line-through":"none",wordWrap:"break-word"}} >
       {todo.title}
        </Typography>
        <Typography variant='p' component={"p"} sx={{textAlign:"right" ,wordWrap:"break-word" ,display:todo.isCompleted?"none":""}} >
        {todo.details}
        </Typography>
        </Grid>
        <Grid  xs={5} display={'flex'} justifyContent={"space-around"} alignItems={"center"} >

          {/* CHECK ICON BUTTON */}
        <IconButton onClick={() =>{handleCheckClick()}} className='iconBtn' aria-label="delete" style={{color: todo.isCompleted? "white":"#8bc34a",backgroundColor:todo.isCompleted?"#8bc34a": "white",border:"3px solid #8bc34a",}}>
          <CheckIcon />
        </IconButton> 
          {/*===// CHECK ICON BUTTON //===*/}

        {/* ICON BUTTON UPDATE */}
        <IconButton onClick={handleUpdateClick} className='iconBtn' aria-label="delete" style={{color:"#1769aa",backgroundColor:"white",border:"3px solid #1769aa", }}>
          <EditOutlinedIcon />
        </IconButton> 
          {/*===// CHECK ICON UPDATE //===*/}

        {/* ICON BUTTON DELETE */}
        <IconButton  onClick={()=>{handleDeleteClick()}} className='iconBtn' aria-label="delete" style={{color:"#b23c17",backgroundColor:"white",border:"3px solid #b23c17", }}>
          <DeleteOutlineOutlinedIcon />
        </IconButton> 
        {/*======// ICON BUTTON DELETE //============*/}

        
        </Grid>

      </Grid>
      

      </CardContent>

    </Card> 
    </>
  )
}

export default Todo
