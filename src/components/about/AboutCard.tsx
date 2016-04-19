import * as React from 'react'

class AboutCard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='jumbotron'>
        <h1 className='display-4'>Solar Nets</h1>
        <p className='lead'>This is a simple program unit that helps to analyze and monitoring solar power via Petri Nets.</p>
        <hr className='m-y-2'/>
        <p>It uses modern technologies such as React, Koa, Webpack, ES6 and others.</p>
        <p>Main Developer: <strong>Pavlo Blazhchuk</strong></p>
        <p className='lead'>
          <a className='btn btn-primary btn-lg' href='https://github.com/gios/solar-nets' target='_blank' role='button'>Appreciate It!</a>
        </p>
      </div>
    )
  }
}

export default AboutCard