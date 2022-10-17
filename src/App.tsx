import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    const tasks2 = [
        {id: 1, title: "Happy Birthday!", isDone: false},
        {id: 2, title: "Smells like teen spirit", isDone: true},
        {id: 3, title: "u mad!", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks1}/>
            <TodoList title={'Songs'} tasks={tasks2}/>
        </div>
    );
}

export default App;
