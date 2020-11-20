import * as React from 'react'
import styled from 'styled-components'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react'
import GoogleMapReact, { MapOptions, Maps } from 'google-map-react'
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    xs: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    sm: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    md: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    lg: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
    },
    xl: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }),
);

interface PinProps {
  lat: number,
  lng: number,
  icon: any
}
const GoogleMap = () => {
  const [currentKey, setCurrentKey] = useState(-1)
  const classes = useStyles();

  const pins: PinProps[] = [
    {
      lat: 43.4543412,
      lng: 143.355018,
      icon:
        <Link to={"/posts/1"}>
          <Avatar alt="R" src="./fish.jpg" className={classes.sm}/>
        </Link>
    },
    {
      lat: 45.0543451,
      lng: 143.4293,
      
      icon:
        <Link to={"/posts/2"}>
          <Avatar alt="R" src="./fish.jpg" className={classes.xs} />
        </Link>
    },
    {
      lat: 46.0543451,
      lng: 143.3528293,
      
      icon:
        <Link to={"/posts/2"}>
          <Avatar alt="R" src="./fish.jpg" className={classes.lg} />
        </Link>
    },
    {
      lat: 48.0543451,
      lng: 141.3528293,
      
      icon:
        <Link to={"/posts/2"}>
          <Avatar alt="R" src="./fish.jpg" className={classes.xl} />
        </Link>
    },
    {
      lat: 46.0543451,
      lng: 144.3528293,
      
      icon:
        <Link to={"/posts/2"}>
          <Avatar alt="R" src="./fish.jpg" className={classes.md} />
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
  
  //サイズ空ピンの大きさを求める
　const getPinSize = (size: number) =>{
    switch (size){
      case (size && size >= 0 && size <= 20 ):
        console.log('xs');
        break;
      case  (size && size >= 21 && size <= 40 ):
        console.log('sm');
        break;
      case  (size && size >= 41 && size <= 60 ):
        console.log('md');
        break;
      case  (size && size >= 61 && size <= 80 ):
        console.log('lg');
        break;
      case  (size && size >= 81):
        console.log('xl');
        break;
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
            key: 'AIzaSyDWr8k_Rxo4UwSFde8mcgUiLs2BwXh3qCM'
          }}
          defaultCenter={{
            lat: 35.0543451,
            lng: 135.3528293
          }}
          defaultZoom={8}
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