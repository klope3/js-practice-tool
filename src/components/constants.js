import { inlineCode } from "./utility";

export const alphabet = "abcdefghijklmnopqrstuvwxyz";

export const numberVariables = [
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

export const miscWords = [
    "hello",
    "nice",
    "code",
    "practice",
    "work",
    "ha",
    "yo",
];

export const pangramSentences = [
    "A quick brown fox jumps over the lazy dog",
];

export const operations = [
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

export const stringMethods = [
    {
        name: "startsWith",
        buildActionText: info => <span>check if the string starts with {inlineCode(`"${info.strToCheck}"`)}</span>,
        workLineStr: "const startsWith = str.*****(****);",
        checkAnswers: (fields, info) => {
            const regExp = new RegExp(`^("${info.strToCheck}"|'${info.strToCheck}')`);
            return fields.line1field0 === "startsWith" && fields.line1field1.match(regExp);
        }
    },
    {
        name: "endsWith",
        buildActionText: info => <span>check if the string ends with {inlineCode(`"${info.strToCheck}"`)}</span>,
        workLineStr: "const endsWith = str.*****(****);",
        checkAnswers: (fields, info) => {
            const regExp = new RegExp(`^("${info.strToCheck}"|'${info.strToCheck}')`);
            return fields.line1field0 === "endsWith" && fields.line1field1.match(regExp);
        }
    },
    {
        name: "replace",
        buildActionText: info => <span>replace the first {inlineCode(`"${info.strToReplace}"`)} in the string with {inlineCode(`"${info.replacementStr}"`)}</span>,
        workLineStr: "const replaced = str.*****(*****);",
        checkAnswers: (fields, info) => {
            const regexp = new RegExp(`^("${info.strToReplace}"|'${info.strToReplace}'),\\s?("${info.replacementStr}"|'${info.replacementStr}')$`);
            return fields.line1field0 === "replace" && fields.line1field1.match(regexp);
        }
    },
    {
        name: "toUpperCase",
        buildActionText: () => <span>make all letters in the string uppercase</span>,
        workLineStr: "const uppercase = str.*****();",
        checkAnswers: fields => fields.line1field0 === "toUpperCase",
    },
    {
        name: "toLowerCase",
        buildActionText: () => <span>make all letters in the string lowercase</span>,
        workLineStr: "const lowercase = str.*****();",
        checkAnswers: fields => fields.line1field0 === "toLowerCase",
    },
    {
        name: "repeat",
        buildActionText: info => <span>repeat the string {info.count} times</span>,
        workLineStr: "const repeated = str.*****(****);",
        checkAnswers: (fields, info) => fields.line1field0 === "repeat" && parseInt(fields.line1field1) === info.count,
    },
    {
        name: "indexOf",
        buildActionText: info => <span>find the index at which the first {inlineCode(`"${info.strToCheck}"`)} occurs</span>,
        workLineStr: "const index = str.*****(****);",
        checkAnswers: (fields, info) => {
            const regExp = new RegExp(`^('${info.strToCheck}'|"${info.strToCheck}")$`);
            return fields.line1field0 === "indexOf" && fields.line1field1.match(regExp);
        } 
    },
    // {
    //     name: "split",
    //     buildActionText: <span></span>,
    //     checkAnswers: fields => {},
    // },
]