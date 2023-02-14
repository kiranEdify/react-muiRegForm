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

const reducer = (state, action) => {
  switch (action.type) {
    case "submit": {
      console.log(action.data);
      return {...state}
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
    default:{
      console.log('no dispatch found')
      return {...state}
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
};

const MuiRegForm = () => {
  // const [gender, setGender] = useState("");
  // const [country, setCountry] = useState([]);
  // const [showPassword, setShowPassword] = useState(false);
  // const [program, setProgram] = useState([]);

  const [isEmpty, setIsEmpty] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log({ state });

  const pwdValidatorMsg = () => {
    return (
      <>
        <h2>hello</h2>
      </>
    );
  };

  const selectHandler = (e) => {
    // setProgram(e.target.value);
    dispatch({ type: "setProgram", payload: e.target.value });
  };
  // console.log(program);

  const showPasswordHandler = () => {
    // setShowPassword((show) => !show);
    dispatch({ type: "setShowPassword", payload: !state.showPassword });
  };

  // console.log({ gender, country });

  const radioHandler = (e) => {
    // setGender(e.target.value);
    dispatch({ type: "setGender", payload: e.target.value });
  };

  const checkBoxHandler = (event) => {
    const index = state.country.indexOf(event.target.value);
    if (index === -1) {
      // setCountry([...country, event.target.value]);
      dispatch({
        type: "setCountry",
        payload: [...state.country, event.target.value],
      });
    } else {
      // setCountry(country.filter((checkbox) => checkbox != event.target.value));
      dispatch({
        type: "setCountry",
        payload: [
          state.country.filter((checkbox) => checkbox !== event.target.value),
        ],
      });
    }
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const isEmpty = {
  //     fname: e.target.fname.value.length === 0,
  //     lname: e.target.lname.value.length === 0,
  //     email: e.target.email.value.length === 0,
  //     pwd: e.target.password.value.length === 0,
  //     dob: e.target.dob.value.length === 0,
  //     gender: gender.length === 0,
  //     country: country.length === 0,
  //     program: program.length === 0,
  //   };
  //   setIsEmpty({ ...isEmpty });

  //   console.log(e, isEmpty);

  // };

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
      }
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
                error={isEmpty?.fname}
                helperText={isEmpty?.fname ? "*First Name required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="filled"
                name="lname"
                error={isEmpty?.lname}
                helperText={isEmpty?.lname ? "*Last Name required" : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={isEmpty?.email}
                helperText={isEmpty?.email ? "*email required" : ""}
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
                error={isEmpty?.pwd}
                helperText={isEmpty?.pwd ? "*Password Required" : ""}
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
              <FormControl error={isEmpty?.gender}>
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
                {isEmpty?.gender && (
                  <FormHelperText>*gender required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={isEmpty?.country}>
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
                {isEmpty?.country && (
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
