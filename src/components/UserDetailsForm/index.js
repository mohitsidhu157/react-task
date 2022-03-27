import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { TEXTS } from "src/constants/texts";

const SignupForm = ({
  handleSubmit = () => {},
  title = "",
  btnTitle = "",
  renderFooter = () => {},
  values = {
    email: "",
    password: "",
    name: "",
  },
}) => {
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
            initialValues={values}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(20)
                .min(2)
                .required(TEXTS.FULL_NAME_REQUIRED),
              email: Yup.string()
                .email(TEXTS.INVALID_EMAIL)
                .max(255)
                .required(TEXTS.EMAIL_REQUIRED),
              password: Yup.string().max(255).required(TEXTS.PASSWORD_REQUIRED),
            })}
            onSubmit={handleSubmit}
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
                    {title}
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Full name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                />
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
                    {btnTitle}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {renderFooter()}
        </Container>
      </Box>
    </>
  );
};

export default SignupForm;
