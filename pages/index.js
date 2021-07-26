import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogContent,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
  Button,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Add as AddIcon } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import EnhancedTable from "../src/ui/EnhancedTable";

const useStyles = makeStyles(theme => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: "#fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
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
      "$1500",
      true
    ),
    createData(
      "Bill Gates",
      "10/17/21",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600",
      true
    ),
    createData(
      "Steve Jobs",
      "2/13/21",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication, File Transfer",
      "Low",
      "iOS, Android",
      "10-100",
      "$2050",
      true
    ),
    createData(
      "Albert Einstein",
      "5/13/21",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication, File Transfer",
      "Low",
      "Android",
      "10-100",
      "$2050",
      true
    ),
    createData(
      "Chris Diorio",
      "4/20/21",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication, File Transfer",
      "Low",
      "iOS",
      "10-100",
      "$2050",
      true
    ),
  ]);

  const platformOptions = ["Web", "iOS", "Android"];
  var featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

  var websiteOptions = ["Basic", "Interactive", "E-Commerce"];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = event => {
    setSearch(event.target.value);

    const rowData = rows.map(row =>
      Object.values(row).filter(option => option !== true && option !== false)
    );

    const matches = rowData.map(row =>
      row.map(option =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  const serviceQuestions = (
    <React.Fragment>
      <Grid item style={{ marginTop: matchesSM ? 20 : "5em" }}>
        <Typography variant="h4">Service</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="service"
          name="service"
          value={service}
          onChange={event => {
            setService(event.target.value);
            setFeatures([]);
          }}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Website"
            label="Website"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Mobile App"
            label="Mobile App"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Custom Software"
            label="Custom Software"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </React.Fragment>
  );

  const complexityQuestions = (
    <Grid item style={{ marginBottom: matchesSM ? 50 : null }}>
      <Grid
        item
        container
        direction="column"
        alignItems={matchesSM ? "center" : undefined}
        style={{ marginTop: matchesSM ? 50 : "5em" }}
      >
        <Grid item style={{ marginTop: matchesSM ? 20 : null }}>
          <Typography variant="h4">Complexity</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            aria-label="complexity"
            name="complexity"
            value={complexity}
            onChange={event => setComplexity(event.target.value)}
          >
            <FormControlLabel
              disabled={service === "Website"}
              classes={{ label: classes.service }}
              value="Low"
              label="Low"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{ label: classes.service }}
              value="Medium"
              label="Medium"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{ label: classes.service }}
              value="High"
              label="High"
              control={<Radio />}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  const usersQuestions = (
    <Grid item>
      <Grid
        item
        container
        direction="column"
        alignItems={matchesSM ? "center" : undefined}
        style={{ marginTop: matchesSM ? 50 : "5em" }}
      >
        <Grid item style={{ marginTop: matchesSM ? 20 : null }}>
          <Typography variant="h4">Users</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            aria-label="users"
            name="users"
            value={users}
            onChange={event => setUsers(event.target.value)}
          >
            <FormControlLabel
              disabled={service === "Website"}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
              value="0-10"
              label="0-10"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
              value="10-100"
              label="10-100"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
              value="100+"
              label="100+"
              control={<Radio />}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="column"
        alignItems={matchesSM ? "center" : undefined}
      >
        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}
        >
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search project details or create a new entry."
            value={search}
            onChange={handleSearch}
            style={{
              width: matchesSM ? "25em" : "35em",
              marginLeft: matchesSM ? 0 : "5em",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: "pointer" }}
                  onClick={() => setDialogOpen(true)}
                >
                  <AddIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          style={{ marginLeft: matchesSM ? 0 : "5em", marginTop: "2em" }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesSM ? "column" : "row"}
              justifyContent={matchesSM ? "center" : undefined}
            >
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={websiteChecked}
                      color="primary"
                      onChange={() => setWebsiteChecked(!websiteChecked)}
                    />
                  }
                  label="Websites"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={iOSChecked}
                      color="primary"
                      onChange={() => setiOSChecked(!iOSChecked)}
                    />
                  }
                  label="iOS Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={androidChecked}
                      color="primary"
                      onChange={() => setAndroidChecked(!androidChecked)}
                    />
                  }
                  label="Android Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={softwareChecked}
                      color="primary"
                      onChange={() => setSoftwareChecked(!softwareChecked)}
                    />
                  }
                  label="Custom Software"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid
          item
          style={{
            marginTop: "5em",
            maxWidth: "100%",
            marginBottom: matchesMD ? "40em" : "35em",
          }}
        >
          <EnhancedTable
            rows={rows}
            page={page}
            setPage={setPage}
            setRows={setRows}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullScreen={matchesSM}
          style={{ zIndex: 1302 }}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid
              container
              justifyContent="space-between"
              direction={matchesSM ? "column" : "row"}
            >
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems={matchesSM ? "center" : undefined}
                  sm
                >
                  <Hidden mdUp>{serviceQuestions}</Hidden>
                  <Hidden mdUp>{usersQuestions}</Hidden>
                  <Hidden mdUp>{complexityQuestions}</Hidden>
                  <Grid item>
                    <TextField
                      fullWidth={!matchesSM}
                      style={{ width: matchesSM ? 250 : undefined }}
                      label="Name"
                      id="name"
                      value={name}
                      onChange={event => setName(event.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    alignItems={matchesSM ? "center" : undefined}
                  >
                    <Hidden smDown>{serviceQuestions}</Hidden>
                    <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                      <Select
                        MenuProps={{
                          style: { zIndex: 1302 },
                          getContentAnchorEl: () => null,
                        }}
                        style={{ width: matchesSM ? 250 : "12em" }}
                        labelId="platforms"
                        id="platforms"
                        disabled={service === "Website"}
                        multiple
                        displayEmpty
                        renderValue={
                          platforms.length > 0 ? undefined : () => "Platforms"
                        }
                        value={platforms}
                        onChange={event => setPlatforms(event.target.value)}
                      >
                        {platformOptions.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems="center"
                  style={{ marginTop: 16 }}
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <KeyboardDatePicker
                      style={{ width: matchesSM ? 250 : undefined }}
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={newDate => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Hidden smDown>{complexityQuestions}</Hidden>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems={matchesSM ? "center" : undefined}
                  sm
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <TextField
                      style={{ width: matchesSM ? 250 : undefined }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      value={total}
                      id="total"
                      label="Total"
                      onChange={event => setTotal(event.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{ alignSelf: matchesSM ? "center" : "flex-end" }}
                  >
                    <Hidden smDown>{usersQuestions}</Hidden>
                  </Grid>
                  <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                    <Select
                      MenuProps={{
                        style: { zIndex: 1302 },
                        getContentAnchorEl: () => null,
                      }}
                      labelId="features"
                      style={{ width: matchesSM ? 250 : "12em" }}
                      id="features"
                      multiple
                      displayEmpty
                      renderValue={
                        features.length > 0 ? undefined : () => "Features"
                      }
                      value={features}
                      onChange={event => setFeatures(event.target.value)}
                    >
                      {service === "Website"
                        ? (featureOptions = websiteOptions)
                        : null}
                      {featureOptions.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "3em" }}
            >
              <Grid item>
                <Button
                  onClick={() => setDialogOpen(false)}
                  color="primary"
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
