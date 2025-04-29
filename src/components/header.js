import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { LogIn, UserPlus, ChevronDown, Menu, LogOut } from "lucide-react";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css"; // Import Amplify UI styles
import logo from "../assets/img/logo.png";
import { generateClient } from "aws-amplify/api";
import { getUser } from '../graphql/queries.js';

// Enhanced Navbar with Authentication
const EnhancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const client = generateClient();

  const toggle = () => setIsOpen(!isOpen);
  const toggleAuthModal = () => setShowAuthModal(!showAuthModal);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthState();
  }, []);

  // Function to check if user is authenticated
  const checkAuthState = async () => {
    try {
      const { sub } = await fetchUserAttributes();
      //fetch user from the backend
      const resp = await client.graphql({
        query: getUser,
        variables: { id: sub }
      })
      const user = resp.data.getUser
      setIsAuthenticated(true);
      setUsername(user.name);
    } catch (error) {
      setIsAuthenticated(false);
      setUsername("");
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUsername("");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Handle scroll for transparent/solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`py-3 transition-all ${
          scrolled
            ? "navbar-light bg-white shadow"
            : "navbar-dark bg-transparent"
        }`}
      >
        <Container className="px-4">
          <NavbarBrand href="/" className="d-flex align-items-center">
            <div className="logo-container me-2">
              <img
                src={logo}
                alt="Department Logo"
                className="logo-img"
                width="40"
                height="40"
              />
            </div>
            <div
              className={`brand-text ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              <div className="fw-bold fs-4 mb-0 lh-1">Reception</div>
              <div className="small text-uppercase">E-Follow-Up</div>
            </div>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} className="border-0">
            <Menu size={24} color={scrolled ? "#333333" : "#ffffff"} />
          </NavbarToggler>

          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <NavLink
                  href="#about"
                  className={`px-3 fw-medium nav-link ${
                    scrolled ? "text-dark" : "text-white"
                  }`}
                >
                  About
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="#first-visit"
                  className={`px-3 fw-medium nav-link ${
                    scrolled ? "text-dark" : "text-white"
                  }`}
                >
                  First Visit
                </NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  className={`px-3 fw-medium d-flex align-items-center ${
                    scrolled ? "text-dark" : "text-white"
                  }`}
                >
                  Resources <ChevronDown size={16} className="ms-1" />
                </DropdownToggle>
                <DropdownMenu right className="border-0 shadow">
                  <DropdownItem href="#staying-connected">
                    Staying Connected
                  </DropdownItem>
                  <DropdownItem href="#values">Our Values</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#team">Our Team</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <NavLink
                  href="/register"
                  className={`px-3 fw-medium nav-link ${
                    scrolled ? "text-dark" : "text-white"
                  }`}
                >
                  Self Registration
                </NavLink>
              </NavItem>

              {isAuthenticated && (
                <>
                  <NavItem>
                    <NavLink
                      href="/members"
                      className={`px-3 fw-medium nav-link ${
                        scrolled ? "text-dark" : "text-white"
                      }`}
                    >
                      Members
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      href="/followup"
                      className={`px-3 fw-medium nav-link ${
                        scrolled ? "text-dark" : "text-white"
                      }`}
                    >
                      Follow Up
                    </NavLink>
                  </NavItem>
                </>
              )}

              <NavItem>
                <NavLink
                  href="#contact"
                  className={`px-3 fw-medium nav-link ${
                    scrolled ? "text-dark" : "text-white"
                  }`}
                >
                  Contact
                </NavLink>
              </NavItem>
            </Nav>

            <Nav className="ms-auto" navbar>
              {!isAuthenticated ? (
                <>
                  <NavItem className="me-2">
                    <Button
                      color={scrolled ? "outline-primary" : "outline-light"}
                      size="sm"
                      className="rounded-pill px-3 py-2 fw-medium d-flex align-items-center"
                      href="/register"
                    >
                      <UserPlus size={16} className="me-2" /> Register
                    </Button>
                  </NavItem>
                  <NavItem>
                    <Button
                      color={scrolled ? "primary" : "light"}
                      size="sm"
                      className="rounded-pill px-3 py-2 fw-medium d-flex align-items-center"
                      onClick={toggleAuthModal}
                    >
                      <LogIn size={16} className="me-2" /> Sign In
                    </Button>
                  </NavItem>
                </>
              ) : (
                <>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle
                      nav
                      className={`px-3 fw-medium d-flex align-items-center ${
                        scrolled ? "text-dark" : "text-white"
                      }`}
                    >
                      Welcome, {username}
                    </DropdownToggle>
                    <DropdownMenu right className="border-0 shadow">
                      <DropdownItem href="/profile">My Profile</DropdownItem>
                      <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={handleSignOut}>
                        <div className="d-flex align-items-center text-danger">
                          <LogOut size={16} className="me-2" /> Sign Out
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      {/* Authentication Modal */}
      <Modal
        isOpen={showAuthModal}
        toggle={toggleAuthModal}
        className="auth-modal"
      >
        <ModalHeader toggle={toggleAuthModal}>
          Sign In or Create Account
        </ModalHeader>
        <ModalBody>
          <Authenticator
            // Optional custom components and configurations
            initialState="signIn"
            services={{
              handleSignUp: async (formData) => {
                // You could add custom sign-up logic here if needed
                return formData;
              },
            }}
            components={
              {
                // Optionally customize UI components
              }
            }
          >
            {({ signOut, user }) => {
              // This code runs when authentication is successful
              // Close the modal and update state
              if (user) {
                setIsAuthenticated(true);
                setUsername(user.username);
                setShowAuthModal(false);
                return null;
              }
              return null;
            }}
          </Authenticator>
        </ModalBody>
      </Modal>

      <style jsx>{`
        /* Enhanced Navbar Styles */
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-img {
          border-radius: 8px;
          object-fit: cover;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .navbar {
          padding-top: 15px;
          padding-bottom: 15px;
        }

        .navbar.shadow {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08) !important;
        }

        .nav-link {
          position: relative;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #007bff !important;
        }

        .nav-link:after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: #007bff;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover:after {
          width: 70%;
        }

        .dropdown-menu {
          border-radius: 8px;
          margin-top: 10px;
        }

        .dropdown-item {
          padding: 10px 20px;
          font-weight: 500;
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
          color: #007bff;
        }

        /* Auth modal styles */
        .auth-modal {
          max-width: 500px;
        }

        /* Make navbar solid on mobile even at top */
        @media (max-width: 991.98px) {
          .navbar {
            background-color: white !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .navbar-brand .brand-text,
          .nav-link {
            color: #333 !important;
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedNavbar;
