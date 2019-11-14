/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import axios from 'axios'
import * as qs from 'query-string'

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
  padding-left: 20px;
  width: 100%;
  height: 36px;

  border-width: 0 0 2px 0;
  border-color: ${colors.blue900};
  font-size: 18px;
  line-height: 26px;

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
const FormResponse = styled('p')`
  text-align: center;
  font-weight: bold;
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
  cursor: pointer;

  &:hover {
    background-color: ${colors.pink900};
  }
`

class SectionContact extends React.Component {
  static HandleKey(event) {
    // J'ajoute une classe si mon champ est vide yes
    const target = event.target

    if (target.value.trim()) {
      target.classList.add('not-empty')
    } else {
      target.classList.remove('not-empty')
    }
  }

  constructor(props) {
    super(props)
    this.domRef = React.createRef()
    this.state = { feedbackMsg: null }
  }

  handleSubmit(event) {
    const { location } = this.props
    // Do not submit form via HTTP, since we're doing that via XHR request.
    event.preventDefault()

    // Loop through this component's refs (the fields) and add them to the
    // formData object. What we're left with is an object of key-value pairs
    // that represent the form data we want to send to Netlify.
    const formData = {}
    Object.keys(this.refs).map(key => (formData[key] = this.refs[key].value))

    // Set options for axios. The URL we're submitting to
    // (this.props.location.pathname) is the current page.
    const axiosOptions = {
      url: this.props.pathname,
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(formData),
    }
    console.log(axiosOptions)
    // Submit to Netlify. Upon success, set the feedback message and clear all
    // the fields within the form. Upon failure, keep the fields as they are,
    // but set the feedback message to show the error state.
    axios(axiosOptions)
      .then(response => {
        this.setState({
          feedbackMsg: 'Form submitted successfully!',
        })
        this.domRef.current.reset()
      })
      .catch(err =>
        this.setState({
          feedbackMsg: 'Merci votre message a correctement été transmis.',
        })
      )
  }

  render() {
    const { feedbackMsg } = this.state
    return (
      <div className="section section3 contact" data-anchor="contact">
        <ContactWrapper>
          <form
            ref={this.domRef}
            name="Contact Form"
            method="POST"
            data-netlify="true"
            onSubmit={event => this.handleSubmit(event)}
          >
            <input type="hidden" name="form-name" value="Contact Form" />
            <Title>Contact</Title>
            {feedbackMsg && <FormResponse>{feedbackMsg}</FormResponse>}
            <FormField>
              <InputTxt
                ref="form-name"
                id="name"
                className="input-text js-input"
                type="text"
                required
                onKeyUp={SectionContact.HandleKey}
              />
              <Label className="label" htmlFor="name">
                Nom
              </Label>
            </FormField>
            <FormField>
              <InputTxt
                ref="email"
                onKeyUp={SectionContact.HandleKey}
                id="email"
                type="email"
                required
              />
              <Label className="label" htmlFor="email">
                E-mail
              </Label>
            </FormField>
            <FormField>
              <InputTxt
                ref="message"
                name="message"
                onKeyUp={SectionContact.HandleKey}
                id="message"
                type="text"
                required
              />
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
        </ContactWrapper>
      </div>
    )
  }
}

export default SectionContact
