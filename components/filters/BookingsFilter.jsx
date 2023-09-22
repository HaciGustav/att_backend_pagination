import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import React, { memo, useCallback, useEffect, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FilterHead from "./filter_components/FilterHead";
import { useSelector } from "react-redux";
import TimeInput from "../TimeInput";
import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

const BookingsFilter = ({
  filterVal,
  setFilterVal,
  handleFilter,
  handleReset,
}) => {
  const { bookingTypes } = useSelector((state) => state.atina);
  const [open, setOpen] = useState(false);
  const handleChange = useCallback(
    (e) => {
      setFilterVal({
        ...filterVal,
        [e.target.name]: e.target.value,
      });
    },
    [filterVal]
  );
  return (
    <Box component={Paper} sx={filterStyles.container}>
      <FilterHead
        open={open}
        setOpen={setOpen}
        pageTitle={"Mobile Buchungen"}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          component="form"
          sx={{
            ...filterStyles.insideWrapper,
            display: "flex",
          }}
        >
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="importState">Import Status</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="importState"
                  id="demo-select-small"
                  value={filterVal?.importState || ""}
                  label="Buchungstyp"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, importState: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                      None
                    </Typography>
                  </MenuItem>

                  <MenuItem value="I">
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px",
                        width: "100%",
                      }}
                    >
                      <LoopIcon /> <span>In Bearbeitung</span>
                    </Typography>
                  </MenuItem>
                  <MenuItem value="A">
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px",
                        width: "100%",
                      }}
                    >
                      <SyncProblemIcon />
                      <span>Abgebrochen</span>
                    </Typography>
                  </MenuItem>
                  <MenuItem value="D">
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px",
                        width: "100%",
                      }}
                    >
                      <CheckIcon />
                      <span>Gesendet</span>
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.username || ""}
                variant="outlined"
                size="small"
                label="Benutzername"
                name="username"
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.itemNumber || ""}
                variant="outlined"
                size="small"
                label="Datensatznummer"
                name="itemNumber"
              />
            </Grid>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="bookingType">Buchungstyp</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="bookingType"
                  id="demo-select-small"
                  value={filterVal?.bookingType || ""}
                  label="Buchungstyp"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, bookingType: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                      None
                    </Typography>
                  </MenuItem>
                  {Object.entries(bookingTypes)?.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item[0]}>
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {item[1]?.Caption}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="itemType">Itemtyp</InputLabel>
                <Select
                  // sx={{ width: "100%" }}
                  labelId="itemType"
                  id="demo-select-small"
                  value={filterVal?.itemType || ""}
                  label="Itemtyp"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, itemType: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                      None{" "}
                    </Typography>
                  </MenuItem>
                  <MenuItem value={"Order"}>
                    <Typography sx={{ fontSize: "0.7rem" }}>
                      Auftrag{" "}
                    </Typography>
                  </MenuItem>
                  <MenuItem value={"Meter"}>
                    <Typography sx={{ fontSize: "0.7rem" }}>Zähler </Typography>
                  </MenuItem>
                  <MenuItem value={"Vehicle"}>
                    <Typography sx={{ fontSize: "0.7rem" }}>KFZ </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  sx={{ width: "100%" }}
                  label="Datum (von)"
                  size="small"
                  format="DD.MM.YYYY"
                  name="dateFrom"
                  onChange={(newVal) => {
                    setFilterVal({
                      ...filterVal,
                      dateFrom: new Date(newVal?.$d),
                    });
                  }}
                  value={filterVal.dateFrom}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  sx={{ width: "100%" }}
                  label="Datum (bis)"
                  size="small"
                  format="DD.MM.YYYY"
                  name="dateTo"
                  onChange={(newVal) =>
                    setFilterVal({
                      ...filterVal,
                      dateTo: new Date(newVal?.$d),
                    })
                  }
                  value={filterVal.dateTo}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={2}>
              <TimeInput
                name="timeFrom"
                label="Uhrzeit (von)"
                filterVal={filterVal}
                setFilterVal={setFilterVal}
                value={filterVal?.timeFrom}
              />
            </Grid>
            {/*   <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.timeTo || ""}
                className={"date-input"}
                variant="outlined"
                type="time"
                size="small"
                label="Uhrzeit (bis)"
                name="timeTo"
                sx={filterStyles.textField}
                inputProps={{
                  sx: {
                    cursor: "pointer",
                    "&::-webkit-datetime-edit-year-field": {
                      color: filterVal.timeTo ? "auto" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&:focus": {
                      "&::-webkit-datetime-edit-year-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-month-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-day-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-minute-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-hour-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-text": {
                        color: "dateInputColor.main",
                      },
                    },
                  },
                }}
              />
            </Grid> */}
            <Grid item md={2}>
              <TimeInput
                name="timeTo"
                label="Uhrzeit (bis)"
                filterVal={filterVal}
                setFilterVal={setFilterVal}
                value={filterVal?.timeTo}
              />
            </Grid>
            <Grid item md={2} />
            {/* <Grid item md={2} /> */}
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.street || ""}
                variant="outlined"
                size="small"
                label="Straße"
                name="street"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.streetnumber || ""}
                variant="outlined"
                size="small"
                label="Hausnummer"
                name="streetnumber"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.zip || ""}
                variant="outlined"
                size="small"
                label="PLZ"
                name="zip"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.city || ""}
                variant="outlined"
                size="small"
                label="Stadt"
                name="city"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.country || ""}
                variant="outlined"
                size="small"
                label="Land"
                name="country"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.data1 || ""}
                variant="outlined"
                size="small"
                label="Daten 1"
                name="data1"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.data2 || ""}
                variant="outlined"
                size="small"
                label="Daten 2"
                name="data2"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.data3 || ""}
                variant="outlined"
                size="small"
                label="Daten 3"
                name="data3"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.data4 || ""}
                variant="outlined"
                size="small"
                label="Daten 4"
                name="data4"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.data5 || ""}
                variant="outlined"
                size="small"
                label="Daten 5"
                name="data5"
              />
            </Grid>
          </Grid>

          <div style={filterStyles.buttonWrapper}>
            <Button
              type="submit"
              color="secondary"
              sx={filterStyles.button}
              variant="contained"
              onClick={(e) => handleFilter(e)}
            >
              {" "}
              Suchen{" "}
            </Button>
            <Button
              color="secondary"
              sx={filterStyles.button}
              variant="contained"
              onClick={() => handleReset()}
            >
              {" "}
              Löschen{" "}
            </Button>
          </div>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BookingsFilter;
