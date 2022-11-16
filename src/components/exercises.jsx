import { buildWorkLines, getRandomFromArray, getRandomNumber } from "./utility";

const numberVariables = [
    "apples",
    "oranges",
    "cars",
    "bikes",
    "items",
    "units",
    "marbles",
    "itemCount",
    "friendCount",
    "messageCount",
    "index",
    "edgeCount",
];

const inlineCode = text => <span className="code-inline">{text}</span>
const simpleFieldCheck = (fields, answers) => {
    if (Object.keys(fields).length === 0) return false;
    for (let key in fields) {
        console.log("Comparing " + fields[key] + " with " + answers[key]);
        if (fields[key] != answers[key]) return false;
    }
    return true;
}
// const field = (name, value, onChange, classes) => <input type="text" value={value || ""} name={name} onChange={onChange} className={classes} />
// const exerciseInputLine = content => <div className="exercise-input-line">{content}</div>

export class AssignSingleVariableExercise {
    constructor() {
        this.var1 = getRandomFromArray(numberVariables);
        this.value1 = getRandomNumber();
        this.answers = {
            f00: this.var1,
            f01: this.value1,
        };
    }

    checkAnswers = fields => simpleFieldCheck(fields, this.answers);

    renderPromptArea = () => {
        return (
            <div>
                Create a variable {inlineCode(this.var1)} and assign it the value {inlineCode(this.value1)}.
            </div>
        );
    }

    renderWorkArea = (fields, changeFieldFunction) => {
        const lines = [ "var ***** = ****" ];
        return (
            <div>
                {buildWorkLines(lines, fields, changeFieldFunction)}
                {/* {exerciseInputLine(<div>var {field("var1", fields.var1, changeFieldFunction)} = {field("value1", fields.value1, changeFieldFunction)};</div>)} */}
            </div>
        );
    }
}

export class AssignUseTwoVariablesExercise {
    constructor() {
        this.var1 = getRandomFromArray(numberVariables);
        this.var2 = getRandomFromArray(numberVariables);
        this.value1 = getRandomNumber();
        this.value2 = getRandomNumber();
        this.operator = "+";
    }

    checkAnswers = fields => {
        const { f00, f01, f10, f11, f20, f21, f22 } = fields;
        const { var1, var2, value1, value2, operator } = this;
        return (
            (
                (f00 === var1 && f01 == value1 && f10 === var2 && f11 == value2) ||
                (f00 === var2 && f01 == value2 && f10 === var1 && f11 == value1)
            ) && 
            (
                (f20 === var1 && f22 === var2) || 
                (f20 === var2 && f22 === var1)
            ) &&
            f21 === operator
        );
    }

    renderPromptArea = () => {
        return (
            <div>
                Create two variables, {inlineCode(this.var1)} and {inlineCode(this.var2)}, and assign them the values {inlineCode(this.value1)} and {inlineCode(this.value2)}, respectively. Then use their names to add them together.
            </div>
        )
    }

    renderWorkArea = (fields, changeFieldFunction) => {
        const lines = [
            "var ***** = ****",
            "var ***** = ****",
            "var sum = ***** *** ******",
        ];

        return (
            <div>
                {buildWorkLines(lines, fields, changeFieldFunction)}
                {/* {exerciseInputLine(<div>var {field("f1", fields.f1, changeFieldFunction)} = {field("f2", fields.f2, changeFieldFunction, "input-small")};</div>)}
                {exerciseInputLine(<div>var {field("f3", fields.f3, changeFieldFunction)} = {field("f4", fields.f4, changeFieldFunction, "input-small")};</div>)}
                {exerciseInputLine(<div>var sum = {field("f5", fields.f5, changeFieldFunction)} {field("f6", fields.f6, changeFieldFunction, "input-micro")} {field("f7", fields.f7, changeFieldFunction)};</div>)} */}
            </div>
        )
    }
}

export const testExerciseData = {

}

export const exerciseClasses = [
    AssignSingleVariableExercise, 
    AssignUseTwoVariablesExercise,
];

//vvvv old data structure
// export const exerciseTypes = [
//     {
//         name: "Assign Single Variable",
//         topics: ["Variables"],
//         render: () => {
//             return (
//                 <div>
//                     <div className="exercise-instruction-text">
//                         Create a variable <span className="code-inline">num</span> and assign it the value <span className="code-inline">15</span>.
//                     </div>
//                     <div className="exercise-code-area">
//                         <div className="exercise-input-line">
//                             var <input type="text" size={inputFieldSmallSize} /> = <input type="text" size={inputFieldTinySize} />
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//     },
//     {
//         name: "Assign and Use Two Variables",
//         topics: ["Variables", "Operators"],
//         render: () => {
//             return (
//                 <div>
//                     <div className="exercise-instruction-text">
//                         Create two variables, <span className="code-inline">apples</span> and <span className="code-inline">oranges</span>, and assign them the values <span className="code-inline">14</span> and <span className="code-inline">64</span>, respectively. Then use their names to add them together.
//                     </div>
//                     <div className="exercise-code-area">
//                         <div className="exercise-input-line">
//                             var <input type="text" size={inputFieldSmallSize} /> = <input type="text" size={inputFieldTinySize} />;
//                         </div>
//                         <div className="exercise-input-line">
//                             var <input type="text" size={inputFieldSmallSize} /> = <input type="text" size={inputFieldTinySize} />;
//                         </div>
//                         <div className="exercise-input-line">
//                             var sum = <input type="text" size={inputFieldTinySize} /> <input type="text" size={inputFieldMicroSize} /> <input type="text" size={inputFieldTinySize} />;
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//     }
// ];