// const singleWorkLine = (line, lineIndex, fieldValues, changeFieldFunction) => {
//     const chunks = line.split(/(\*{3,})/g);
//     const elements = [];
//     let fieldCounter = 0;
//     for (let i in chunks) {
//         let chunk = chunks[i];
//         if (chunk.startsWith("***")) {
//             let className;
//             if (chunk === "***") className = "input-micro";
//             if (chunk === "****") className = "input-small";
//             const fieldName = `f${lineIndex}${fieldCounter}`;
//             elements.push(<input key={i} name={fieldName} type="text" className={className} value={fieldValues[fieldName] || ""} onChange={changeFieldFunction} />);
//             fieldCounter++;
//         }
//         else elements.push(chunk);
//     }
//     return <div key={lineIndex} className="exercise-input-line">{elements}</div>;
// }

import { alphabet } from "./constants";

export const inlineCode = text => <span className="code-inline">{text}</span>;

export const buildWorkLines = (lines, fields, changeFieldFunction) => {
    //LOTS OF REFACTORING NEEDED
    return lines.map((line, lineIndex) => {
        let indentClass;
        if (line.startsWith(">>>")) indentClass = `indent-${line.match(/>>>/g).length}`;
        const cleaned = line.replace(/>/g, "");
        const chunks = cleaned.split(/(\*{3,})/g);
        let fieldCounter = 0;
        return (
            <div key={lineIndex} className={`exercise-input-line ${indentClass}`}>
                {chunks.map((chunk, chunkIndex) => {
                    if (chunk.startsWith("***")) {
                        let className;
                        if (chunk === "***") className = "input-micro";
                        if (chunk === "****") className = "input-small";
                        if (chunk.length > 5) className = "input-long";
                        const fieldName = `line${lineIndex}field${fieldCounter++}`;
                        return <input key={chunkIndex} className={className} type="text" name={fieldName} value={fields[fieldName] || ""} onChange={changeFieldFunction} /> 
                    } 
                    return <span key={chunkIndex}>{chunk}</span>;
                })}
            </div>
        );
    });
}

export const getOrdinal = number => {
    //1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, 13th 14th 15th 16th 17th 18th 19th 20th 21st 22nd 23rd 24th 25th 
    let ending = "th";
    const remainder = number % 10;
    if (number !== 11 && remainder === 1) ending = "st";
    if (number !== 12 && remainder === 2) ending = "nd";
    if (number !== 13 && remainder === 3) ending = "rd";
    return `${number}${ending}`;
}






export const getRandomFromArray = array => array && array.length > 0 ? array[Math.floor(Math.random() * array.length)] : undefined;
//^^^NEEDS the ability to exclude some values. Otherwise exercises can ask you to make 2 variables with same name.
export const getRandomNumber = (min = 0, max = 100) => Math.floor(Math.random() * (max - min) + min);
export const getRandomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)];
// export const buildWorkLines = (lines, fieldValues, changeFieldFunction) => {
//     return lines.map((line, index) => singleWorkLine(line, index, fieldValues, changeFieldFunction));
// }