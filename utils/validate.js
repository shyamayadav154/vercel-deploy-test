export const validate = (values,confirmPassword) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const pregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/i;
  if (!values.first_name) {
    errors.first_name = 'First Name is required!';
  }
  if (!values.last_name) {
    errors.last_name = 'Last Name is required!';
  }
  if (!values.email) {
    errors.email = 'Email is required!';
  } else if (!regex.test(values.email)) {
    errors.email = 'This is not a valid email format!';
  }
  if (!values.birth_date) {
    errors.birth_date = 'Date of birth is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!pregex.test(values.password)) {
    errors.password = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol and 1 number'
  }

  //  else if (values.password.length < 5) {
  //   errors.password = 'Password must be more than 5 characters';
  // } else if (values.password.length > 15) {
  //   errors.password = 'Password cannot exceed more than 15 characters';
  // }


  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required!';
  } else if (values.password != confirmPassword) {
    errors.confirmPassword = 'Password do not match';
  }
  return errors;
};
