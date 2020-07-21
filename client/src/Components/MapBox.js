import React from "react";

import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import EntryForm from "./EntryForm";

import { listLogEntries } from "../Api/API";
import { get } from "react-hook-form";

const MapBox = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopUp, setShowPopUp] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 11.1214935,
    longitude: 122.2128641,
    zoom: 5.25,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    console.log(logEntries);
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const addMarkerPopUp = (e) => {
    console.log(e);
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/jhetuts/ckcw1lbzf0zwb1irpk99txh3v"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={addMarkerPopUp}
    >
      {logEntries &&
        logEntries.map((entry) => (
          <div className="marker-wrap" key={entry._id}>
            <Marker latitude={entry.latitude} longitude={entry.longitude}>
              <div
                className="marker-div"
                onClick={() =>
                  setShowPopUp({
                    [entry._id]: true,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2c2c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-map-pin marker"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {showPopUp[entry._id] && (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                sortByDepth={true}
                onClose={() => setShowPopUp({})}
                anchor="top"
              >
                <div className="pop-up">
                  <h2>{entry.title}</h2>
                  <p>{entry.description}</p>
                  <small>
                    {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                </div>
              </Popup>
            )}
          </div>
        ))}
      {addEntryLocation && (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div className="marker-div add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b56565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-map-pin marker"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            sortByDepth={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="pop-up">
              <h2>Add your new log entry here!</h2>
              <EntryForm
                location={addEntryLocation}
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
              />
            </div>
          </Popup>
        </>
      )}
    </ReactMapGL>
  );
};
export default MapBox;
