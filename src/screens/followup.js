import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, CardBody, CardHeader, 
  Form, FormGroup, Input, InputGroup, Button, Badge,
  Table, Pagination, PaginationItem, PaginationLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Alert
} from 'reactstrap';
import { 
  User, Search, Filter, Calendar, Clock, ChevronRight, 
  AlertCircle, CheckCircle, MessageCircle, Phone, Mail,
  RefreshCw, Eye, SortAsc, SortDesc, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EnhancedNavbar from '../components/header';
import { generateClient } from 'aws-amplify/api';
import { membersByAssignedToId } from '../graphql/queries';
import { fetchUserAttributes } from 'aws-amplify/auth';

const FollowUpDashboard = () => {
  // Mock user data (would come from authentication in real app)
  const currentUser = {
    id: "user123",
    name: "John Smith",
    role: "Follow-up Coordinator",
    zone: "Zone B",
  };

  const client = generateClient();

  // State management
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("lastContactedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filters, setFilters] = useState({
    status: "",
    contactDays: "",
    zone: "",
    interests: [],
  });
  const [filterVisible, setFilterVisible] = useState(false);

  // Options for dropdowns
  const statusOptions = [
    "all",
    "new",
    "in_school",
    "in_department",
    "established",
  ];
  const contactDaysOptions = ["all", "7", "14", "30", "60"];
  const zoneOptions = ["all", "Zone A", "Zone B", "Zone C", "Zone D"];
  const interestOptions = [
    "choir",
    "youth ministry",
    "bible study",
    "children's ministry",
    "outreach",
    "worship",
    "prayer team",
  ];

  const fetchAssignedMembers = async ()=>{
    setLoading(true)
    try {
      const { sub } = await fetchUserAttributes();
      console.log("Sub", sub);
      const resp = await client.graphql({
        query: membersByAssignedToId,
        variables: { assignedToId: sub}
      })
      setMembers( resp.data.membersByAssignedToId.items);
    } catch (error) {
      console.log("Error fetching assigned members", error);
    }
    setLoading(false);
  }

  // Fetch data
  useEffect(() => {
    // Simulate API call to fetch assigned members
    fetchAssignedMembers();
    // setTimeout(() => {
    //   // This would be replaced with actual API call
    //   const mockMembers = [
    //     {
    //       id: "mem123456",
    //       fullName: "Sarah Johnson",
    //       phoneNumber: "(123) 456-7890",
    //       email: "sarah.johnson@example.com",
    //       zone: "Zone B",
    //       cellGroup: "Faith Builders",
    //       status: "in_school",
    //       lastContactedAt: "2025-04-10",
    //       visitDate: "2025-03-15",
    //       interests: ["choir", "youth ministry", "bible study"],
    //       assignedTo: "user123",
    //       priority: "high",
    //       nextAction: "Confirm attendance at newcomers class",
    //     },
    //     {
    //       id: "mem234567",
    //       fullName: "Michael Brown",
    //       phoneNumber: "(234) 567-8901",
    //       email: "michael.brown@example.com",
    //       zone: "Zone B",
    //       cellGroup: "Grace Group",
    //       status: "new",
    //       lastContactedAt: "2025-04-02",
    //       visitDate: "2025-04-01",
    //       interests: ["prayer team", "outreach"],
    //       assignedTo: "user123",
    //       priority: "medium",
    //       nextAction: "Initial welcome call",
    //     },
    //     {
    //       id: "mem345678",
    //       fullName: "Jennifer Davis",
    //       phoneNumber: "(345) 678-9012",
    //       email: "jennifer.davis@example.com",
    //       zone: "Zone A",
    //       cellGroup: "Faithful Hearts",
    //       status: "in_department",
    //       lastContactedAt: "2025-03-28",
    //       visitDate: "2025-02-12",
    //       interests: ["worship", "choir"],
    //       assignedTo: "user123",
    //       priority: "low",
    //       nextAction: "Check on ministry integration",
    //     },
    //     {
    //       id: "mem456789",
    //       fullName: "Robert Wilson",
    //       phoneNumber: "(456) 789-0123",
    //       email: "robert.wilson@example.com",
    //       zone: "Zone C",
    //       cellGroup: "Truth Seekers",
    //       status: "established",
    //       lastContactedAt: "2025-04-18",
    //       visitDate: "2024-12-03",
    //       interests: ["bible study", "prayer team"],
    //       assignedTo: "user123",
    //       priority: "medium",
    //       nextAction: "Discuss leadership opportunity",
    //     },
    //     {
    //       id: "mem567890",
    //       fullName: "Emily Thompson",
    //       phoneNumber: "(567) 890-1234",
    //       email: "emily.thompson@example.com",
    //       zone: "Zone B",
    //       cellGroup: "Faith Builders",
    //       status: "in_school",
    //       lastContactedAt: "2025-03-15",
    //       visitDate: "2025-03-01",
    //       interests: ["children's ministry", "outreach"],
    //       assignedTo: "user123",
    //       priority: "high",
    //       nextAction: "Follow up on class attendance",
    //     },
    //     {
    //       id: "mem678901",
    //       fullName: "David Martinez",
    //       phoneNumber: "(678) 901-2345",
    //       email: "david.martinez@example.com",
    //       zone: "Zone D",
    //       cellGroup: "Lighthouse",
    //       status: "new",
    //       lastContactedAt: "2025-04-20",
    //       visitDate: "2025-04-19",
    //       interests: ["youth ministry"],
    //       assignedTo: "user123",
    //       priority: "high",
    //       nextAction: "Send welcome email",
    //     },
    //     {
    //       id: "mem789012",
    //       fullName: "Jessica Taylor",
    //       phoneNumber: "(789) 012-3456",
    //       email: "jessica.taylor@example.com",
    //       zone: "Zone B",
    //       cellGroup: "Grace Group",
    //       status: "in_department",
    //       lastContactedAt: "2025-03-05",
    //       visitDate: "2025-01-22",
    //       interests: ["worship", "prayer team"],
    //       assignedTo: "user123",
    //       priority: "medium",
    //       nextAction: "Schedule ministry orientation",
    //     },
    //     {
    //       id: "mem890123",
    //       fullName: "Christopher Anderson",
    //       phoneNumber: "(890) 123-4567",
    //       email: "christopher.anderson@example.com",
    //       zone: "Zone A",
    //       cellGroup: "Faithful Hearts",
    //       status: "established",
    //       lastContactedAt: "2025-04-05",
    //       visitDate: "2024-09-10",
    //       interests: ["bible study", "outreach"],
    //       assignedTo: "user123",
    //       priority: "low",
    //       nextAction: "Annual discipleship check-in",
    //     },
    //     {
    //       id: "mem901234",
    //       fullName: "Amanda Thomas",
    //       phoneNumber: "(901) 234-5678",
    //       email: "amanda.thomas@example.com",
    //       zone: "Zone C",
    //       cellGroup: "Truth Seekers",
    //       status: "in_school",
    //       lastContactedAt: "2025-04-15",
    //       visitDate: "2025-04-02",
    //       interests: ["choir", "children's ministry"],
    //       assignedTo: "user123",
    //       priority: "medium",
    //       nextAction: "Connect with cell group leader",
    //     },
    //     {
    //       id: "mem012345",
    //       fullName: "Daniel Harris",
    //       phoneNumber: "(012) 345-6789",
    //       email: "daniel.harris@example.com",
    //       zone: "Zone B",
    //       cellGroup: "Faith Builders",
    //       status: "new",
    //       lastContactedAt: "2025-04-08",
    //       visitDate: "2025-04-07",
    //       interests: ["youth ministry", "worship"],
    //       assignedTo: "user123",
    //       priority: "high",
    //       nextAction: "Invite to newcomers class",
    //     },
    //     {
    //       id: "mem123457",
    //       fullName: "Melissa Clark",
    //       phoneNumber: "(123) 457-8901",
    //       email: "melissa.clark@example.com",
    //       zone: "Zone D",
    //       cellGroup: "Lighthouse",
    //       status: "in_department",
    //       lastContactedAt: "2025-03-22",
    //       visitDate: "2025-02-05",
    //       interests: ["prayer team", "bible study"],
    //       assignedTo: "user123",
    //       priority: "low",
    //       nextAction: "Ministry participation feedback",
    //     },
    //     {
    //       id: "mem234568",
    //       fullName: "Andrew Robinson",
    //       phoneNumber: "(234) 568-9012",
    //       email: "andrew.robinson@example.com",
    //       zone: "Zone B",
    //       cellGroup: "Grace Group",
    //       status: "established",
    //       lastContactedAt: "2025-03-10",
    //       visitDate: "2024-11-18",
    //       interests: ["outreach", "children's ministry"],
    //       assignedTo: "user123",
    //       priority: "medium",
    //       nextAction: "Mentorship opportunity discussion",
    //     },
    //     {
    //       id: "mem345679",
    //       fullName: "Kelly Walker",
    //       phoneNumber: "(345) 679-0123",
    //       email: "kelly.walker@example.com",
    //       zone: "Zone A",
    //       cellGroup: "Faithful Hearts",
    //       status: "in_school",
    //       lastContactedAt: "2025-04-03",
    //       visitDate: "2025-03-20",
    //       interests: ["choir", "worship"],
    //       assignedTo: "user123",
    //       priority: "high",
    //       nextAction: "Confirm class schedule",
    //     },
    //     {
    //       id: "mem456790",
    //       fullName: "Steven Nelson",
    //       phoneNumber: "(456) 790-1234",
    //       email: "steven.nelson@example.com",
    //       zone: "Zone B",
    //       cellGroup: "Faith Builders",
    //       status: "new",
    //       lastContactedAt: "2025-04-16",
    //       visitDate: "2025-04-15",
    //       interests: ["bible study"],
    //       assignedTo: "user123",
    //       priority: "high",
    //       nextAction: "Initial welcome call",
    //     },
    //     {
    //       id: "mem567891",
    //       fullName: "Rachel Mitchell",
    //       phoneNumber: "(567) 891-2345",
    //       email: "rachel.mitchell@example.com",
    //       zone: "Zone C",
    //       cellGroup: "Truth Seekers",
    //       status: "in_department",
    //       lastContactedAt: "2025-03-25",
    //       visitDate: "2025-01-30",
    //       interests: ["children's ministry", "outreach"],
    //       assignedTo: "user123",
    //       priority: "medium",
    //       nextAction: "Check on ministry integration",
    //     },
    //   ];

    //   setMembers(mockMembers);
    //   setLoading(false);
    // }, 1000);
  }, []);

  // Sort function for table
  const sortMembers = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Default to descending for new sort field
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort members
  const filteredMembers = members
    .filter((member) => {
      // Search term filter
      const searchMatch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phoneNumber.includes(searchTerm);

      // Status filter
      const statusMatch =
        filters.status === "" ||
        filters.status === "all" ||
        member.status === filters.status;

      // Zone filter
      const zoneMatch =
        filters.zone === "" ||
        filters.zone === "all" ||
        member.zone === filters.zone;

      // Days since last contact filter
      let contactDaysMatch = true;
      if (filters.contactDays && filters.contactDays !== "all") {
        const lastContactDate = new Date(member.lastContactedAt);
        const today = new Date();
        const diffTime = Math.abs(today - lastContactDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        contactDaysMatch = diffDays >= parseInt(filters.contactDays);
      }

      // Interests filter
      let interestsMatch = true;
      if (filters.interests && filters.interests.length > 0) {
        interestsMatch = filters.interests.some((interest) =>
          member.interests.includes(interest)
        );
      }

      return (
        searchMatch &&
        statusMatch &&
        zoneMatch &&
        contactDaysMatch &&
        interestsMatch
      );
    })
    .sort((a, b) => {
      // Sorting logic
      if (sortField === "lastContactedAt") {
        const dateA = new Date(a.lastContactedAt);
        const dateB = new Date(b.lastContactedAt);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "fullName") {
        return sortDirection === "asc"
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      } else if (sortField === "status") {
        const statusOrder = {
          new: 1,
          in_school: 2,
          in_department: 3,
          established: 4,
        };
        return sortDirection === "asc"
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      } else if (sortField === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return sortDirection === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "primary";
      case "in_school":
        return "info";
      case "in_department":
        return "warning";
      case "established":
        return "success";
      default:
        return "secondary";
    }
  };

  // Status badge label
  const getStatusLabel = (status) => {
    switch (status) {
      case "new":
        return "New Member";
      case "in_school":
        return "In Newcomers School";
      case "in_department":
        return "In Department";
      case "established":
        return "Established";
      default:
        return "Unknown";
    }
  };

  // Priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  // Calculate days since last contact
  const daysSinceLastContact = (dateString) => {
    const lastContact = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - lastContact);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle interest selection
  const handleInterestToggle = (interest) => {
    setFilters((prev) => {
      const currentInterests = [...prev.interests];
      if (currentInterests.includes(interest)) {
        return {
          ...prev,
          interests: currentInterests.filter((i) => i !== interest),
        };
      } else {
        return {
          ...prev,
          interests: [...currentInterests, interest],
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      status: "",
      contactDays: "",
      zone: "",
      interests: [],
    });
  };

  const toggleFilters = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <>
      <EnhancedNavbar />
      <Container fluid className="py-4" style={{ marginTop: '120px' }}>
        {/* Header section */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-0">
                  <MessageCircle className="me-2" />
                  Follow-up Dashboard
                </h2>
                <p className="text-muted">
                  Manage your assigned members for follow-up and discipleship
                </p>
              </div>
              <div>
                <Button
                  color="secondary"
                  className="me-2"
                  onClick={toggleFilters}
                >
                  <Filter size={16} className="me-1" />
                  {filterVisible ? "Hide Filters" : "Show Filters"}
                </Button>
                <Button color="primary">
                  <RefreshCw size={16} className="me-1" />
                  Refresh Data
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="shadow-sm bg-primary text-white">
              <CardBody className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Total Assigned</h6>
                  <h3 className="mb-0">{members.length}</h3>
                </div>
                <User size={32} />
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm bg-warning text-white">
              <CardBody className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Needs Follow-up</h6>
                  <h3 className="mb-0">
                    {
                      members.filter(
                        (m) => daysSinceLastContact(m.lastContactedAt) > 14
                      ).length
                    }
                  </h3>
                </div>
                <AlertCircle size={32} />
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm bg-success text-white">
              <CardBody className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Recently Contacted</h6>
                  <h3 className="mb-0">
                    {
                      members.filter(
                        (m) => daysSinceLastContact(m.lastContactedAt) <= 7
                      ).length
                    }
                  </h3>
                </div>
                <CheckCircle size={32} />
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm bg-info text-white">
              <CardBody className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">High Priority</h6>
                  <h3 className="mb-0">
                    {members.filter((m) => m.priority === "high").length}
                  </h3>
                </div>
                <AlertCircle size={32} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Search and Filter Row */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <CardBody>
                <Row>
                  <Col md={8}>
                    <InputGroup>
                      <Input
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <Button color="primary">
                        <Search size={16} />
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={4} className="text-end">
                    <span className="text-muted me-2">
                      Showing {filteredMembers.length} of {members.length}{" "}
                      members
                    </span>
                  </Col>
                </Row>

                {/* Filters Section */}
                {filterVisible && (
                  <div className="mt-4 pt-3 border-top">
                    <h6>Filter Options</h6>
                    <Row className="mb-3">
                      <Col md={3}>
                        <FormGroup>
                          <label className="small text-muted">
                            Member Status
                          </label>
                          <Input
                            type="select"
                            value={filters.status}
                            onChange={(e) =>
                              handleFilterChange("status", e.target.value)
                            }
                          >
                            <option value="all">All Statuses</option>
                            <option value="new">New Member</option>
                            <option value="in_school">
                              In Newcomers School
                            </option>
                            <option value="in_department">In Department</option>
                            <option value="established">Established</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label className="small text-muted">
                            Last Contact
                          </label>
                          <Input
                            type="select"
                            value={filters.contactDays}
                            onChange={(e) =>
                              handleFilterChange("contactDays", e.target.value)
                            }
                          >
                            <option value="all">Any Time</option>
                            <option value="7">More than 7 days</option>
                            <option value="14">More than 14 days</option>
                            <option value="30">More than 30 days</option>
                            <option value="60">More than 60 days</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label className="small text-muted">Zone</label>
                          <Input
                            type="select"
                            value={filters.zone}
                            onChange={(e) =>
                              handleFilterChange("zone", e.target.value)
                            }
                          >
                            <option value="all">All Zones</option>
                            <option value="Zone A">Zone A</option>
                            <option value="Zone B">Zone B</option>
                            <option value="Zone C">Zone C</option>
                            <option value="Zone D">Zone D</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <label className="small text-muted">Priority</label>
                          <div className="d-flex mt-2">
                            <div className="me-2">
                              <Button
                                color={
                                  filters.priority === "high"
                                    ? "danger"
                                    : "outline-danger"
                                }
                                size="sm"
                                onClick={() =>
                                  handleFilterChange(
                                    "priority",
                                    filters.priority === "high" ? "" : "high"
                                  )
                                }
                              >
                                High
                              </Button>
                            </div>
                            <div className="me-2">
                              <Button
                                color={
                                  filters.priority === "medium"
                                    ? "warning"
                                    : "outline-warning"
                                }
                                size="sm"
                                onClick={() =>
                                  handleFilterChange(
                                    "priority",
                                    filters.priority === "medium"
                                      ? ""
                                      : "medium"
                                  )
                                }
                              >
                                Medium
                              </Button>
                            </div>
                            <div>
                              <Button
                                color={
                                  filters.priority === "low"
                                    ? "success"
                                    : "outline-success"
                                }
                                size="sm"
                                onClick={() =>
                                  handleFilterChange(
                                    "priority",
                                    filters.priority === "low" ? "" : "low"
                                  )
                                }
                              >
                                Low
                              </Button>
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <label className="small text-muted mb-2">
                          Interests
                        </label>
                        <div>
                          {interestOptions.map((interest) => (
                            <Badge
                              key={interest}
                              color={
                                filters.interests.includes(interest)
                                  ? "info"
                                  : "light"
                              }
                              className="me-2 mb-2 cursor-pointer"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleInterestToggle(interest)}
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={clearFilters}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Members Table */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <CardBody>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading member data...</p>
                  </div>
                ) : filteredMembers.length === 0 ? (
                  <Alert color="info">
                    No members match your current filters. Try adjusting your
                    search or filters.
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead>
                        <tr>
                          <th
                            onClick={() => sortMembers("fullName")}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex align-items-center">
                              Name
                              {sortField === "fullName" &&
                                (sortDirection === "asc" ? (
                                  <SortAsc size={16} className="ms-1" />
                                ) : (
                                  <SortDesc size={16} className="ms-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            onClick={() => sortMembers("status")}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex align-items-center">
                              Status
                              {sortField === "status" &&
                                (sortDirection === "asc" ? (
                                  <SortAsc size={16} className="ms-1" />
                                ) : (
                                  <SortDesc size={16} className="ms-1" />
                                ))}
                            </div>
                          </th>
                          <th>Contact Info</th>
                          <th
                            onClick={() => sortMembers("lastContactedAt")}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex align-items-center">
                              Last Contact
                              {sortField === "lastContactedAt" &&
                                (sortDirection === "asc" ? (
                                  <SortAsc size={16} className="ms-1" />
                                ) : (
                                  <SortDesc size={16} className="ms-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            onClick={() => sortMembers("priority")}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex align-items-center">
                              Priority
                              {sortField === "priority" &&
                                (sortDirection === "asc" ? (
                                  <SortAsc size={16} className="ms-1" />
                                ) : (
                                  <SortDesc size={16} className="ms-1" />
                                ))}
                            </div>
                          </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentMembers.map((member) => {
                          const daysSince = daysSinceLastContact(
                            member.createdAt
                          );
                          return (
                            <tr key={member.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="bg-light rounded-circle d-inline-flex justify-content-center align-items-center me-2"
                                    style={{ width: "36px", height: "36px" }}
                                  >
                                    <User size={18} />
                                  </div>
                                  <div>
                                    <div className="fw-bold">
                                      {member.name}
                                    </div>
                                    <div className="small text-muted">
                                      {member.cellGroup}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <Badge
                                  color={getStatusColor(member.status.toLowerCase())}
                                  className="badge-pill"
                                >
                                  {getStatusLabel(member.status.toLowerCase())}
                                </Badge>
                              </td>
                              <td>
                                <div className="small mb-1">
                                  <Phone
                                    size={14}
                                    className="me-1 text-primary"
                                  />
                                  {member.mobile}
                                </div>
                                <div className="small">
                                  <Mail
                                    size={14}
                                    className="me-1 text-primary"
                                  />
                                  {member.email}
                                </div>
                              </td>
                              <td>
                                <div>
                                  <Calendar
                                    size={14}
                                    className="me-1 text-muted"
                                  />
                                  {new Date(
                                    member.createdAt
                                  ).toLocaleDateString()}
                                </div>
                                <div className="small">
                                  <Clock
                                    size={14}
                                    className="me-1 text-muted"
                                  />
                                  {daysSince} days ago
                                  {daysSince > 14 && (
                                    <Badge
                                      color="danger"
                                      pill
                                      className="ms-1"
                                      size="sm"
                                    >
                                      Overdue
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td>
                                <Badge
                                  color={getPriorityColor('high')}
                                  pill
                                >
                                  HIGH
                                </Badge>
                              </td>
                              <td>
                                <Link to={`/members/details/${member.id}`}>
                                  <Button color="primary" size="sm">
                                    <Eye size={14} className="me-1" />
                                    View
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}

                {/* Pagination */}
                {filteredMembers.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                      <small className="text-muted">
                        Showing {indexOfFirstMember + 1} to{" "}
                        {Math.min(indexOfLastMember, filteredMembers.length)} of{" "}
                        {filteredMembers.length} entries
                      </small>
                    </div>
                    <Pagination>
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                          previous
                          onClick={() => setCurrentPage(currentPage - 1)}
                        />
                      </PaginationItem>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          // Show pages around current page
                          let pageToShow;
                          if (totalPages <= 5) {
                            pageToShow = i + 1;
                          } else if (currentPage <= 3) {
                            pageToShow = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageToShow = totalPages - 4 + i;
                          } else {
                            pageToShow = currentPage - 2 + i;
                          }

                          return (
                            <PaginationItem
                              active={pageToShow === currentPage}
                              key={pageToShow}
                            >
                              <PaginationLink
                                onClick={() => setCurrentPage(pageToShow)}
                              >
                                {pageToShow}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink
                          next
                          onClick={() => setCurrentPage(currentPage + 1)}
                        />
                      </PaginationItem>
                    </Pagination>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        {/* <Row>
          <Col>
            <Card className="shadow-sm">
              <CardHeader className="bg-light">
                <h6 className="mb-0">Quick Actions</h6>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={3}>
                    <Button color="outline-primary" block>
                      <MessageCircle size={16} className="me-2" />
                      Log New Contact
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button color="outline-info" block>
                      <Calendar size={16} className="me-2" />
                      Schedule Follow-up
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button color="outline-success" block>
                      <User size={16} className="me-2" />
                      Add New Member
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button color="outline-secondary" block>
                      <ChevronRight size={16} className="me-2" />
                      Generate Reports
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default FollowUpDashboard;