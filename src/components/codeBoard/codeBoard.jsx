import React from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
const CodeBoard = (props) => {
    let codeContent = JSON.stringify(props.option, null, 4)
    return (
        <AceEditor
            mode="java"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            readOnly='true'
            value={codeContent}
            width='100%'
            height='100%'
            editorProps={{ $blockScrolling: true }}
        />
    )

}

export default CodeBoard
