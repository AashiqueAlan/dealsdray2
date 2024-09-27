import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Employee Management App
            </Typography>
            <Link to={"/login"}>
              <Button color="warning">Login</Button>
            </Link>
            <Link to={"/dashboard"}>
              <Button color="warning">Dashboard</Button>
            </Link>

            {/* <Button color="inherit">{email ? email : "Unknown user"}</Button> */}
            <Button
              color="warning"
              onClick={() => {
                localStorage.setItem("login", "");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}

export default App;
