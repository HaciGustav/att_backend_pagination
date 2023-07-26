import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FilterHead from "./filter_components/FilterHead";
const ItemsFilter = ({
  filterVal,
  setFilterVal,
  handleFilter,
  handleReset,
  type,
  setType,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    // if (e.target.name === "itemType") {
    //   setType(e.target.value);
    // }
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      component={Paper}
      style={{
        ...filterStyles.container,
        cursor: "pointer",
      }}
    >
      <FilterHead open={open} setOpen={setOpen} pageTitle={"Datensätze"} />
      <Collapse sx={{ width: "100%" }} in={open} timeout="auto" unmountOnExit>
        <Box style={filterStyles.insideWrapper} component="form">
          {/* //? == ROW 1 == */}
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="itemType">Itemtyp</InputLabel>
                <Select
                  labelId="itemType"
                  id="demo-select-small"
                  value={filterVal?.itemType || "Order"}
                  label="Itemtyp"
                  name="itemType"
                  onChange={handleChange}
                >
                  <MenuItem value={"Order"}>Auftrag</MenuItem>
                  <MenuItem value={"Meter"}>Zähler</MenuItem>
                  <MenuItem value={"Vehicle"}>KFZ</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemNumber || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Datensatznummer"
                name="itemNumber"
              />
            </Grid>
            <Grid item md={6} />
            {filterVal.itemType !== "Vehicle" && (
              <>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.street || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="Straße"
                    name="street"
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.streetnumber || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="Hausnummer"
                    name="streetnumber"
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.zip || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="PLZ"
                    name="zip"
                  />
                </Grid>

                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    value={filterVal.city || ""}
                    sx={filterStyles.textField}
                    variant="outlined"
                    size="small"
                    label="Stadt"
                    name="city"
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    onChange={handleChange}
                    sx={filterStyles.textField}
                    value={filterVal.country || ""}
                    variant="outlined"
                    size="small"
                    label="Land"
                    name="country"
                  />
                </Grid>
              </>
            )}
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                sx={filterStyles.textField}
                value={filterVal.data1 || ""}
                variant="outlined"
                size="small"
                label={
                  filterVal.itemType === "Order"
                    ? "Mandant"
                    : filterVal.itemType == "Meter"
                    ? "Letzte Ablesung am"
                    : "Mandant"
                }
                name="data1"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                sx={filterStyles.textField}
                value={filterVal.data2 || ""}
                variant="outlined"
                size="small"
                label={
                  filterVal.itemType === "Order"
                    ? "Auftragsart"
                    : filterVal.itemType === "Meter"
                    ? "Letzte Ablesung"
                    : "Standort"
                }
                name="data2"
              />
            </Grid>
            {filterVal.itemType !== "Meter" && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data3 || ""}
                  variant="outlined"
                  size="small"
                  label={
                    filterVal.itemType === "Order"
                      ? "Auftragsbetreff"
                      : filterVal.itemType === "Vehicle" && "Kennzeichen"
                  }
                  name="data3"
                />
              </Grid>
            )}
            {filterVal.itemType !== "Meter" && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data4 || ""}
                  variant="outlined"
                  size="small"
                  label={
                    filterVal.itemType === "Order"
                      ? "Kundennummer"
                      : filterVal.itemType === "Vehicle" && "Modell"
                  }
                  name="data4"
                />
              </Grid>
            )}
            {filterVal.itemType === "Order" && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data5 || ""}
                  variant="outlined"
                  size="small"
                  label="Kundenname"
                  name="data5"
                />
              </Grid>
            )}
          </Grid>
          <div style={filterStyles.buttonWrapper}>
            <Button
              type="submit"
              sx={filterStyles.button}
              variant="contained"
              color="secondary"
              onClick={(e) => handleFilter(e)}
            >
              {" "}
              Suchen{" "}
            </Button>
            <Button
              sx={filterStyles.button}
              variant="contained"
              color="secondary"
              onClick={() => handleReset()}
            >
              {" "}
              Löschen{" "}
            </Button>
          </div>
        </Box>
      </Collapse>{" "}
    </Box>
  );
};

export default memo(ItemsFilter);
