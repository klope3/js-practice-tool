import React from "react";
import { exerciseClasses } from "../exercises";
import { getRandomFromArray } from "../utility";
import "./ExerciseArea.css";

class ExerciseArea extends React.Component {
    render() {
        const { exercise, fields, changeFieldFunction } = this.props;
        return (
            <div>
                <div className="exercise-prompt-container">
                    {exercise.buildPromptArea()}
                </div>
                <div className="exercise-work-container">
                    {exercise.buildWorkArea(fields, changeFieldFunction)}
                </div>
            </div>
        )
    }
}

export default ExerciseArea;