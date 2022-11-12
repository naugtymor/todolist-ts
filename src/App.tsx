import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {networkInterfaces} from "os";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    //tasks functions
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasksObj({...tasksObj});
    }
    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasksObj({...tasksObj})
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            tasksObj[todolistId] = tasks;
            setTasksObj({...tasksObj})
        }
    }
    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newValue;
            tasksObj[todolistId] = tasks;
            setTasksObj({...tasksObj})
        }
    }

    //todolists functions
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find((tl) => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
        }
        setTodolists([...todolists])
    }
    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    }
    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }
    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])
    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "graphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Notebook", isDone: true},
            {id: v1(), title: "Mouse", isDone: true},
        ],
    })


    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
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
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
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

export default App;