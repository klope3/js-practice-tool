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

const operations = [
    {
        symbol: "+",
        resultWord: "sum",
        doCalculation: (num1, num2) => num1 + num2,
        buildPhrase: (str1, str2) => <span>{inlineCode(str1)} plus {inlineCode(str2)}</span>,
    },
    {
        symbol: "-",
        resultWord: "difference",
        doCalculation: (num1, num2) => num1 - num2,
        buildPhrase: (str1, str2) => <span>{inlineCode(str1)} minus {inlineCode(str2)}</span>,
    },
    {
        symbol: "*",
        resultWord: "product",
        doCalculation: (num1, num2) => num1 * num2,
        buildPhrase: (str1, str2) => <span>{inlineCode(str1)} times {inlineCode(str2)}</span>,
    },
    {
        symbol: "/",
        resultWord: "quotient",
        doCalculation: (num1, num2) => num1 / num2,
        buildPhrase: (str1, str2) => <span>{inlineCode(str1)} divided by {inlineCode(str2)}</span>,
    },
    {
        symbol: "%",
        resultWord: "remainder",
        doCalculation: (num1, num2) => num1 % num2,
        buildPhrase: (str1, str2) => <span>the remainder of {inlineCode(str1)} divided by {inlineCode(str2)}</span>,
    },
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

export class AssignSingleVariableExercise {
    constructor() {
        this.var1 = getRandomFromArray(numberVariables);
        this.value1 = getRandomNumber();
    }

    checkAnswers = fields => fields.line0field0 === this.var1 && fields.line0field1 == this.value1;

    buildPromptArea = () => {
        return (
            <div>
                Create a variable {inlineCode(this.var1)} and assign it the value {inlineCode(this.value1)}.
            </div>
        );
    }

    buildWorkArea = (fields, changeFieldFunction) => {
        const lines = [ "var ***** = ****" ];
        return buildWorkLines(lines, fields, changeFieldFunction);
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
        const { 
            line0field0,
            line0field1,
            line1field0,
            line1field1,
            line2field0,
            line2field1,
            line2field2,
        } = fields;
        const { var1, var2, value1, value2, operator } = this;
        return (
            (
                (line0field0 === var1 && line0field1 == value1 && line1field0 === var2 && line1field1 == value2) ||
                (line0field0 === var2 && line0field1 == value2 && line1field0 === var1 && line1field1 == value1)
            ) && 
            (
                (line2field0 === var1 && line2field2 === var2) || 
                (line2field0 === var2 && line2field2 === var1)
            ) &&
            line2field1 === operator
        );
    }

    buildPromptArea = () => {
        return (
            <div>
                Create two variables, {inlineCode(this.var1)} and {inlineCode(this.var2)}, and assign them the values {inlineCode(this.value1)} and {inlineCode(this.value2)}, respectively. Then use their names to add them together.
            </div>
        )
    }

    buildWorkArea = (fields, changeFieldFunction) => {
        const lines = [
            "var ***** = ****",
            "var ***** = ****",
            "var sum = ***** *** ******",
        ];

        return buildWorkLines(lines, fields, changeFieldFunction);
    }
}

export class SimpleOperatorExercise {
    constructor() {
        //Calculate "[[var1]] plus [[number1]]" and assign the result to "sum".
        //Calculate "[[var1]] minus [[number1]]" and assign the result to "difference".
        //Calculate "[[var1]] times [[number1]]" and assign the result to "product".
        //Calculate "[[var1]] divided by [[number1]]" and assign the result to "quotient".
        //Calculate the remainder of [[var1]] divided by [[number1]] and assign the result to "remainder".
        this.variable = getRandomFromArray(numberVariables);
        this.number = getRandomNumber();
        this.operation = getRandomFromArray(operations);
    }

    checkAnswers = fields => fields.line0field0 === this.operation.resultWord &&  fields.line0field1 === this.operation.symbol;

    buildPromptArea = () => {
        return (
            <div>
                Calculate "{this.operation.buildPhrase(this.variable, this.number)}" and assign the result to {inlineCode(this.operation.resultWord)}.
            </div>
        )
    }

    buildWorkArea = (fields, changeFieldFunction) => {
        const lines = [ `var ***** = ${this.variable} *** ${this.number}` ];
        return buildWorkLines(lines, fields, changeFieldFunction);
    }
}

export class SimpleAssignmentOperatorExercise {
    constructor() {
        this.variable = getRandomFromArray(numberVariables);
        this.number = getRandomNumber();
        this.operation = getRandomFromArray(operations);
    }

    checkAnswers = fields => fields.line0field0 === `${this.operation.symbol}=`;

    buildPromptArea = () => {
        return (
            <div>
                Use the correct operator to calculate {this.operation.buildPhrase(this.variable, this.number)} and immediately assign the result to {inlineCode(this.variable)}.
            </div>
        )
    }

    buildWorkArea = (fields, changeFieldFunction) => {
        const lines = [ `${this.variable} *** ${this.number}` ];
        return buildWorkLines(lines, fields, changeFieldFunction);
    }
}

export const exerciseClasses = [
    AssignSingleVariableExercise, 
    AssignUseTwoVariablesExercise,
    SimpleOperatorExercise,
    SimpleAssignmentOperatorExercise,
];

export const chooseRandomExercise = () => new exerciseClasses[Math.floor(Math.random() * exerciseClasses.length)]();

// export class EXERCISE_TEMPLATE {
//     constructor() {

//     }

//     checkAnswers = fields => {}

//     buildPromptArea = () => {
//         return (
//             <div></div>
//         )
//     }

//     buildWorkArea = (fields, changeFieldFunction) => {
//         const lines = [ "" ];
//         return buildWorkLines(lines, fields, changeFieldFunction);
//     }
// }

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