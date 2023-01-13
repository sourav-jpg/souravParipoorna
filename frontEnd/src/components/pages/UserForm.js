import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import DisplayData from "./TableData";

import styled from "styled-components";
import axios from "axios";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";



const UserForm = () => {
  const [nameValid, setnameValid] = useState("");
  const [lastNameValid, setLastNameValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [dobValid, setDobValid] = useState("");
  const [ageValid, setAgeValid] = useState("");
  const [mobileValid, setMobileValid] = useState("");
  const [addValid, setAddValid] = useState("");
  const [childData, setChildData] = useState([]);

  const [allDetails, setAllDetails] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    dob: null,
    age: "",
    phoneNo: "",
    address: "",
  });
  console.log("all details", allDetails);

  const cities = [
    { label: "Bangalore", year: 1994 },
    { label: "Mangalore", year: 1972 },
    { label: "Mysore", year: 1974 },
    { label: "Chennai", year: 2008 },
    { label: "Mumbai", year: 1957 },
    { label: "Hyderabad", year: 1993 },
    { label: "Pune", year: 1994 },
  ];


  const getData = (e) => {
    setAllDetails({
      ...allDetails,
      [e.target.name]: e.target.value,
    });
  };

  const emailIdValidation = () => {
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+(\.\w{2,3})$/;
    if (allDetails.emailId) {
      if (emailRegex.test(allDetails.emailId)) {
        setEmailValid("");
        return true;
      } else {
        setEmailValid("Invalid Email");
      }
    } else {
      setEmailValid("* EmailID Required");
    }
  };

  const nameValidation = () => {
    const nameRegex = /^[A-Za-z]+$/;
    if (allDetails.firstName) {
      if (nameRegex.test(allDetails.firstName)) {
        setnameValid("");
        return true;
      } else {
        setnameValid("Invalid FirstName");
      }
    } else {
      setnameValid("* Firstname Required");
    }
  };

  const lastNameValidation = () => {
    const nameRegex = /^[A-Za-z]+$/;
    if (allDetails.lastName) {
      if (nameRegex.test(allDetails.lastName)) {
        setLastNameValid("");
        return true;
      } else {
        setLastNameValid("Invalid LastName");
      }
    } else {
      setLastNameValid("* Lastname  Required");
    }
  };


  const addValidation = () => {
    if (allDetails.dob == null) {
      setAddValid("* Address Required");
    } else {
      setAddValid("");
      return true;
    }
  };

  const phoneNoValidation = () => {
    const mobileRegex = /^(\+|\d)[0-9]{7,16}$/;
    if (allDetails.phoneNo) {
      if (mobileRegex.test(allDetails.phoneNo)) {
        setMobileValid("");
        return true;
      } else {
        setMobileValid("Invalid Mobile Number");
      }
    } else {
      setMobileValid("* Mobile number Required");
    }
  };

  const ageValidation = () => {
    const ageRegex = /^[0-9]+$/;
    if (allDetails.age) {
      if (ageRegex.test(allDetails.age)) {
        setAgeValid("");
        return true;
      } else {
        setAgeValid("Invalid Age");
      }
    } else {
      setAgeValid("* Age Required");
    }
  };

  const dobValidation = () => {
    if (allDetails.dob == null) {
      setDobValid("* DOB Required");
    } else {
      setDobValid("");
      return true;
    }
  };


  const getDobDate = (val) => {
    let date = new Date(val);
    setAllDetails({
      ...allDetails,
      dob: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    });
    setDobValid("");
  };

  useEffect(() => {
    let calculate_age = () => {
        let today = new Date();
        let birthDate = new Date(allDetails.dob);  
        let age_now = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        if (allDetails.dob !== null) {
            setAllDetails({
                ...allDetails,
                age: age_now
            })
        }
        return age_now;
    }
    calculate_age()

}, [allDetails.dob]);

  const submitData = async () => {
    nameValidation();
    lastNameValidation();
    emailIdValidation();
    phoneNoValidation();
    ageValidation();
    dobValidation();
    addValidation();

    if (
      nameValidation() &&
      lastNameValidation() &&
      emailIdValidation() &&
      phoneNoValidation() &&
      ageValidation() &&
      dobValidation() & addValidation()
    ) {
      try {
        const data = await axios.post(
          "http://localhost:8000/newuser",
          allDetails
        );
        setAllDetails({
          firstName: "",
          lastName: "",
          emailId: "",
          dob: null,
          age: "",
          phoneNo: "",
          address: "",
        });
        window.location.reload();
      } catch (err) {
        console.log("error posting", err);
      }

      setChildData([...childData, allDetails]);
    }
  };

  return (
    <div>
      <Grid
        className="main-container"
        container
        item
        lg={12}
        md={12}
        xs={12}
        sx={{ display: "flex" }}
      >
        
        <Grid
          container
          spacing={2}
          sx={{
            padding: "10px 20px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          item
          lg={6}
          md={6}
          xs={6}
        >
          <Grid
            className="px-4 py-4"
            container
            spacing={2}
            item
            sx={{ display: "flex", justifyContent: "space-between" }}
            lg={12}
            md={12}
            xs={12}
          >
            <Grid item lg={5.95} md={6} xs={12}>
              <TextField
                id="outlined-basic"
                fullWidth
                value={allDetails.firstName}
                label="First Name"
                name="firstName"
                variant="outlined"
                onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setnameValid("") } }}
                onChange={getData}
              />
              {nameValid && (
                <span style={{ color: "red" }}>{nameValid}</span>
              )}
            </Grid>
            <Grid item lg={5.95} md={6} xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                name="lastName"
                variant="outlined"
                label="Last Name"
                value={allDetails.lastName}
                onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setLastNameValid("") } }}
                onChange={getData}
              />
              {lastNameValid && (
                <span style={{ color: "red" }}>{lastNameValid}</span>
              )}
            </Grid>
          </Grid>
          <Grid
            className="px-4 py-4"
            container
            spacing={2}
            item
            sx={{ display: "flex", justifyContent: "space-between" }}
            lg={12}
            md={12}
            xs={12}
          >
            <Grid item lg={5.95} md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={allDetails.emailId}
                id="outlined-basic"
                name="emailId"
                onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setEmailValid("") } }}
                onChange={getData}
              />
              {emailValid && <div style={{ color: "red" }}>{emailValid}</div>}
            </Grid>
            <Grid item lg={5.95} md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone No"
                id="outlined-basic"
                name="phoneNo"
                variant="outlined"
                value={allDetails.phoneNo}
                onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setMobileValid("") } }}
                onChange={getData}
              />
              {mobileValid && (
                <span style={{ color: "red" }}>{mobileValid}</span>
              )}
            </Grid>
          </Grid>
          <Grid
            className="px-4 py-4"
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
            item
            lg={12}
            md={12}
            xs={12}
          >
            <Grid item lg={6} md={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid sx={{ margin: "0px" }}>
                  <DatePicker
                    fullWidth
                    sx={{ width: "600px" }}
                    label="Basic example"
                    value={allDetails.dob}
                    onChange={(e) => {
                      getDobDate(e);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
              {dobValid && <span style={{ color: "red" }}>{dobValid}</span>}
            </Grid>
            <Grid item lg={5.95} md={6} xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Age"
                name="age"
                value={allDetails.age}
                onChange={getData}
              />
              {ageValid && <span style={{ color: "red" }}>{ageValid}</span>}
            </Grid>
          </Grid>
          <Grid
            className="px-4 py-4"
            container
            spacing={2}
            item
            sx={{ display: "flex", justifyContent: "space-between" }}
            lg={12}
            md={12}
            xs={12}
          >
            <Grid item lg={5.95} md={6} xs={12}>
              <Autocomplete
                id="combo-box-demo"
                options={cities}
                onChange={(e, value) => {
                  setAllDetails({ ...allDetails, address: value.label });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Address" />
                )}
              />
              {addValid && <span style={{ color: "red" }}>{addValid}</span>}
            </Grid>
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <Button
              fullWidth
              sx={{ backgroundColor: "black" }}
              onClick={submitData}
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
       
        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid
          item
          lg={5.9}
          md={5.9}
          xs={5.9}
          sx={{
            width: "100%",
            padding: "0px 10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
            height="350"
            width="100%"
            style={{ border: "0" }}
            frameborder="0"
            tabindex="0"
            allowfullscreen=""
            aria-hidden="false"
          ></iframe>
        </Grid>
        <DisplayData  />
      </Grid>
    </div>
  );
};

export default UserForm;
