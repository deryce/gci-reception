import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Badge,
} from "reactstrap";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  Eye
} from "lucide-react";
import EnhancedNavbar from "../components/header";
import { generateClient } from "aws-amplify/api";
import { listMembers } from "../graphql/queries";
import { Link } from 'react-router-dom';


const ChurchMembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const client = generateClient();

  // Filter states
  const [filters, setFilters] = useState({
    searchTerm: "",
    year: "",
    month: "",
    gender: "",
    ageGroup: "",
    maritalStatus: "",
    decision: "",
    joinFellowship: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const fetchMembers = async () => {
    try {
      const resp = await client.graphql({
        query: listMembers,
      });
      const members = resp.data.listMembers.items;
      setMembers(members);
      setFilteredMembers(members);
      setTotalPages(Math.ceil(members.length / membersPerPage));
    } catch (error) {
      console.log("Error fetching members", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Simulate API call
    // setTimeout(() => {
    //   const data = generateMockData();
    //   setMembers(data);
    //   setFilteredMembers(data);
    //   setTotalPages(Math.ceil(data.length / membersPerPage));
    //   setLoading(false);
    // }, 1000);
    fetchMembers();
  }, [membersPerPage]);

  useEffect(() => {
    // Apply filters whenever filters change
    applyFilters();
  }, [filters, members]);

  const applyFilters = () => {
    let filtered = [...members];

    // Search term (name, email, mobile)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(term) ||
          member.email.toLowerCase().includes(term) ||
          member.mobile.includes(term)
      );
    }

    // Year filter
    if (filters.year) {
      filtered = filtered.filter(
        (member) =>
          new Date(member.visitDate).getFullYear() === parseInt(filters.year)
      );
    }

    // Month filter
    if (filters.month) {
      filtered = filtered.filter(
        (member) =>
          new Date(member.visitDate).getMonth() === parseInt(filters.month) - 1
      );
    }

    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter((member) => member.gender === filters.gender);
    }

    // Age Group filter
    if (filters.ageGroup) {
      filtered = filtered.filter(
        (member) => member.ageGroup === filters.ageGroup
      );
    }

    // Marital Status filter
    if (filters.maritalStatus) {
      filtered = filtered.filter(
        (member) => member.maritalStatus === filters.maritalStatus
      );
    }

    // Decision filter
    if (filters.decision) {
      filtered = filtered.filter(
        (member) => member.decision === filters.decision
      );
    }

    // Join Fellowship filter
    if (filters.joinFellowship) {
      if (filters.joinFellowship === "yes") {
        filtered = filtered.filter((member) => member.joinFellowship === true);
      } else if (filters.joinFellowship === "no") {
        filtered = filtered.filter((member) => member.joinFellowship === false);
      }
    }

    setFilteredMembers(filtered);
    setTotalPages(Math.ceil(filtered.length / membersPerPage));
    setCurrentPage(1); // Reset to first page whenever filters change
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      year: "",
      month: "",
      gender: "",
      ageGroup: "",
      maritalStatus: "",
      decision: "",
      joinFellowship: "",
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current members based on pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  // Generate array of years from 2020 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

  // Array of months
  const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <EnhancedNavbar />
      <Container fluid className="py-4" style={{ marginTop: "120px" }}>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-0 d-flex align-items-center">
              <Users className="me-2" size={28} />
              Church Members
            </h2>
            <p className="text-muted">Manage and view all church members</p>
          </Col>
        </Row>

        <Card className="shadow-sm mb-4">
          <CardHeader className="bg-white">
            <Row>
              <Col md={6} className="d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search size={18} />
                  </span>
                  <Input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={filters.searchTerm}
                    name="searchTerm"
                    onChange={handleFilterChange}
                  />
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Button
                  color="light"
                  className="me-2 d-flex align-items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} className="me-1" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                <Button
                  color="secondary"
                  className="d-flex align-items-center"
                  onClick={resetFilters}
                >
                  <RefreshCw size={18} className="me-1" />
                  Reset
                </Button>
              </Col>
            </Row>

            {showFilters && (
              <Row className="mt-3">
                <Col md={12}>
                  <Card className="bg-light border-0">
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md={2}>
                            <FormGroup>
                              <Label for="year">Year</Label>
                              <Input
                                type="select"
                                name="year"
                                id="year"
                                value={filters.year}
                                onChange={handleFilterChange}
                              >
                                <option value="">All Years</option>
                                {years.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col md={2}>
                            <FormGroup>
                              <Label for="month">Month</Label>
                              <Input
                                type="select"
                                name="month"
                                id="month"
                                value={filters.month}
                                onChange={handleFilterChange}
                              >
                                <option value="">All Months</option>
                                {months.map((month) => (
                                  <option key={month.value} value={month.value}>
                                    {month.name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col md={2}>
                            <FormGroup>
                              <Label for="gender">Gender</Label>
                              <Input
                                type="select"
                                name="gender"
                                id="gender"
                                value={filters.gender}
                                onChange={handleFilterChange}
                              >
                                <option value="">All Genders</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col md={2}>
                            <FormGroup>
                              <Label for="ageGroup">Age Group</Label>
                              <Input
                                type="select"
                                name="ageGroup"
                                id="ageGroup"
                                value={filters.ageGroup}
                                onChange={handleFilterChange}
                              >
                                <option value="">All Age Groups</option>
                                <option value="Under 18">Under 18</option>
                                <option value="18-25">18-25</option>
                                <option value="26-35">26-35</option>
                                <option value="36-50">36-50</option>
                                <option value="51-65">51-65</option>
                                <option value="65+">65+</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col md={2}>
                            <FormGroup>
                              <Label for="maritalStatus">Marital Status</Label>
                              <Input
                                type="select"
                                name="maritalStatus"
                                id="maritalStatus"
                                value={filters.maritalStatus}
                                onChange={handleFilterChange}
                              >
                                <option value="">All Statuses</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          <Col md={2}>
                            <FormGroup>
                              <Label for="joinFellowship">
                                Join Fellowship
                              </Label>
                              <Input
                                type="select"
                                name="joinFellowship"
                                id="joinFellowship"
                                value={filters.joinFellowship}
                                onChange={handleFilterChange}
                              >
                                <option value="">All</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col md={4}>
                            <FormGroup>
                              <Label for="decision">Decision</Label>
                              <Input
                                type="select"
                                name="decision"
                                id="decision"
                                value={filters.decision}
                                onChange={handleFilterChange}
                              >
                                <option value="">All Decisions</option>
                                <option value="First-time visitor">
                                  First-time visitor
                                </option>
                                <option value="Returning visitor">
                                  Returning visitor
                                </option>
                                <option value="New believer">
                                  New believer
                                </option>
                                <option value="Rededication">
                                  Rededication
                                </option>
                                <option value="Membership interest">
                                  Membership interest
                                </option>
                                <option value="None">None</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </CardHeader>

          <CardBody>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading members data...</p>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-5">
                <p className="mb-0">No members found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Contact Info</th>
                        <th>Visit Date</th>
                        <th>Demographics</th>
                        <th>Faith Journey</th>
                        <th>Fellowship</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMembers.map((member, index) => (
                        <tr key={member.id} style={{ cursor: "pointer" }}>
                          <td>{indexOfFirstMember + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="bg-light rounded-circle d-flex justify-content-center align-items-center me-2"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <User size={20} />
                              </div>
                              <div>
                                <div className="fw-bold">{member.name}</div>
                                <small className="text-muted">
                                  <MapPin size={12} className="me-1" />
                                  {member.city}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <Phone size={12} className="me-1" />
                              {member.mobile}
                            </div>
                            <div>
                              <Mail size={12} className="me-1" />
                              {member.email}
                            </div>
                          </td>
                          <td>
                            <div>
                              <Calendar size={14} className="me-1" />
                              {formatDate(member.visitDate)}
                            </div>
                            {member.guestOf && (
                              <small className="text-muted">
                                Guest of: {member.guestOf}
                              </small>
                            )}
                          </td>
                          <td>
                            <div className="mb-1">
                              <Badge color="info" pill className="me-1">
                                {member.gender}
                              </Badge>
                              <Badge color="secondary" pill>
                                {member.ageGroup}
                              </Badge>
                            </div>
                            <div>
                              <Badge color="light" className="text-dark">
                                {member.maritalStatus}
                              </Badge>
                            </div>
                            <small className="text-muted">
                              {member.occupation}
                            </small>
                          </td>
                          <td>
                            {member.decision ? (
                              <Badge
                                color={
                                  member.decision === "New believer"
                                    ? "success"
                                    : member.decision === "Membership interest"
                                    ? "primary"
                                    : member.decision === "Rededication"
                                    ? "warning"
                                    : "light"
                                }
                                className="text-dark"
                              >
                                {member.decision}
                              </Badge>
                            ) : (
                              <span className="text-muted">None</span>
                            )}
                            {member.comments && (
                              <p className="small mb-0 mt-1 text-muted">
                                {member.comments}
                              </p>
                            )}
                          </td>
                          <td>
                            {member.joinFellowship ? (
                              <Badge color="success" pill>
                                Interested
                              </Badge>
                            ) : (
                              <Badge color="light" pill className="text-muted">
                                Not interested
                              </Badge>
                            )}
                            {member.fellowshipDetails && (
                              <p className="small mb-0 mt-1">
                                {member.fellowshipDetails}
                              </p>
                            )}
                          </td>
                          <td>
                            <Link to={`/members/details/${member.id}`}>
                              <Button
                                color="primary"
                                size="sm"
                              >
                                <Eye size={14} className="me-1" />
                                View
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <p className="mb-0 text-muted">
                      Showing {indexOfFirstMember + 1} to{" "}
                      {Math.min(indexOfLastMember, filteredMembers.length)} of{" "}
                      {filteredMembers.length} members
                    </p>
                  </div>

                  <Pagination>
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <ChevronLeft size={16} />
                      </PaginationLink>
                    </PaginationItem>

                    {pageNumbers.map((number) => {
                      // Show first page, last page, current page, and 1 page before/after current
                      if (
                        number === 1 ||
                        number === totalPages ||
                        number === currentPage ||
                        number === currentPage - 1 ||
                        number === currentPage + 1
                      ) {
                        return (
                          <PaginationItem
                            key={number}
                            active={number === currentPage}
                          >
                            <PaginationLink
                              onClick={() => handlePageChange(number)}
                            >
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      // Show ellipsis instead of all page numbers
                      if (
                        (number === 2 && currentPage > 3) ||
                        (number === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem disabled key={`ellipsis-${number}`}>
                            <PaginationLink>...</PaginationLink>
                          </PaginationItem>
                        );
                      }

                      return null;
                    })}

                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <ChevronRight size={16} />
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ChurchMembersList;
