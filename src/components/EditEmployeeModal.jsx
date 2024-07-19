import axios from "axios";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px black;
  width: 100%;
  max-width: 24rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px black;
  }
`;

const SelectField = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #dc2626;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
`;

const CancelButton = styled(Button)`
  background-color: #6b7280;
  color: white;
`;

const SaveButton = styled(Button)`
  background-color: blue;
  color: white;
`;

const EditEmployeeModal = ({ employee, onClose, onUpdate }) => {
  const [initialValues] = useState({
    name: employee.name,
    email: employee.email,
    position: employee.position,
    department: employee.department,
    startDate: employee.startDate,
  });

  const onSubmit = async (values) => {
    try {
      await axios.put(
        `http://localhost:4000/api/employees/${employee.id}`,
        values
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Update error", error);
    }
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalTitle>Edit Employee</ModalTitle>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormField>
                <Label>Name</Label>
                <Field name="name">
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
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <InputField {...input} type="email" placeholder="Email" />
                      {meta.touched && meta.error && (
                        <ErrorMessage>{meta.error}</ErrorMessage>
                      )}
                    </div>
                  )}
                </Field>
              </FormField>
              <FormField>
                <Label>Position</Label>
                <Field name="position">
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
                <SelectField name="department" component="select">
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </SelectField>
              </FormField>
              <FormField>
                <Label>Start Date</Label>
                <Field name="startDate">
                  {({ input, meta }) => (
                    <div>
                      <InputField
                        {...input}
                        type="date"
                        placeholder="Start Date"
                      />
                      {meta.touched && meta.error && (
                        <ErrorMessage>{meta.error}</ErrorMessage>
                      )}
                    </div>
                  )}
                </Field>
              </FormField>
              <div style={{ textAlign: "right" }}>
                <CancelButton type="button" onClick={onClose}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit">Save</SaveButton>
              </div>
            </form>
          )}
        />
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EditEmployeeModal;
