import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
function EditEmployee() {
  const navigate = useNavigate();

  const { employeeId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Female");
  const [designation, setDesignation] = useState("Manager");
  const [course, setCourse] = useState("");

  useEffect(() => {
    function getEmployeeDetail() {
      fetch(`http://localhost:3001/users/${employeeId}`, { method: "GET" })
        .then(async (d) => {
          let data = await d.json();
          console.log(data);
          setName(data.name);
          setEmail(data.email);
          setPhone(data.mobile);
          setGender(data.gender);
          setDesignation(data.designation);
          setCourse(data.course);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getEmployeeDetail();
  }, [employeeId]);

  function onValueChange(key, value) {
    switch (key) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);

        break;
      case "phone":
        setPhone(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "designation":
        setDesignation(value);
        break;
      case "course":
        setCourse(value);
        break;
    }
  }

  function onSubmit() {
    if (
      phone === "" ||
      name === "" ||
      email === "" ||
      gender === "" ||
      designation === "" ||
      course === "" ||
      phone === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (phone.length !== 10) {
      alert("Invalid phone number");
      return;
    }
    var lastAtPos = email.lastIndexOf("@");
    var lastDotPos = email.lastIndexOf(".");
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") == -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      alert("Invalid email id");
      return;
    }
    let payload = { name, email, mobile: phone, gender, designation, course };
    console.log(payload);

    fetch(`http://localhost:3001/users/${employeeId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        if (res.status >= 400) {
          alert("Failed to update user");
        } else {
          alert("Successfully update");
          navigate("/employees");
        }
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
      <Box sx={{ height: "100vh", flexDirection: "column", display: "flex" }}>
        <TextField
          label="Name"
          type={"text"}
          fullWidth
          sx={{ marginTop: "1rem" }}
          value={name}
          onChange={(d) => {
            onValueChange("name", d.target.value);
          }}
        ></TextField>
        <TextField
          label="Email"
          type={"email"}
          fullWidth
          sx={{ marginTop: "1rem" }}
          value={email}
          onChange={(d) => {
            onValueChange("email", d.target.value);
          }}
        ></TextField>
        <TextField
          label="Phone"
          type={"number"}
          fullWidth
          sx={{ marginTop: "1rem" }}
          value={phone}
          onChange={(d) => {
            onValueChange("phone", d.target.value);
          }}
        ></TextField>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={(d) => {
            onValueChange("gender", d.target.value);
          }}
          fullWidth
          label="Gender"
          sx={{ marginTop: "1rem" }}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Others"}>Others</MenuItem>
        </Select>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={designation}
          label="Designation"
          onChange={(d) => {
            onValueChange("designation", d.target.value);
          }}
          fullWidth
          sx={{ marginTop: "1rem" }}
        >
          <MenuItem value={"HR"}>HR</MenuItem>
          <MenuItem value={"Sales"}>Sales</MenuItem>
          <MenuItem value={"Manager"}>Manager</MenuItem>
        </Select>
        <TextField
          label="Course"
          type={"text"}
          fullWidth
          sx={{ marginTop: "1rem" }}
          value={course}
          onChange={(d) => {
            onValueChange("course", d.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={onSubmit}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
}

export default EditEmployee;
