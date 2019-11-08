import React from 'react'
import styled from '@emotion/styled'

const BlockSpan = styled('div')`
  margin: 40px 0 40px;
  transform: translateX(-100%);
  .item {
    display: block;
    width: 88px;
    height: 4px;
    border-radius: 5px;
    background-color: #ce265d;
    &:first-child {
      margin-bottom: 14px;
    }
    &:last-child {
      margin-left: 54px;
    }
  }
`

const SectionContact = () => {
  return (
    <div id="contact" className="section section3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel eum ut
      dicta illo aspernatur ipsam minima aliquam esse dolor maxime
      exercitationem, praesentium velit doloribus cumque nemo. Reprehenderit,
      corrupti autem.
    </div>
  )
}

export default SectionContact
