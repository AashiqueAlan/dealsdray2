import React, { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function Dashboard() {
  const [login, setLogin] = useState();
  useEffect(() => {
    function getUser() {
      let x = localStorage.getItem("login");
      setLogin(x);
    }
    getUser();
  }, []);
  return (
    <Container>
      <Box sx={{ height: "100vh", paddingX: "3rem" }}>
        <Typography variant="h3" gutterBottom>
          Hello {login}
        </Typography>
        <Link to={"/employees"}>
          <Button
            variant="contained"
            disableElevation
            sx={{ marginTop: "5rem", width: "100%" }}
          >
            Employee List
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default Dashboard;
