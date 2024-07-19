import axios from "axios";
import { useContext, useEffect } from "react";
import { Field, Form } from "react-final-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const StyledFormContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: #dc2626;
`;

const Login = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("dashboard");
    }
  }, [auth.isLoggedIn]);

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        values
      );
      localStorage.setItem("token", response.data.token);
      const { token, role, isLoggedIn } = response.data || {};
      setAuth({ ...auth, token, role, isLoggedIn });
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  return (
    <StyledContainer>
      <StyledFormContainer>
        <StyledTitle>Login</StyledTitle>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <StyledInput
                        {...input}
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                      {meta.touched && meta.error && (
                        <ErrorMessage>{meta.error}</ErrorMessage>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <StyledInput
                        {...input}
                        id="password"
                        type="password"
                        placeholder="Password"
                      />
                      {meta.touched && meta.error && (
                        <ErrorMessage>{meta.error}</ErrorMessage>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <StyledButton type="submit">Login</StyledButton>
            </form>
          )}
        />
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Login;
