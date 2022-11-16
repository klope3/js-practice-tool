import { useEffect, useRef } from "react";
import {CodeJar} from 'https://medv.io/codejar/codejar.js';

export const MyFunctionalComponent = props => {
    const editor = useRef(null);
    useEffect(() => {
        const jar = CodeJar(editor.current, function() {});
        jar.onUpdate(props.onChangeCode);
    }, []);

    return (
        <div>
            <div ref={editor} style={{backgroundColor: "lightgray", height: "400px"}}></div>
        </div>
    ) 
}