import { useReducer, useState } from "react";

import {
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Checkbox,
  FormGroup,
  InputAdornment,
  IconButton,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const validation = (state,data) => {
  const isEmpty = {
    fname: data.fname.length === 0,
    lname: data.lname.length === 0,
    email: data.email.length === 0,
    pwd: data.pwd.length === 0,
    dob: data.dob.length === 0,
    gender: data.gender.length === 0,
    country: data.country.length === 0,
    program: data.program.length === 0,
    textArea: data.textArea.length === 0,
  };

  return {
    ...data,
    showPassword:state.pwd,
    isEmpty,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "submit": {
      console.log(action.data);

      return validation(state,action.data);
    }
    case "setGender": {
      return { ...state, gender: action.payload };
    }
    case "setCountry": {
      return { ...state, country: action.payload };
    }
    case "setProgram": {
      return { ...state, program: action.payload };
    }
    case "setShowPassword": {
      return { ...state, showPassword: action.payload };
    }
    default: {
      console.log("no dispatch found");
      return { ...state };
    }
  }
};

const initialState = {
  fname: "",
  lname: "",
  email: "",
  pwd: "",
  dob: "",
  gender: "",
  country: [],
  program: [],
  textArea: "",
  showPassword: false,
  isEmpty: {},
};

const MuiRegForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const pwdValidatorMsg = (pwd) => {
    // console.log({ state, pwd });
    if (!pwd) return "";
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let num = /[0-9]/;
    let capital = /[A-Z]/;

    const msg = [
      "Special Characters Required",
      "Numbers required",
      "Capitals required",
      "Min 8 characters Required",
    ];

    return (
      <>
        {spChars.test(pwd) ? (
          <>
            <CheckCircleIcon sx={{ color: "green" }} />
            {msg[0]}
          </>
        ) : (
          <>
            <CancelIcon sx={{ color: "red" }} />
            {msg[0]}
          </>
        )}
        <br />
        {num.test(pwd) ? (
          <>
            <CheckCircleIcon sx={{ color: "green" }} />
            {msg[1]}
          </>
        ) : (
          <>
            <CancelIcon sx={{ color: "red" }} />
            {msg[1]}
          </>
        )}
        <br />
        {capital.test(pwd) ? (
          <>
            <CheckCircleIcon sx={{ color: "green" }} />
            {msg[2]}
          </>
        ) : (
          <>
            <CancelIcon sx={{ color: "red" }} />
            {msg[2]}
          </>
        )}
        <br />
        {pwd.length >= 8 ? (
          <>
            <CheckCircleIcon sx={{ color: "green" }} />
            {msg[3]}
          </>
        ) : (
          <>
            <CancelIcon sx={{ color: "red" }} />
            {msg[3]}
          </>
        )}
      </>
    );
  };

  const selectHandler = (e) => {
    dispatch({ type: "setProgram", payload: e.target.value });
  };

  const showPasswordHandler = () => {
    dispatch({ type: "setShowPassword", payload: !state.showPassword });
  };

  const radioHandler = (e) => {
    dispatch({ type: "setGender", payload: e.target.value });
  };

  const checkBoxHandler = (event) => {
    const index = state.country.indexOf(event.target.value);
    if (index === -1) {
      dispatch({
        type: "setCountry",
        payload: [...state.country, event.target.value],
      });
    } else {
      dispatch({
        type: "setCountry",
        payload: state.country.filter(
          (checkbox) => checkbox !== event.target.value
        ),
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "submit",
      data: {
        fname: e.target.fname.value,
        lname: e.target.lname.value,
        email: e.target.email.value,
        pwd: e.target.password.value,
        dob: e.target.dob.value,
        gender: state.gender,
        country: state.country,
        program: state.program,
        textArea: e.target.textArea.value,
      },
    });
  };

  return (
    <>
      <Paper
        sx={{
          // backgroundColor:'green',
          width: "500px",
          margin: "10px auto",
          padding: "20px",
        }}
        elevation={3}
      >
        <form onSubmit={submitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="filled"
                name="fname"
                error={state?.isEmpty.fname}
                helperText={state?.isEmpty.fname ? "*First Name required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="filled"
                name="lname"
                error={state?.isEmpty.lname}
                helperText={state?.isEmpty.lname ? "*Last Name required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={state?.isEmpty.email}
                helperText={state?.isEmpty.email ? "*email required" : ""}
                fullWidth
                label="Email"
                variant="filled"
                type="email"
                name="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                error={state?.isEmpty.pwd}
                helperText={
                  state?.isEmpty.pwd
                    ? "*Password Required"
                    : pwdValidatorMsg(state.pwd)
                }
                name="password"
                type={state.showPassword ? "text" : "password"}
                label="password"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPasswordHandler}>
                        {state.showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                name="dob"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl error={state?.isEmpty.gender}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  value={state.gender}
                  name="gender"
                  onChange={radioHandler}
                  row
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                {state?.isEmpty.gender && (
                  <FormHelperText>*gender required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={state?.isEmpty.country}>
                <FormLabel>country</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="country"
                        value="India"
                        checked={state.country.includes("India")}
                        onChange={checkBoxHandler}
                      />
                    }
                    label="India"
                  />
                  <FormControlLabel
                    value="others"
                    control={
                      <Checkbox
                        name="country"
                        checked={state.country.includes("others")}
                        onChange={checkBoxHandler}
                      />
                    }
                    label="others"
                  />
                </FormGroup>
                {state?.isEmpty.country && (
                  <FormHelperText>*country required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Select Program"
                fullWidth
                select
                value={state.program}
                onChange={selectHandler}
                SelectProps={{ multiple: true }}

                // error
              >
                <MenuItem value="UG">UG</MenuItem>
                <MenuItem value="PG">PG</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                multiline
                rows={4}
                label="Why do you want this course?"
                name="textArea"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default MuiRegForm;
