import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Admin = () => {
  const [sqlQuery, setSqlQuery] = useState(
    // "SELECT * FROM ATINA_MobileBookings"
    ""
  );

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `https://localhost:7294/api/Query`,
        {
          query: sqlQuery,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSqlQuery(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        placeItems: "center",
        height: "60vh",
      }}
    >
      <TextField
        sx={{ width: "50%" }}
        onChange={handleChange}
        value={sqlQuery || ""}
        label="Multiline"
        multiline
        rows={15}
      />
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </div>
  );
};

export default Admin;
