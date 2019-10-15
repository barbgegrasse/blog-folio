import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import htmlSerializer from '../../utils/htmlSerializer'



export default ({slice}) => {
    const codeString = slice.primary.code_snippet[0].text;
    return(
        <div className="post-slice">
            <SyntaxHighlighter language="jsx" style={monokaiSublime}>
                {codeString}
            </SyntaxHighlighter>
        </div>
    )
}