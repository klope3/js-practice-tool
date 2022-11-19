import { buildWorkLines, getOrdinal, getRandomFromArray, getRandomLetter, getRandomNumber, inlineCode } from "./utility";
import { numberVariables, pangramSentences, stringMethods, operations } from "./constants";



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

export class ObjectPropertiesExercise {
    constructor() {
        this.propertyName1 = getRandomFromArray(numberVariables);
        this.propertyName2 = getRandomFromArray(numberVariables);
        this.propertyValue1 = getRandomNumber();
        this.propertyValue2 = getRandomNumber();
    }

    checkAnswers = fields => {
        const {
            propertyName1,
            propertyName2,
            propertyValue1,
            propertyValue2,
        } = this;
        const reg1 = new RegExp(`^${propertyName1}:\\s?${propertyValue1},$`);
        const reg2 = new RegExp(`^${propertyName2}:\\s?${propertyValue2},?$`);
        return fields.line0field0 === "myObject" && fields.line1field0.match(reg1) && fields.line2field0.match(reg2);
    }

    buildPromptArea = () => {
        return (
            <div>
                Create an object {inlineCode("myObject")} with the following properties.
                <ul>
                    <li>{inlineCode(this.propertyName1)} with the value {inlineCode(this.propertyValue1)}.</li>
                    <li>{inlineCode(this.propertyName2)} with the value {inlineCode(this.propertyValue2)}.</li>
                </ul>
            </div>
        )
    }

    buildWorkArea = (fields, changeFieldFunction) => {
        const lines = [ 
            "const ***** = {",
            ">>>******",
            ">>>******",
            "}",
        ];
        return buildWorkLines(lines, fields, changeFieldFunction);
    }
}

export class SimpleArrayExercise {
    constructor() {
        this.getting = Math.random() > 0.5;
        this.index = getRandomNumber();
        this.value = getRandomNumber();
    }

    checkAnswers = fields => {
        const accessStr = `nums[${this.index}]`;
        if (this.getting) return fields.line0field0 === "x" && fields.line0field1 === accessStr;
        else return fields.line0field0 === accessStr && fields.line0field1 == this.value;
    }

    buildPromptArea = () => {
        return this.getting ? 
            <div>Get the {getOrdinal(this.index + 1)} value in the {inlineCode("nums")} array and assign it to {inlineCode("x")}.</div> :
            <div>Set the {getOrdinal(this.index + 1)} value of the {inlineCode("nums")} array to {inlineCode(this.value)}.</div>
    }

    buildWorkArea = (fields, changeFieldFunction) => {
        const lines = this.getting ? 
            [ "const **** = *****" ] :
            [ "***** = ***" ];
        return buildWorkLines(lines, fields, changeFieldFunction);
    }
}

export class StringMethodsExercise {
    constructor() {
        this.stringMethod = getRandomFromArray(stringMethods);
        const { name } = this.stringMethod;
        this.sentence = getRandomFromArray(pangramSentences);
        this.info = {
            strToReplace: name === "replace" ? getRandomLetter() : undefined,
            replacementStr: name === "replace" ? getRandomLetter() : undefined,
            strToCheck: name === "startsWith" || name === "endsWith" ? getRandomLetter() : undefined,
        }
    }

    checkAnswers = fields => this.stringMethod.checkAnswers(fields, this.info);

    buildPromptArea = () => {
        return (
            <div>Use a string method to {this.stringMethod.buildActionText(this.info)}.</div>
        )
    }

    buildWorkArea = (fields, changeFieldFunction) => {
        const lines = [ 
            `const str = "${this.sentence}."`,
            this.stringMethod.workLineStr 
        ];
        return buildWorkLines(lines, fields, changeFieldFunction);
    }
}

export const exerciseClasses = [
    // AssignSingleVariableExercise, 
    // AssignUseTwoVariablesExercise,
    // SimpleOperatorExercise,
    // SimpleAssignmentOperatorExercise,
    // ObjectPropertiesExercise,
    // SimpleArrayExercise,
    StringMethodsExercise,
];

export const chooseRandomExercise = () => new exerciseClasses[Math.floor(Math.random() * exerciseClasses.length)]();

// export class EXERCISE_TEMPLATE {
//     constructor() {

//     }

//     static getMetadata = () => {}

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