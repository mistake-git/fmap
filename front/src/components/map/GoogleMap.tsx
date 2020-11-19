import * as React from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'


const Wrapper = styled.div`
  text-align: center;
`
const Pin = styled.div<{
  lat: number,
  lng: number
}>`
`
const GoogleMapWrapper = styled.div`
  height: 100vh;
  width: 100%;
`
const GoogleMap = () => (
  <Wrapper>
    <GoogleMapWrapper>
    <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDWr8k_Rxo4UwSFde8mcgUiLs2BwXh3qCM"
        }}
        defaultCenter={{
          lat: 35.0582954,
          lng: 135.3466919
        }}
        defaultZoom={12}
      >
        <Pin
          lat={43.0582954}
          lng={141.3466919}
        >
        </Pin>
      </GoogleMapReact>
    </GoogleMapWrapper>
  </Wrapper>
)

export default GoogleMap;