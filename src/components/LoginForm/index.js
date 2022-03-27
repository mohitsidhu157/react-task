import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
// import Alert from "src/components/Alert";
// import { loginAdmin } from "src/api";
// import { CONSTANTS } from "src/commons";
import { TEXTS } from "../../constants/texts";

const SignupForm = ({ addLoginDetails, user, startLoading, stopLoading }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user?.access_token) {
  //     navigate(CONSTANTS.ROUTES.PRIVATE_ROUTES.DASHBOARD, {
  //       replace: true,
  //     });
  //   }
  // }, [user]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email(TEXTS.INVALID_EMAIL)
                .max(255)
                .required(TEXTS.EMAIL_REQUIRED),
              password: Yup.string().max(255).required(TEXTS.PASSWORD_REQUIRED),
            })}
            onSubmit={async (values) => {
              // try {
              //   startLoading();
              //   const res = await loginAdmin(values);
              //   const isError = res.status !== 200;
              //   stopLoading();
              //   setSnackbarState({
              //     open: true,
              //     message: res.message,
              //     severity: isError ? "error" : "success",
              //   });
              //   if (!isError) {
              //     addLoginDetails(res.data);
              //   }
              // } catch (err) {
              //   setSnackbarState({
              //     open: true,
              //     message: err.message,
              //     severity: "error",
              //   });
              // }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Log In
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Log In
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Typography color="textSecondary" variant="body1">
            Don't Have an account?{" "}
            <Link component={RouterLink} to="/register" variant="h6">
              Sign Up
            </Link>
          </Typography>
          <Snackbar
            open={snackbarState.open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            {/* <Alert onClose={handleClose} severity={snackbarState.severity}>
              {snackbarState.message}
            </Alert> */}
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default SignupForm;
