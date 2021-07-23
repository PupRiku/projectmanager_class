import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles(theme => ({}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total
) {
  return { name, date, service, features, complexity, platforms, users, total };
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [rows, setRows] = useState([
    createData(
      "Zachary Reese",
      "7/23/21",
      "Website",
      "eCommerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500"
    ),
    createData(
      "Bill Gates",
      "10/17/21",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600"
    ),
    createData(
      "Steve Jobs",
      "2/13/21",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication, File Transfer",
      "Low",
      "Web Application",
      "10-100",
      "$2050"
    ),
  ]);

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);

  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
        <Typography variant="h1">Projects</Typography>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Search project details or create a new entry."
          style={{ width: "35em", marginLeft: "5em" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{ fontSize: 30 }}>
                <AddIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
        <FormGroup row>
          <FormControlLabel
            style={{ marginRight: "5em" }}
            control={
              <Switch
                checked={websiteChecked}
                color="primary"
                onChange={() => setWebsiteChecked(!websiteChecked)}
              />
            }
            label="Websites"
            labelPlacement="start"
          />
          <FormControlLabel
            style={{ marginRight: "5em" }}
            control={
              <Switch
                checked={iOSChecked}
                color="primary"
                onChange={() => setiOSChecked(!iOSChecked)}
              />
            }
            label="iOS Apps"
            labelPlacement="start"
          />
          <FormControlLabel
            style={{ marginRight: "5em" }}
            control={
              <Switch
                checked={androidChecked}
                color="primary"
                onChange={() => setAndroidChecked(!androidChecked)}
              />
            }
            label="Android Apps"
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Switch
                checked={softwareChecked}
                color="primary"
                onChange={() => setSoftwareChecked(!softwareChecked)}
              />
            }
            label="Custom Software"
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>
      <Grid
        item
        container
        justifyContent="flex-end"
        style={{ marginTop: "5em" }}
      >
        <Grid item style={{ marginRight: 75 }}>
          <FilterListIcon color="secondary" style={{ fontSize: 50 }} />
        </Grid>
      </Grid>
      <Grid item style={{ marginBottom: "15em" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Features</TableCell>
                <TableCell align="center">Complexity</TableCell>
                <TableCell align="center">Platforms</TableCell>
                <TableCell align="center">Users</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.service}</TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    {row.features}
                  </TableCell>
                  <TableCell align="center">{row.complexity}</TableCell>
                  <TableCell align="center">{row.platforms}</TableCell>
                  <TableCell align="center">{row.users}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
