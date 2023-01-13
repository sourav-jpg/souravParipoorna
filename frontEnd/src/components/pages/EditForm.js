import React from "react";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

const cities = [
  { label: "Bangalore" },
  { label: "Mangalore" },
  { label: "Mysore" },
  { label: "Chennai" },
  { label: "Mumbai" },
  { label: "Hyderabad" },
  { label: "Pune" },
];

const EditForm = ({ open, setOpen, selectedUser, displayData }) => {
  console.log("selected user", selectedUser);
  const style = {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    left: "50%",
    p: 4,
    border: "2px solid #000",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [allDetails, setAllDetails] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    dob: "",
    age: "",
    phoneNo: "",
    address: "",
  });

  const updateData = (e) => {
    setAllDetails({
      ...allDetails,
      [e.target.name]: e.target.value,
    });
  };

  let editProduct = async (ID) => {
    try {
      let response = await axios.put(
        `http://localhost:8000/editUser/${selectedUser._id}`,
        allDetails
      );
      displayData();
      setOpen(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    setAllDetails({ ...selectedUser });
  }, [selectedUser]);

  console.log("input data---->", allDetails);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            spacing={2}
            item
            lg={12}
            md={12}
            xs={12}
            sx={{
              alignItems: "center",
              padding: "10px 20px",
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Grid
              className="px-4 py-4"
              container
              spacing={2}
              item
              lg={12}
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item lg={5.75} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={allDetails.firstName}
                  onChange={updateData}
                />
              </Grid>
              <Grid item lg={5.75} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={allDetails.lastName}
                  onChange={updateData}
                />
              </Grid>
            </Grid>
            <Grid
              className="px-4 py-4"
              container
              spacing={2}
              item
              lg={12}
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item lg={5.75} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="emailId"
                  value={allDetails.emailId}
                  onChange={updateData}
                />
              </Grid>
              <Grid item lg={5.75} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Phone No"
                  variant="outlined"
                  fullWidth
                  name="phoneNo"
                  value={allDetails.phoneNo}
                  onChange={updateData}
                />
              </Grid>
            </Grid>
            <Grid
              className="px-4 py-4"
              container
              spacing={2}
              item
              lg={12}
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item lg={5.75} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="DOB"
                  variant="outlined"
                  fullWidth
                  name="dob"
                  value={allDetails.dob}
                  onChange={updateData}
                />
              </Grid>
              <Grid item lg={5.75} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="age"
                  variant="outlined"
                  fullWidth
                  name="age"
                  value={allDetails.age}
                  onChange={updateData}
                />
              </Grid>
            </Grid>
            <Grid
              className="px-4 py-4"
              container
              spacing={2}
              item
              lg={12}
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item lg={5.75} md={6} xs={12}>
                <Autocomplete
                  options={cities}
                  id="combo-box-demo"
                  renderInput={(params) => (
                    <TextField {...params} label="Address" />
                  )}
                  onChange={(e, value) => {
                    setAllDetails({ ...allDetails, address: value.label });
                  }}
                />
              </Grid>
            </Grid>

            <Grid item lg={12} md={12} xs={12}>
              <Button
                sx={{ backgroundColor: "black" }}
                onClick={editProduct}
                fullWidth
                variant="contained"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default EditForm;
