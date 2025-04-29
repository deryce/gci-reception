import React, { useState } from "react";
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
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // We'll add custom styles here
import EnhancedNavbar from "./components/header";
import leader from './assets/img/leader.jpg';
import assitant from './assets/img/assitant.jpg';

// Wave divider component
const WaveDivider = ({ fillColor }) => {
  return (
    <div className="wave-divider">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          fill={fillColor}
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          fill={fillColor}
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          fill={fillColor}
        ></path>
      </svg>
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="App">
      {/* Navigation Header */}
      <EnhancedNavbar />
      {/* <Navbar color="light" light expand="md" className="fixed-top">
        <Container>
          <NavbarBrand href="/">Reception & E-Follow-Up</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink href="#about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#first-visit">First Visit</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#staying-connected">Staying Connected</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#values">Our Values</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#team">Our Team</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/register"
                  className="btn btn-outline-primary me-2"
                >
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <Button color="primary" href="/signin">
                  Sign In
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar> */}

      {/* 1. Hero Section */}
      <section className="hero-section text-white text-center d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                Welcoming You, Guiding You, Growing Together.
              </h1>
              <p className="lead mb-5">
                From the moment you arrive, we're here to help you find your
                place, grow in faith, and connect with your new church family.
              </p>
              <Button color="light" size="lg" className="px-5 py-3 fw-bold">
                New Here? Start Here!
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 2. About the Department */}
      <section className="py-5" id="about">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4">Who We Are</h2>
              <p className="lead mb-4">
                Our department ensures every newcomer is warmly received,
                informed, and guided into the church family through structured
                follow-up and engagement.
              </p>
              <p className="mb-4">
                We provide spiritual care, help you align with the right groups,
                and support your integration into church life. Our mission is to
                make sure no one walks alone in their faith journey.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Divider between About and First Visit */}
      <div className="section-divider">
        <WaveDivider fillColor="#e4ecf7" />
      </div>

      {/* 3. What to Expect as a Newcomer */}
      <section className="py-5 bg-light" id="first-visit">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4">Your First Visit</h2>
              <p className="lead">
                Here's what you can expect when you join us for the first time:
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">👐</div>
                  <CardTitle tag="h4">Receive You</CardTitle>
                  <CardText>
                    We identify and welcome all new faces with warmth.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">💬</div>
                  <CardTitle tag="h4">Learn About You</CardTitle>
                  <CardText>
                    We take time to hear your story and background.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">🏠</div>
                  <CardTitle tag="h4">Introduce Our Church</CardTitle>
                  <CardText>
                    Brief overview of our beliefs, vision, and origins.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">🗃</div>
                  <CardTitle tag="h4">Collect Contact Info</CardTitle>
                  <CardText>
                    We gather details to help you stay connected.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Divider between First Visit and Staying Connected */}
      <div className="section-divider">
        <WaveDivider fillColor="#fff9f0" />
      </div>

      {/* 4. Integration & Follow-Up */}
      <section className="py-5" id="staying-connected">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4">Staying Connected</h2>
              <p className="lead">
                Our process to help you become an integral part of our
                community:
              </p>
            </Col>
          </Row>
          <Row className="timeline">
            <Col md={3}>
              <div className="timeline-step">
                <div className="timeline-content shadow-sm">
                  <div className="inner-circle">📊</div>
                  <h5 className="mt-3">Categorization</h5>
                  <p className="mb-0">
                    Based on location or interest (cells, groups, zones).
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="timeline-step">
                <div className="timeline-content shadow-sm">
                  <div className="inner-circle">📞</div>
                  <h5 className="mt-3">Digital Follow-Up</h5>
                  <p className="mb-0">
                    Regular WhatsApp or SMS check-ins for 6 months.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="timeline-step">
                <div className="timeline-content shadow-sm">
                  <div className="inner-circle">🧑‍🤝‍🧑</div>
                  <h5 className="mt-3">Department Introductions</h5>
                  <p className="mb-0">
                    Meet & greet with ministries you're interested in.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="timeline-step">
                <div className="timeline-content shadow-sm">
                  <div className="inner-circle">🎓</div>
                  <h5 className="mt-3">Training Schools</h5>
                  <p className="mb-0">
                    Invitations to foundational and ministry training programs.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Divider between Staying Connected and Values */}
      <div className="section-divider">
        <WaveDivider fillColor="#edf5ed" />
      </div>

      {/* 5. Our Core Values */}
      <section className="py-5 bg-light" id="values">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4">Our Foundation</h2>
              <p className="lead">The core values that drive our ministry:</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">🙏</div>
                  <CardTitle tag="h4">Prayer for Every Believer</CardTitle>
                  <CardText>
                    We pray regularly for all new believers (Col. 1:9–11).
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">🧡</div>
                  <CardTitle tag="h4">Follow-Up with Love</CardTitle>
                  <CardText>
                    We reach out not just with messages, but with purpose.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">🏋️</div>
                  <CardTitle tag="h4">Committed to Excellence</CardTitle>
                  <CardText>
                    This is labor, and it counts (1 Cor. 15:58).
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center">
                  <div className="display-4 mb-3">🌱</div>
                  <CardTitle tag="h4">Growth through Focus</CardTitle>
                  <CardText>
                    We help you grow spiritually, step by step.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Divider between Values and Team */}
      <div className="section-divider">
        <WaveDivider fillColor="#f9f9f9" />
      </div>

      {/* 6. Meet the Team */}
      <section className="py-5" id="team">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4">
                Meet Our Reception & Follow-Up Team
              </h2>
              <p className="lead">
                The dedicated people making sure you feel welcome and connected:
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Card className="team-card border-0 mb-4">
                <div className="team-img-container">
                  <img
                    src={leader}
                    alt="Team Member"
                    className="team-img"
                  />
                </div>
                <CardBody className="text-center">
                  <h5 className="mb-1">George Ndungi</h5>
                  <p className="text-muted">Head of Reception</p>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="team-card border-0 mb-4">
                <div className="team-img-container">
                  <img
                    src={assitant}
                    alt="Team Member"
                    className="team-img"
                  />
                </div>
                <CardBody className="text-center">
                  <h5 className="mb-1">Peninah Njuguna</h5>
                  <p className="text-muted">Follow-Up Coordinator</p>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="team-card border-0 mb-4">
                <div className="team-img-container">
                  <img
                    src="/api/placeholder/300/300"
                    alt="Team Member"
                    className="team-img"
                  />
                </div>
                <CardBody className="text-center">
                  <h5 className="mb-1">Juliana Tole</h5>
                  <p className="text-muted">Secretary</p>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="team-card border-0 mb-4">
                <div className="team-img-container">
                  <img
                    src="/api/placeholder/300/300"
                    alt="Team Member"
                    className="team-img"
                  />
                </div>
                <CardBody className="text-center">
                  <h5 className="mb-1">N/A</h5>
                  <p className="text-muted">Treasurer</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Divider between Team and Testimonials */}
      <div className="section-divider">
        <WaveDivider fillColor="#f0ebfa" />
      </div>

      {/* 7. Testimonials */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-4">What People Are Saying</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="testimonial-carousel">
                <Row>
                  <Col md={6}>
                    <Card className="testimonial-card border-0 shadow-sm mb-4 h-100">
                      <CardBody className="p-4">
                        <p className="lead font-italic mb-0">
                          "I felt so seen and supported from the very first
                          Sunday. The follow-up team checked in with me
                          regularly and helped me connect with others who shared
                          my interests."
                        </p>
                        <div className="d-flex align-items-center mt-4">
                          <div className="flex-shrink-0">
                            <img
                              src="/api/placeholder/60/60"
                              alt="Testimonial"
                              className="rounded-circle"
                            />
                          </div>
                          <div className="ms-3">
                            <h5 className="mb-0">Sarah K.</h5>
                            <p className="text-muted mb-0">Member since 2024</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="testimonial-card border-0 shadow-sm mb-4 h-100">
                      <CardBody className="p-4">
                        <p className="lead font-italic mb-0">
                          "They helped me find a place to serve and grow in no
                          time. The structured follow-up process made a huge
                          difference in my spiritual journey."
                        </p>
                        <div className="d-flex align-items-center mt-4">
                          <div className="flex-shrink-0">
                            <img
                              src="/api/placeholder/60/60"
                              alt="Testimonial"
                              className="rounded-circle"
                            />
                          </div>
                          <div className="ms-3">
                            <h5 className="mb-0">Michael T.</h5>
                            <p className="text-muted mb-0">Member since 2023</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 8. Get Involved */}
      <section className="py-5 get-involved-section text-white text-center">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4">
                Want to Serve in This Department?
              </h2>
              <p className="lead mb-5">
                Join our team in welcoming and connecting new members to our
                church family. We're looking for passionate individuals with
                hearts for service and discipleship.
              </p>
              <Button color="light" size="lg" className="px-5 py-3 fw-bold">
                Join Our Team
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-dark text-white">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5>Weekly Schedule</h5>
              <ul className="list-unstyled">
                <li>Sunday Services: 9AM & 11AM</li>
                <li>Department Meeting: Wednesdays 6PM</li>
                <li>New Member Orientation: First Sunday, 1PM</li>
              </ul>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <h5>Training Schools</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Foundations of Faith
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Discipleship Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Leadership Development
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Scripture Encouragement</h5>
              <p>
                "Therefore welcome one another as Christ has welcomed you, for
                the glory of God." - Romans 15:7
              </p>
            </Col>
          </Row>
          <hr className="my-4" />
          <Row>
            <Col className="text-center">
              <p className="mb-0">
                © 2025 Reception & E-Follow-Up Department. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
