import React, { useState, Fragment } from 'react'
import MapPicker from 'react-google-map-picker'
 
const DefaultLocation = { lat: 35, lng: 135};
const DefaultZoom = 10;
 
const LocatePicker = () => {
 
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY
 
  function handleChangeLocation (lat: number, lng: number){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom: number){
    setZoom(newZoom);
  }
 
  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }
 
  return (
    <Fragment>
      <button onClick={handleResetLocation}>Reset Location</button>
      <label>Latitute:</label><input type='text' value={location.lat} disabled/>
      <label>Longitute:</label><input type='text' value={location.lng} disabled/>
      <label>Zoom:</label><input type='text' value={zoom} disabled/>
      <MapPicker defaultLocation={defaultLocation}
        zoom={zoom}
        style={{height:'700px'}}
        onChangeLocation={handleChangeLocation} 
        onChangeZoom={handleChangeZoom}
        apiKey= {apiKey!}
      />
    </Fragment>
  );
}
 
export default LocatePicker