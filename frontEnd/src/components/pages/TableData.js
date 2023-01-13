import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import axios from "axios";
import EditForm from "./EditForm";

const TableData = () => {
  const [open, setOpen] = useState(false);

  const [childData, setChildData] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});

  const displayData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/allusers");
      console.log("got all data child", response.data.data);
      setChildData(response.data.data);
    } catch (err) {
      console.log("error api", err);
    }
  };

  useEffect(() => {
    displayData();
  }, []);

  const deleteData = async (_id) => {
    console.log("_id to delete", _id);
    try {
      let response = await axios.delete(
        `http://localhost:8000/deleteuser/${_id}`
      );
      console.log("response while deleting", response);
      displayData();
    } catch (err) {
      console.log("error deleting", err);
    }
  };

  const userEdit = (value) => {
    setSelectedUser(value);
    setOpen(true);
  };

  return (
    <Box sx={{ width: "100%", px: 4 }}>
      <TableContainer sx={{ justifyContent: "center" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                FIRST NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                LAST NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                EMAIL ID
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                MOBILE NO
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                DOB
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                AGE
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                ADDRESS
              </TableCell>

              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
                align="center"
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {childData?.map((data, index) => {
              console.log("data while mapping", data);
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "cursive",
                    }}
                    align="center"
                  >
                    {data.firstName}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "cursive",
                    }}
                    align="center"
                  >
                    {data.lastName}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "cursive",
                    }}
                    align="center"
                  >
                    {data.emailId}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "cursive",
                    }}
                    align="center"
                  >
                    {data.phoneNo}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "cursive",
                    }}
                    align="center"
                  >
                    {data.dob}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "cursive",
                    }}
                    align="center"
                  >
                    {data.age}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "cursive",
                    }}
                    align="center"
                  >
                    {data.address}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        userEdit(data);
                      }}
                      sx={{ backgroundColor: "black", marginRight: "5px" }}
                      size="small"
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ backgroundColor: "black" }}
                      onClick={() => deleteData(data._id)}
                      size="small"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <EditForm
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        displayData={displayData}
      />
    </Box>
  );
};

export default TableData;
