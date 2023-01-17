import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {networkInterfaces} from "os";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {todolistAPI} from "./api/todolist-api";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
    id: string;
    title: string;
    filter?: FilterValuesType;
    addedDate?: string
    order?: number
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                debugger
                let todos = res.data
                dispatch(setTodolistsAC(todos))
            })
    },[])

    console.log("App is called")
    const dispatch = useDispatch()
    //tasks functions
    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch]);
    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch]);
    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatch(action);
    }, [dispatch]);
    const changeTaskTitle = useCallback((taskId: string, newValue: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newValue, todolistId);
        dispatch(action);
    }, [dispatch]);

    //todolist functions
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    }, [dispatch]);
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: "10px"}}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;