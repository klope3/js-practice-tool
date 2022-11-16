import React from "react";
import ExerciseArea from "./components/ExerciseArea/ExerciseArea";
import { exerciseClasses } from "./components/exercises";

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            code: "",
            exercise: this.chooseRandomExercise(),
            fields: {},
            correctAnswer: undefined,
        };
    }

    chooseRandomExercise = () => new exerciseClasses[Math.floor(Math.random() * exerciseClasses.length)]();

    handleFieldChange = event => {
        const { name: sender, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            fields: {
                ...prevState.fields,
                [sender]: value,
            }
        }))
    }

    checkAnswers = () => {
        const result = this.state.exercise.checkAnswers(this.state.fields) ? true : false;
        this.setState(prevState => ({
            ...prevState,
            correctAnswer: result,
        }));
    }

    changeCode = code => {
        this.setState(prevState => ({
            ...prevState,
            code: code,
        }));
    }
    
    runCode = () => {
        let func;
        try {
            func = Function(this.state.code);
        } catch(err) {
            console.log("compile error: " + err.name);
        }
        let output;
        try {
            output = func();
        } catch(err) {
            console.log("Runtime error: " + err.name);
        }
        console.log(output);
    }

    randomizeExercise = () => {
        this.setState(prevState => ({
            ...prevState,
            exercise: this.chooseRandomExercise(),
            fields: {},
            correctAnswer: undefined,
        }));
    }

    render() {
        let evalMessage;
        if (this.state.correctAnswer !== undefined) {
            evalMessage = this.state.correctAnswer ? "Correct" : "Incorrect";
        }
        return (
            <div className="main">
                <ExerciseArea exercise={this.state.exercise} fields={this.state.fields} changeFieldFunction={this.handleFieldChange} checkAnswersFunction={this.checkAnswers} />
                {evalMessage && <div>{evalMessage}</div>}
                <button onClick={this.checkAnswers}>Check</button>
                <button onClick={this.randomizeExercise}>Random</button>
            </div>
        )
    }
}

export default MainPage;