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

function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
}

class SectionContact extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isValidated: false }
    }

    handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
        }),
    })
        .then(() => navigate(form.getAttribute('action')))
        .catch(error => alert(error))
    }

  render() {
    <section className="section">
        <div className="container">
            <div className="content">
              <h1>Contact</h1>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'name'}>
                    Your name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'name'}
                      onChange={this.handleChange}
                      id={'name'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'message'}>
                    Message
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
    </section>
    )
  }
}

export default SectionContact
