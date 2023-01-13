import React, { useState, useEffect } from "react";
import axios from "axios";

const GeoPosition = ({ key, address }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    latitudeAndLogitude();
  }, [address]);

  const latitudeAndLogitude = async () => {
    console.log("GeoPosition working");
    try {
      setLoading(true);
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
      );
      const result = res.data.results[0].geometry.location;
      console.log("result", res);
      if (result.lat !== null && result.lng !== null) {
        setPosition({ lat: result.lat, lng: result.lng });
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  console.log("position----->", position);
  return [position, loading, error];
};

export default GeoPosition;
