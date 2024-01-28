// MapComponent.jsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  FeatureGroup,
  LayersControl,
} from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { EditControl } from "react-leaflet-draw";
import { useDropzone } from "react-dropzone";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import SearchField from "./SearchField";
import { HiUpload } from "react-icons/hi";
import "./App.css";

const { BaseLayer } = LayersControl;

const MapComponent = () => {
  const mapCenter = [22.3511, 78.6677];
  const zoomLevel = 13;
  const prov = new OpenStreetMapProvider();
  const [markers, setMarkers] = useState([]);
  const [geoJSONLayers, setGeoJSONLayers] = useState([]);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const geoJSONData = JSON.parse(reader.result);
        setGeoJSONLayers((prevLayers) => [...prevLayers, geoJSONData]);
      };
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".geojson",
  });

  const handleAddMarker = (marker) => {
    let tmp = markers.slice(); // Use slice to create a copy
    tmp.push(marker);
    setMarkers(tmp);
    console.log(markers);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "95vw",
        position: "fixed",
        top: 0,
        left: 0,
        marginLeft: 60,
        zIndex: 0,
      }}
    >
      <div className="flex">
        <h1 style={{ textAlign: "center" }}>GIS Web App</h1>
      </div>
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
      >
        {/* Upload GeoJSON file dropzone */}

        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          style={{ height: "100%", width: "100%" }}
        >
          {/* SearchField always above LayersControl and FeatureGroup */}
          <div>
            <SearchField
              provider={prov}
              showMarker={true}
              showPopup={false}
              popupFormat={({ query, result }) => result.label}
              retainZoomLevel={false}
              animateZoom={true}
              autoClose={false}
              searchLabel={"Enter address, please"}
              keepResult={true}
              addMarker={handleAddMarker}
              position="topright"
              className="text-red"
            />

            {/* LayersControl */}
            <LayersControl position="topright">
              <BaseLayer checked name="OpenStreetMap">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="Satellite Imagery">
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              </BaseLayer>
              <BaseLayer name="Google Satellite">
                <TileLayer url="https://mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
              </BaseLayer>
              <BaseLayer name="Yandex">
                <TileLayer url="https://sat04.maps.yandex.net/tiles?l=sat&v=3.456.0&x={x}&y={y}&z={z}" />
              </BaseLayer>
            </LayersControl>

            {/* Render GeoJSON layers */}
            {geoJSONLayers.map((layer, index) => (
              <GeoJSON key={index} data={layer} />
            ))}
          </div>

          {/* Enable drawing/editing spatial data */}
          <FeatureGroup>
            <EditControl
              position="topright"
              draw={{
                marker: true,
                circle: false,
                circlemarker: false,
                polyline: true,
                polygon: true,
                rectangle: true,
              }}
              featureGroup={FeatureGroup}
            />
            <div
              {...getRootProps()}
              style={{
                position: "absolute",
                zIndex: "1000",
                backgroundColor: "white",
                border: "2px solid #ccc",
                borderRadius: "3px",
                height: "32px",
                width: "32px",
                marginRight: "10px",
                marginTop: "340px",
                alignItems: "center",
                paddingLeft: "8px",
                paddingTop: "8px",
                right: 0,
                center: 0,
              }}
            >
              <input {...getInputProps()} />
              <div className="">
                <HiUpload />
              </div>
            </div>
          </FeatureGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
