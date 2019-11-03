import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import styled from '@emotion/styled'
import colors from 'styles/colors'

const CodeSnippet = styled('div')`
  display: block;
  margin: 40px -10%;
`

//import htmlSerializer from '../../utils/htmlSerializer'

export default ({ slice }) => {
  const codeString = slice.primary.code_snippet[0].text
  return (
    <CodeSnippet>
      <SyntaxHighlighter language="jsx" style={monokaiSublime}>
        {codeString}
      </SyntaxHighlighter>
    </CodeSnippet>
  )
}
