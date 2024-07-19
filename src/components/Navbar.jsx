import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: #2563eb;
  padding: 1rem 2rem;
`;

const NavContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.div`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  margin-right: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  color: #ffffff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate("/login");
  };

  return (
    <StyledNav>
      <NavContainer>
        <Brand>Employee Portal</Brand>
        <div>
          {auth?.role === "admin" && (
            <NavLink to="/new-employee">Add New Employee</NavLink>
          )}
          {auth.isLoggedIn && (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          )}
        </div>
      </NavContainer>
    </StyledNav>
  );
};

export default Navbar;
