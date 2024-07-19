import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import EditEmployeeModal from "./EditEmployeeModal";
import Navbar from "./Navbar";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;
`;

const DashboardContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  width: 100%;
  max-width: 320px;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.th`
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
`;

const TableCell = styled.td`
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  color: ${({ color }) => (color === "blue" ? "#3b82f6" : "#ef4444")};
  cursor: pointer;
  &:hover {
    color: ${({ color }) => (color === "blue" ? "#2563eb" : "#f87171")};
  }
`;

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees?.filter((employee) =>
    employee?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = () => {
    axios
      .get("http://localhost:4000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = async (employeeId) => {
    await axios.delete(`http://localhost:4000/api/employees/${employeeId.id}`);
    setEmployees(employees.filter((employe) => employe.id !== employeeId));
  };

  return (
    <Container>
      <Navbar />
      <DashboardContainer>
        <PageTitle>Employee Dashboard</PageTitle>
        <div style={{ marginBottom: "1rem" }}>
          <SearchInput
            type="text"
            placeholder="Search employees"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table>
            <thead>
              <tr>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Start Date</TableHead>
                {auth?.role === "admin" && <TableHead>Actions</TableHead>}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-100">
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.startDate}</TableCell>
                  {auth?.role === "admin" && (
                    <TableCell>
                      <ActionButton
                        color="blue"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton
                        color="red"
                        onClick={() => handleDelete(employee)}
                      >
                        Delete
                      </ActionButton>
                    </TableCell>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </DashboardContainer>
      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(false)}
          onUpdate={handleUpdate}
        />
      )}
    </Container>
  );
};

export default Dashboard;
