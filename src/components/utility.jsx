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

export const buildWorkLines = (lines, fields, changeFieldFunction) => {
    //LOTS OF REFACTORING NEEDED
    console.log("received: ");
    console.log(fields);
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






export const getRandomFromArray = array => array && array.length > 0 ? array[Math.floor(Math.random() * array.length)] : undefined;
//^^^NEEDS the ability to exclude some values. Otherwise exercises can ask you to make 2 variables with same name.
export const getRandomNumber = () => Math.floor(Math.random() * 100);
// export const buildWorkLines = (lines, fieldValues, changeFieldFunction) => {
//     return lines.map((line, index) => singleWorkLine(line, index, fieldValues, changeFieldFunction));
// }