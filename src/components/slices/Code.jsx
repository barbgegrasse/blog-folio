import React from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styled from '@emotion/styled'

const CodeSnippet = styled('div')`
  display: block;
  max-width: 1440px;
  margin: 40px -10%;
`
export default function Code({ slice }) {
  const codeString = slice.primary.code_snippet[0].text
  return (
    <CodeSnippet>
      <SyntaxHighlighter language="jsx" style={monokaiSublime}>
        {codeString}
      </SyntaxHighlighter>
    </CodeSnippet>
  )
}

Code.propTypes = {
  slice: PropTypes.element.isRequired,
}
