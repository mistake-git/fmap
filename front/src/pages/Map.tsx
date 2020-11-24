import React, { Fragment } from 'react'
import Template from '../components/layouts/Template'
import GoogleMap from '../components/map/GoogleMap'

const Home = (props: any) => {
  return (
    <Fragment>
      <Template>
        <GoogleMap />
      </Template>
    </Fragment>
  )
}

export default Home
