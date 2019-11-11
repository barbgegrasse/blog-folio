/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styled from '@emotion/styled'
import fonts from '../../styles/fonts'
import colors from '../../styles/colors'

const ContactWrapper = styled('div')`
  padding: 60px;
  position: absolute;
  width: 800px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
`

const Title = styled('h2')`
  margin: 0 0 40px 0;
  text-align: center;
  color: ${colors.pink900};
  font-family: ${fonts.IBM};
  font-weight: 200;
  font-style: italic;
  font-size: 80px;
  color: ${colors.pink900};
`
const InputTxt = styled('input')`
  display: block;
  width: 100%;
  height: 36px;
  border-width: 0 0 2px 0;
  border-color: ${colors.blue900};
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;

  &:focus {
    outline: none;
  }

  &:focus,
  &.not-empty {
    + .label {
      transform: translateY(-24px);
    }
  }
`

const Label = styled('label')`
  position: absolute;
  left: 20px;
  bottom: 11px;

  font-family: ${fonts.Share};
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;

  color: #888;
  cursor: text;
  transition: transform 0.2s ease-in-out;
`

const FormField = styled('div')`
  position: relative;
  margin: 32px 0;
`
const SubmitButton = styled('input')`
  display: inline-block;
  padding: 10px 15px;
  margin-top: 40px;

  font-family: ${fonts.Share};
  color: #fff;
  font-weight: 200;
  font-size: 18px;
  text-decoration: none;

  border: none;
  background: ${colors.blue900};
  transition: background-color 0.3s linear;
  &:hover {
    background-color: ${colors.pink900};
  }
`

const HandleKey = event => {
  // J'ajoute une classe si mon champ est vide yes
  const target = event.target

  if (target.value.trim()) {
    target.classList.add('not-empty')
  } else {
    target.classList.remove('not-empty')
  }
}

const SectionContact = () => {
  return (
    <div className="section section3 contact" data-anchor="contact">
      <ContactWrapper>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt
        alias quo obcaecati inventore pariatur eligendi omnis quis porro quam.
        Quas velit impedit, harum pariatur libero veniam fuga vel sint!
        {/* 
        <Title>Contact</Title>
        <form
          id="formContact"
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-contact" value="contact" />
          <FormField>
            <InputTxt
              id="name"
              className="input-text js-input"
              type="text"
              required
              onKeyUp={HandleKey}
            />
            <Label className="label" htmlFor="name">
              Nom
            </Label>
          </FormField>

          <FormField>
            <InputTxt onKeyUp={HandleKey} id="email" type="email" required />
            <Label className="label" htmlFor="email">
              E-mail
            </Label>
          </FormField>

          <FormField>
            <InputTxt onKeyUp={HandleKey} id="message" type="text" required />
            <Label className="label" htmlFor="message">
              Votre message
            </Label>
          </FormField>

          <FormField>
            <SubmitButton
              className="submit-btn"
              type="submit"
              value="Envoyer"
            />
          </FormField>
        </form>
        */}
      </ContactWrapper>
    </div>
  )
}

export default SectionContact
