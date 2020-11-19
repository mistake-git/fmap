import * as React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import GoogleMapReact, { MapOptions, Maps } from 'google-map-react'
import RoomIcon from '@material-ui/icons/Room';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface PinProps {
  lat: number,
  lng: number,
  icon: any
}
const GoogleMap = () => {
  const [currentKey, setCurrentKey] = useState(-1)

  const pins: PinProps[] = [
    {
      lat: 43.0543412,
      lng: 141.355018,
      icon:
      <Link to={"/posts/1"}>
        <Avatar alt="R" src="./fish.jpg" />
      </Link>
    },
    {
      lat: 43.0543451,
      lng: 141.3528293,
      
      icon:
        <Link to={"/posts/2"}>
          <Avatar alt="R" src="./fish.jpg" />
        </Link>
    }
  ]

  const apiLoaded = (map: any, maps: any, pins: any) => {
  }
  const changeBalloon = (key: string) => {
    const keyNumber = Number(key)
    if (currentKey === keyNumber) {
      setCurrentKey(-1)
    } else {
      setCurrentKey(keyNumber)
    }
  }
  const createMapOptions = (maps: Maps): MapOptions => {
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e9e9e9',
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 29,
            },
            {
              weight: 0.2,
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 18,
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dedede',
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on',
            },
            {
              color: '#ffffff',
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36,
            },
            {
              color: '#333333',
            },
            {
              lightness: 40,
            },
          ],
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f2f2f2',
            },
            {
              lightness: 19,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fefefe',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#fefefe',
            },
            {
              lightness: 17,
            },
            {
              weight: 1.2,
            },
          ],
        },
      ],
    }
  }
  return (
    <Wrapper>
      <GoogleMapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDWr8k_Rxo4UwSFde8mcgUiLs2BwXh3qCM'
          }}
          defaultCenter={{
            lat: 43.0543451,
            lng: 141.3528293
          }}
          defaultZoom={15}
          options={createMapOptions}
          onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps, pins)}
          onChildClick={(key: string) => changeBalloon(key)}
        >
        {
          pins.map((
            pin: {
              lat: number,
              lng: number,
              icon: any
            },
            index: number) => (
            <Pin
              lat={pin.lat}
              lng={pin.lng}
            >
            {pin.icon}
            </Pin>
          ))
        }
        </GoogleMapReact>
      </GoogleMapWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
`

const Pin = styled.div<{
  lat: number,
  lng: number
}>`
`

const GoogleMapWrapper = styled.div`
  height: 60vh;
  width: 100%;
`

export default GoogleMap