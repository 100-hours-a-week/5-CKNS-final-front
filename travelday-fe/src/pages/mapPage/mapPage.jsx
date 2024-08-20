import React from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.5400456,
  lng: 126.9921017
};

const malls = [
  { label: "C", name: "코엑스몰", lat: 37.5115557, lng: 127.0595261 },
  { label: "G", name: "고투몰", lat: 37.5062379, lng: 127.0050378 },
  { label: "D", name: "동대문시장", lat: 37.566596, lng: 127.007702 },
  { label: "I", name: "IFC몰", lat: 37.5251644, lng: 126.9255491 },
  { label: "L", name: "롯데월드타워몰", lat: 37.5125585, lng: 127.1025353 },
  { label: "M", name: "명동지하상가", lat: 37.563692, lng: 126.9822107 },
  { label: "T", name: "타임스퀘어", lat: 37.5173108, lng: 126.9033793 }
];

function MyMapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY// 자신의 API 키로 대체하세요.
  });

  const [selectedMall, setSelectedMall] = React.useState(null);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {malls.map((mall) => (
        <Marker
          key={mall.name}
          position={{ lat: mall.lat, lng: mall.lng }}
          label={mall.label}
          onClick={() => setSelectedMall(mall)}
        />
      ))}

      {selectedMall && (
        <InfoWindow
          position={{ lat: selectedMall.lat, lng: selectedMall.lng }}
          onCloseClick={() => setSelectedMall(null)}
        >
          <div>{selectedMall.name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default React.memo(MyMapComponent);
