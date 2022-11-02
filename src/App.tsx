import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {networkInterfaces} from "os";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState< Array<TaskType> >([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "graphQL", isDone: false},
    ]);
    // console.log(tasks);

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask (id: string) {
        let filteredTasks = tasks.filter( t  => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        debugger
        let task = tasks.find( t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        let copy = [...tasks]
        setTasks(copy)
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
            />
        </div>
    );
}

export default App;