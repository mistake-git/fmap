import * as React from 'react'
import styled from 'styled-components'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react'
import GoogleMapReact, { MapOptions, Maps } from 'google-map-react'
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PinXs: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      border: '2px solid #FF0000'
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
  icon: any
}
const GoogleMap = (props: any) => {
  const [currentKey, setCurrentKey] = useState(-1)
  const classes = useStyles();

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
      case (size && size > 1 ):
        return classes.PinXs
      case (size && size > 20 ):
        return classes.PinSm
      case (size && size > 40 ):
        return classes.PinMd
      case (size && size > 60 ):
        return classes.PinLg
      case (size && size > 80):
        return classes.PinXl
      default: 
        return classes.PinXs
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
          onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps, props.posts)}
          onChildClick={(key: string) => changeBalloon(key)}
        >
        {
          props.posts.map((
            post: any) => (
            <Pin
              key={post.id}
              lat={post.latitude}
              lng={post.longitude}
            >
              <Link to={`/posts/${post.id}`}>
                <Avatar alt={post.name} src="./fish.jpg" className={getPinSize(post.size)}/>
              </Link>
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