const singleWorkLine = (line, lineIndex, fieldValues, changeFieldFunction) => {
    const chunks = line.split(/(\*{3,})/g);
    const elements = [];
    let fieldCounter = 0;
    for (let i in chunks) {
        let chunk = chunks[i];
        if (chunk.startsWith("***")) {
            let className;
            if (chunk === "***") className = "input-micro";
            if (chunk === "****") className = "input-small";
            const fieldName = `f${lineIndex}${fieldCounter}`;
            elements.push(<input key={i} name={fieldName} type="text" className={className} value={fieldValues[fieldName] || ""} onChange={changeFieldFunction} />);
            fieldCounter++;
        }
        else elements.push(chunk);
    }
    return <div key={lineIndex} className="exercise-input-line">{elements}</div>;
}

export const getRandomFromArray = array => array && array.length > 0 ? array[Math.floor(Math.random() * array.length)] : undefined;
//^^^NEEDS the ability to exclude some values. Otherwise exercises can ask you to make 2 variables with same name.
export const getRandomNumber = () => Math.floor(Math.random() * 100);
export const buildWorkLines = (lines, fieldValues, changeFieldFunction) => {
    return lines.map((line, index) => singleWorkLine(line, index, fieldValues, changeFieldFunction));
}