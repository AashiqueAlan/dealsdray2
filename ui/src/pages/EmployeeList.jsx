import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function getEmployees() {
      fetch("http://localhost:3001/users", { method: "GET" })
        .then(async (d) => {
          let data = await d.json();
          console.log(data);
          setEmployees(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getEmployees();
  }, []);

  function handleEdit(employeeId) {
    navigate(`/edit/${employeeId}`);
  }

  function handleDelete(employeeId) {
    if (window.confirm("Do you want to delete ?")) {
      fetch(`http://localhost:3001/users/${employeeId}`, { method: "DELETE" })
        .then((res) => {
          if (res.status >= 400) {
            alert("Failed to delete user");
          } else {
            alert("Successfully deleted");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <>
      <Box sx={{ paddingY: "2rem", paddingLeft: "1rem" }}>
        <Link to={"/new"}>
          <Button variant="contained">Create New Employee</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bolder" }}>Profile</TableCell>
              <TableCell align="right" style={{ fontWeight: "bolder" }}>
                Employee Name
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bolder" }}>
                Gender
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bolder" }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bolder" }}>
                Mobile
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bolder" }}>
                Designation
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bolder" }}>
                Course
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bolder" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar src={row.image} />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.mobile}</TableCell>
                <TableCell align="right">{row.designation}</TableCell>
                <TableCell align="right">{row.course}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={() => {
                        handleEdit(row._id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EmployeeList;
