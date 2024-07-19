import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import Navbar from "./Navbar";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 2rem;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #dc2626;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
`;

const departmentOptions = [
  { value: "", label: "Select department" },
  { value: "HR", label: "HR" },
  { value: "Engineering", label: "Engineering" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
];

const NewEmployeeForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await axios.post("http://localhost:4000/api/employees", values);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <>
      <Navbar />

      <PageContainer>
        <FormContainer>
          <FormTitle>Add New Employee</FormTitle>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FormField>
                  <Label>Name</Label>
                  <Field
                    name="name"
                    validate={(value) => (value ? undefined : "Required")}
                  >
                    {({ input, meta }) => (
                      <div>
                        <InputField {...input} type="text" placeholder="Name" />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </div>
                    )}
                  </Field>
                </FormField>
                <FormField>
                  <Label>Email</Label>
                  <Field
                    name="email"
                    validate={(value) => (value ? undefined : "Required")}
                  >
                    {({ input, meta }) => (
                      <div>
                        <InputField
                          {...input}
                          type="email"
                          placeholder="Email"
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </div>
                    )}
                  </Field>
                </FormField>
                <FormField>
                  <Label>Position</Label>
                  <Field
                    name="position"
                    validate={(value) => (value ? undefined : "Required")}
                  >
                    {({ input, meta }) => (
                      <div>
                        <InputField
                          {...input}
                          type="text"
                          placeholder="Position"
                        />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </div>
                    )}
                  </Field>
                </FormField>
                <FormField>
                  <Label>Department</Label>
                  <Field
                    name="department"
                    validate={(value) => (value ? undefined : "Required")}
                  >
                    {({ input, meta }) => (
                      <div>
                        <SelectField {...input}>
                          {departmentOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </SelectField>
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </div>
                    )}
                  </Field>
                </FormField>
                <FormField>
                  <Label>Start Date</Label>
                  <Field
                    name="startDate"
                    validate={(value) => (value ? undefined : "Required")}
                  >
                    {({ input, meta }) => (
                      <div>
                        <InputField {...input} type="date" />
                        {meta.touched && meta.error && (
                          <ErrorMessage>{meta.error}</ErrorMessage>
                        )}
                      </div>
                    )}
                  </Field>
                </FormField>
                <div style={{ textAlign: "right" }}>
                  <SubmitButton type="submit">Save</SubmitButton>
                </div>
              </form>
            )}
          />
        </FormContainer>
      </PageContainer>
    </>
  );
};

export default NewEmployeeForm;
