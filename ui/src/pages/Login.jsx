import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Container from "@mui/material/Container";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch(`http://localhost:3001/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (res.status == 200) {
          console.log(res);
          let body = await res.json();
          localStorage.setItem("login", body["email"]);
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: "5rem" }}>
      <Box sx={{ height: "100vh", flexDirection: "column", display: "flex" }}>
        <TextField
          label="Email"
          type={"text"}
          fullWidth
          sx={{ marginTop: "1rem" }}
          value={email}
          onChange={(d) => {
            setEmail(d.target.value);
          }}
        ></TextField>
        <TextField
          label="Password"
          type={"password"}
          fullWidth
          sx={{ marginTop: "1rem" }}
          value={password}
          onChange={(d) => {
            setPassword(d.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
