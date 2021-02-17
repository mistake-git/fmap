import * as React from 'react'
import styled from 'styled-components'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react'
import GoogleMapReact, { MapOptions, Maps } from 'google-map-react'
import { Avatar, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PinXs: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      border: '2px solid #FFFFFF'
    },
    PinSm: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      border: '2px solid #0000FF'
    },
    PinMd: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      border: '2px solid  #C47222'
    },
    PinLg: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      border: '2px solid #C0C0C0'
    },
    PinXl: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      border: '2px solid #FFD700'
    },
  }),
);

interface PinProps {
  lat: number,
  lng: number,
  icon: any,
  key:　number,
  name: string
}
const ShowGoogleMap = (props: any) => {
  const [currentKey, setCurrentKey] = useState(-1)
  const classes = useStyles();
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY

  //サイズからピンの大きさを求める
  const getPinSize = (size: number) =>{
    if (1<= size && size <= 20) {
      return classes.PinXs
    } else if (21<= size && size <= 40) {
      return classes.PinSm
    } else if (41<= size && size <= 61) {
      return classes.PinMd
    }　else if (61<= size && size <= 80) {
      return classes.PinLg
    }  else if (81<= size) {
      return classes.PinXl
    } else {
      return classes.PinXs
    }
  }

  const pin: PinProps = 
    { key: 1,
      name: props.post.name,
      lat: props.post.latitude,
      lng: props.post.longitude,
      icon:
        <Avatar alt={props.post.name} src={props.post.image_url} className={getPinSize(props.post.size)}/>
    }
  
  const apiLoaded = (map: any, maps: any, pin: any) => {
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
      mapTypeControl: true,
      zoomControl: true,
      scaleControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#75a9ff',
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
              visibility: 'on',
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
            key: apiKey!
          }}
          defaultCenter={{
            lat: props.post.latitude,
            lng: props.post.longitude
          }}
          yesIWantToUseGoogleMapApiInternals = {true}
          defaultZoom={8}
          options={createMapOptions}
          onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps, pin)}
          onChildClick={(key: string) => changeBalloon(key)}
        >
          <Tooltip title={pin.name}　placement="right">
            <Pin
              key={pin.key}
              lat={pin.lat}
              lng={pin.lng}
            >
              {pin.icon}
            </Pin>
          </Tooltip>
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

export default ShowGoogleMap