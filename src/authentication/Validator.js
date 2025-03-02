export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6; 
  };
  
  export const validateUsername = (username) => {
    return username.length >= 3; 
  };
  
  export const validateForm = (formData, isLogin = false) => {
    const { username, email, password } = formData;
    const errors = {};
  
    if (!isLogin && !validateUsername(username)) {
      errors.username = "Username must be at least 3 characters long.";
    }
  
    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
  
    if (!validatePassword(password)) {
      errors.password = "Password must be at least 6 characters long.";
    }
  
    return errors;
  };