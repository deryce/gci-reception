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
  Badge,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "reactstrap";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Home,
  Clock,
  CheckCircle,
  MessageCircle,
  Users,
  Award,
  Book,
  Briefcase,
  HelpCircle,
  AlertCircle,
  Plus,
  Edit,
  ChevronRight,
  Heart,
  Send,
  CheckSquare,
  Info,
} from "lucide-react";
import EnhancedNavbar from "../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import {
  getMember,
  listUsers,
  listDepartments,
  listCellGroups,
} from "../graphql/queries";
import { createFollowUp, updateMember } from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";

const MemberDetails = () => {
  // Mock member data (would be fetched from API in a real app)
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [followUpModal, setFollowUpModal] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState(false);
  const [assignUserModal, setAssignUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [cellGroupModal, setCellGroupModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [cellGroups, setCellGroups] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedCellGroupId, setSelectedCellGroupId] = useState("");
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingCellGroups, setLoadingCellGroups] = useState(false);
  const { id } = useParams();
  const client = generateClient();
  const navigate = useNavigate();

  // Form state for the follow-up modal
  const [followUpForm, setFollowUpForm] = useState({
    date: new Date().toISOString().split("T")[0],
    method: "call",
    summary: "",
    responder: "",
  });

  // Form state for status update modal
  const [statusForm, setStatusForm] = useState({
    status: "",
    notes: "",
  });
  const fetchMember = async () => {
    try {
      const resp = await client.graphql({
        query: getMember,
        variables: { id },
      });
      setMember(resp.data.getMember);
      const user = await fetchUserAttributes();
      setCurrentUser(user);
    } catch (error) {
      console.log("Error fetching member", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Simulate API call to fetch member details
    fetchMember();
  }, []);

  // Add this function to fetch users from the API
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await client.graphql({
        query: listUsers,
      });
      setUsers(response.data.listUsers.items);
    } catch (error) {
      console.log("Error fetching users", error);
    }
    setLoadingUsers(false);
  };

  // Add this function to handle assigning the member to a user
  const assignMemberToUser = async () => {
    if (!selectedUserId) return;

    try {
      await client.graphql({
        query: updateMember,
        variables: {
          input: {
            id: member.id,
            assignedToId: selectedUserId,
          },
        },
      });

      // Update local state
      setMember((prev) => ({
        ...prev,
        assignedToId: selectedUserId,
        assignedTo: users.find((user) => user.id === selectedUserId),
      }));

      // Add a follow-up record for the assignment

      const { sub } = await fetchUserAttributes();
      const newFollowUp = {
        date: new Date().toISOString().split("T")[0],
        method: "EMAIL",
        summary: `Member assigned to ${
          users.find((user) => user.id === selectedUserId)?.name ||
          "a team member"
        }.`,
        responderId: sub,
        memberId: id,
      };

      //create followup

      const resp = await client.graphql({
        query: createFollowUp,
        variables: { input: newFollowUp },
      });

      const latestFollowup = resp.data.createFollowUp;

      setMember((prev) => ({
        ...prev,
        followUps: {
          items: [latestFollowup,  ...prev.followUps.items],
        },
      }));

      // Close the modal
      setAssignUserModal(false);
    } catch (error) {
      console.log("Error assigning member to user", error);
    }
  };

  // Add this function to handle opening the assign user modal
  const openAssignUserModal = () => {
    fetchUsers();
    setSelectedUserId(member.assignedToId || "");
    setAssignUserModal(true);
  };

  // Add functions to fetch departments and cell groups
  const fetchDepartments = async () => {
    setLoadingDepartments(true);
    try {
      const response = await client.graphql({
        query: listDepartments,
      });
      setDepartments(response.data.listDepartments.items);
    } catch (error) {
      console.log("Error fetching departments", error);
    }
    setLoadingDepartments(false);
  };

  const fetchCellGroups = async () => {
    setLoadingCellGroups(true);
    try {
      const response = await client.graphql({
        query: listCellGroups,
      });
      setCellGroups(response.data.listCellGroups.items);
    } catch (error) {
      console.log("Error fetching cell groups", error);
    }
    setLoadingCellGroups(false);
  };

  // Add functions to handle assigning department and cell group
  const assignMemberToDepartment = async () => {
    if (!selectedDepartmentId) return;

    try {
      await client.graphql({
        query: updateMember,
        variables: {
          input: {
            id: member.id,
            departmentId: selectedDepartmentId,
          },
        },
      });

      // Update local state
      const selectedDepartment = departments.find(
        (dept) => dept.id === selectedDepartmentId
      );
      setMember((prev) => ({
        ...prev,
        departmentId: selectedDepartmentId,
        department: selectedDepartment,
      }));

      const { sub } = await fetchUserAttributes();

      // Add a follow-up record for the assignment
      const newFollowUp = {
        date: new Date().toISOString().split("T")[0],
        method: "EMAIL",
        summary: `Member assigned to department: ${
          selectedDepartment?.name || "Unknown department"
        }.`,
        responderId: sub, // In a real app, this would be the logged-in user
        memberId: id,
      };

      //create followup

      const resp = await client.graphql({
        query: createFollowUp,
        variables: { input: newFollowUp },
      });

      const latestFollowup = resp.data.createFollowUp;

      setMember((prev) => ({
        ...prev,
        followUps: {
          items: [latestFollowup, ...prev.followUps.items],
        },
      }));

      // Close the modal
      setDepartmentModal(false);
    } catch (error) {
      console.log("Error assigning member to department", error);
    }
  };

  const assignMemberToCellGroup = async () => {
    if (!selectedCellGroupId) return;

    try {
      await client.graphql({
        query: updateMember,
        variables: {
          input: {
            id: member.id,
            cellGroupId: selectedCellGroupId,
          },
        },
      });

      // Update local state
      const selectedCellGroup = cellGroups.find(
        (group) => group.id === selectedCellGroupId
      );
      setMember((prev) => ({
        ...prev,
        cellGroupId: selectedCellGroupId,
        cellGroup: selectedCellGroup,
      }));

      const { sub } = await fetchUserAttributes();

      // Add a follow-up record for the assignment
      const newFollowUp = {
        date: new Date().toISOString().split("T")[0],
        method: "EMAIL",
        summary: `Member assigned to cell group: ${
          selectedCellGroup?.name || "Unknown cell group"
        }.`,
        responderId: sub, // In a real app, this would be the logged-in user
        memberId: id,
      };

      //create followup

      const resp = await client.graphql({
        query: createFollowUp,
        variables: { input: newFollowUp },
      });

      const latestFollowup = resp.data.createFollowUp;

      setMember((prev) => ({
        ...prev,
        followUps: {
          items: [latestFollowup, ...prev.followUps.items],
        },
      }));

      // Close the modal
      setCellGroupModal(false);
    } catch (error) {
      console.log("Error assigning member to cell group", error);
    }
  };

  // Add functions to open the modals
  const openDepartmentModal = () => {
    fetchDepartments();
    setSelectedDepartmentId(member.departmentId || "");
    setDepartmentModal(true);
  };

  const openCellGroupModal = () => {
    fetchCellGroups();
    setSelectedCellGroupId(member.cellGroupId || "");
    setCellGroupModal(true);
  };

  // Handle follow-up form input changes
  const handleFollowUpChange = (e) => {
    const { name, value } = e.target;
    setFollowUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle status form input changes
  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new follow-up
  const submitFollowUp = async () => {
    try {
      // In a real app, this would be an API call
      const { sub } = await fetchUserAttributes();
      console.log("Method", followUpForm.method);
      const newFollowUp = {
        date: followUpForm.date,
        method: followUpForm.method.toUpperCase(),
        summary: followUpForm.summary,
        responderId: sub,
        memberId: id,
      };

      //create followup

      const resp = await client.graphql({
        query: createFollowUp,
        variables: { input: newFollowUp },
      });

      const latestFollowup = resp.data.createFollowUp;

      // Update local state (simulating database update)
      setMember((prev) => ({
        ...prev,
        followUps: [
          latestFollowup,
          ...prev.followUps.items,
        ],
      }));

      // Reset form and close modal
      setFollowUpForm({
        date: new Date().toISOString().split("T")[0],
        method: "call",
        summary: "",
        responder: "",
      });
      setFollowUpModal(false);
    } catch (error) {
      console.log("Error submitting followup", error);
    }
  };

  // Submit status update
  const submitStatusUpdate = async () => {
    try {
      //update member
      const input = {
        id,
        status: statusForm.status.toUpperCase(),
      };
      await client.graphql({
        query: updateMember,
        variables: { input },
      });

      const { sub } = await fetchUserAttributes();

      const newFollowUp = {
        date: new Date().toISOString().split("T")[0],
        method: "EMAIL",
        summary: `Status updated to ${getStatusLabel(statusForm.status)}. ${
          statusForm.notes
        }`,
        responderId: sub,
        memberId: id,
      };

      //create followup

      const resp = await client.graphql({
        query: createFollowUp,
        variables: { input: newFollowUp },
      });

      const latestFollowup = resp.data.createFollowUp;

      setMember((prev) => ({
        ...prev,
        status: statusForm.status,
        // Add the status change as a follow-up record
        followUps: [
          latestFollowup,
          ...prev.followUps.items
        ],
      }));

      // Reset form and close modal
      setStatusForm({
        status: "",
        notes: "",
      });
      setStatusUpdateModal(false);
    } catch (error) {
      console.log("Error updating member status", error);
    }
  };

  // Calculate progress percentage based on status
  const calculateProgressPercentage = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return 25;
      case "in_school":
        return 50;
      case "in_department":
        return 75;
      case "established":
        return 100;
      default:
        return 0;
    }
  };

  // Get human-readable status label
  const getStatusLabel = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "New Member";
      case "in_school":
        return "In Newcomers School";
      case "in_department":
        return "Assigned to Department";
      case "established":
        return "Established Member";
      default:
        return "Unknown";
    }
  };

  // Get color for status badge
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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

  // Get icon for follow-up method
  const getFollowUpIcon = (method) => {
    switch (method) {
      case "call":
        return <Phone size={16} />;
      case "sms":
        return <MessageCircle size={16} />;
      case "whatsapp":
        return <MessageCircle size={16} className="text-success" />;
      case "email":
        return <Mail size={16} />;
      case "status_update":
        return <CheckSquare size={16} />;
      default:
        return <HelpCircle size={16} />;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days since last contact
  const daysSinceLastContact = () => {
    if (!member || !member.lastContactedAt) return null;

    const lastContact = new Date(member.lastContactedAt);
    const today = new Date();
    const diffTime = Math.abs(today - lastContact);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading member details...</p>
        </div>
      </Container>
    );
  }

  if (!member) {
    return (
      <Container className="py-5">
        <Alert color="danger">
          <AlertCircle className="me-2" />
          Member not found or an error occurred.
        </Alert>
      </Container>
    );
  }

  const lastContactDays = daysSinceLastContact();

  return (
    <>
      <EnhancedNavbar />
      <Container fluid className="py-4" style={{ marginTop: "120px" }}>
        {/* Header section with member name and actions */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-0">
                  <User className="me-2" />
                  Member Details
                </h2>
                <p className="text-muted">View and manage member information</p>
              </div>
              <div>
                {currentUser.sub === member?.assignedTo?.id && (
                  <>
                    <Button
                      color="primary"
                      className="me-2"
                      onClick={() => setFollowUpModal(true)}
                    >
                      <Plus size={16} className="me-1" />
                      Add Follow-up
                    </Button>
                    <Button
                      color="success"
                      onClick={() => setStatusUpdateModal(true)}
                    >
                      <Edit size={16} className="me-1" />
                      Update Status
                    </Button>
                    <Button
                      color="info"
                      className="me-2"
                      onClick={openDepartmentModal}
                    >
                      <Briefcase size={16} className="me-1" />
                      {member.department
                        ? "Change Department"
                        : "Assign Department"}
                    </Button>

                    <Button
                      color="info"
                      className="me-2"
                      onClick={openCellGroupModal}
                    >
                      <Users size={16} className="me-1" />
                      {member.cellGroup
                        ? "Change Cell Group"
                        : "Assign Cell Group"}
                    </Button>
                  </>
                )}

                {currentUser.sub === "b05cb93c-60e1-70d0-e633-99032dfeb48b" && (
                  <Button
                    color="info"
                    className="me-2"
                    onClick={openAssignUserModal}
                  >
                    <Users size={16} className="me-1" />
                    {member.assignedTo ? "Reassign Member" : "Assign Member"}
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Member overview card */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <CardBody>
                <Row>
                  {/* Member photo/avatar column */}
                  <Col md={2} className="text-center">
                    <div
                      className="bg-light rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                      style={{ width: "120px", height: "120px" }}
                    >
                      <User size={48} />
                    </div>
                    <h4>{member.fullName}</h4>
                    <Badge
                      color={getStatusColor(member.status)}
                      className="mb-2"
                    >
                      {getStatusLabel(member.status)}
                    </Badge>
                    <div className="small text-muted">
                      Member ID: {member.id}
                    </div>
                  </Col>

                  {/* Member details column */}
                  <Col md={5}>
                    <h5 className="mb-3">Contact Information</h5>
                    <div className="mb-2">
                      <Phone size={16} className="me-2 text-primary" />
                      <strong>Phone:</strong> {member.mobile}
                    </div>
                    <div className="mb-2">
                      <Mail size={16} className="me-2 text-primary" />
                      <strong>Email:</strong> {member.email}
                    </div>
                    {/* <div className="mb-2">
                      <Home size={16} className="me-2 text-primary" />
                      <strong>Address:</strong> {member.address}
                    </div> */}
                    <div className="mb-2">
                      <MapPin size={16} className="me-2 text-primary" />
                      {/* <strong>Zone:</strong> {member.zone} /{" "} */}
                      <strong>Cell Group:</strong> {member.cellGroup}
                    </div>
                    {/* Replace or update the existing MapPin section with this */}
                    <div className="mb-2">
                      <MapPin size={16} className="me-2 text-primary" />
                      <strong>Cell Group:</strong>{" "}
                      {member.cellGroup ? (
                        <Badge color="primary">{member.cellGroup.name}</Badge>
                      ) : (
                        <Badge color="light" className="text-muted">
                          Not assigned
                        </Badge>
                      )}
                      <Button
                        color="link"
                        size="sm"
                        className="p-0 ms-2"
                        onClick={openCellGroupModal}
                      >
                        {member.cellGroup ? "Change" : "Assign"}
                      </Button>
                    </div>

                    {/* Add this for department display */}
                    <div className="mb-2">
                      <Briefcase size={16} className="me-2 text-primary" />
                      <strong>Department:</strong>{" "}
                      {member.department ? (
                        <Badge color="warning">{member.department.name}</Badge>
                      ) : (
                        <Badge color="light" className="text-muted">
                          Not assigned
                        </Badge>
                      )}
                      <Button
                        color="link"
                        size="sm"
                        className="p-0 ms-2"
                        onClick={openDepartmentModal}
                      >
                        {member.department ? "Change" : "Assign"}
                      </Button>
                    </div>
                    <div className="mb-2">
                      <Calendar size={16} className="me-2 text-primary" />
                      <strong>Registered:</strong>{" "}
                      {formatDate(member.createdAt)}
                    </div>
                    <div className="mb-2">
                      <Clock size={16} className="me-2 text-primary" />
                      <strong>Last Contacted:</strong>{" "}
                      {formatDate(member.lastContactedAt)}
                      {lastContactDays > 14 && (
                        <Badge color="danger" pill className="ms-2">
                          {lastContactDays} days ago
                        </Badge>
                      )}
                    </div>
                  </Col>

                  {/* Member journey column */}
                  <Col md={5}>
                    <h5 className="mb-3">Member Journey</h5>
                    <div className="mb-3">
                      <Progress
                        value={calculateProgressPercentage(member.status)}
                        className="mb-2"
                        style={{ height: "10px" }}
                      />
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">New Member</small>
                        <small className="text-muted">Newcomers School</small>
                        <small className="text-muted">Department</small>
                        <small className="text-muted">Established</small>
                      </div>
                    </div>

                    <div className="mb-2">
                      <Heart size={16} className="me-2 text-danger" />
                      <strong>Decision:</strong> {member.decision}
                    </div>

                    <div className="mb-2">
                      <Book size={16} className="me-2 text-primary" />
                      <strong>Fellowship Interest:</strong>{" "}
                      {member.joinFellowship ? "Yes" : "No"}
                      {member.fellowshipDetails && (
                        <span className="text-muted ms-2">
                          ({member.fellowshipDetails})
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <Users size={16} className="me-2 text-primary" />
                      <strong>Guest Of:</strong> {member.guestOf || "None"}
                    </div>

                    <div className="mb-2">
                      <Award size={16} className="me-2 text-primary" />
                      <strong>Interests:</strong>{" "}
                      {member.interests.map((interest, index) => (
                        <Badge color="info" key={index} className="me-1">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-2">
                      <Briefcase size={16} className="me-2 text-primary" />
                      <strong>Occupation:</strong> {member.occupation}
                    </div>
                  </Col>
                  <Col>
                    <div className="mb-2">
                      <Users size={16} className="me-2 text-primary" />
                      <strong>Assigned To:</strong>{" "}
                      {member.assignedTo ? (
                        <Badge color="info">{member.assignedTo.name}</Badge>
                      ) : (
                        <Badge color="light" className="text-muted">
                          Not assigned
                        </Badge>
                      )}
                      <Button
                        color="link"
                        size="sm"
                        className="p-0 ms-2"
                        onClick={openAssignUserModal}
                      >
                        {member.assignedTo ? "Change" : "Assign"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Tabs for detailed information */}
        <Row>
          <Col>
            <Card className="shadow-sm">
              <CardHeader className="bg-white">
                <Nav tabs className="card-header-tabs">
                  <NavItem>
                    <NavLink
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => setActiveTab("1")}
                      style={{ cursor: "pointer" }}
                    >
                      <MessageCircle size={16} className="me-1" />
                      Follow-up History
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => setActiveTab("2")}
                      style={{ cursor: "pointer" }}
                    >
                      <User size={16} className="me-1" />
                      Personal Details
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "3" ? "active" : ""}
                      onClick={() => setActiveTab("3")}
                      style={{ cursor: "pointer" }}
                    >
                      <CheckCircle size={16} className="me-1" />
                      Action Plan
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>

              <CardBody>
                <TabContent activeTab={activeTab}>
                  {/* Follow-up History Tab */}
                  <TabPane tabId="1">
                    <Row>
                      <Col md={12}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Follow-up Interactions</h5>
                          {currentUser.sub === member?.assignedTo?.id && (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => setFollowUpModal(true)}
                            >
                              <Plus size={14} className="me-1" />
                              New Follow-up
                            </Button>
                          )}
                        </div>

                        {member?.followUps?.items?.length === 0 ? (
                          <Alert color="light">
                            No follow-up records found. Add the first follow-up
                            interaction.
                          </Alert>
                        ) : (
                          <ListGroup flush>
                            {member.followUps?.items?.map((followUp, index) => (
                              <ListGroupItem
                                key={followUp.id}
                                className="border-start-0 border-end-0"
                              >
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <div className="d-flex align-items-center mb-1">
                                      <Badge
                                        color={
                                          followUp.method === "call"
                                            ? "primary"
                                            : followUp.method === "whatsapp"
                                            ? "success"
                                            : followUp.method === "email"
                                            ? "info"
                                            : followUp.method === "sms"
                                            ? "warning"
                                            : "secondary"
                                        }
                                        className="me-2"
                                      >
                                        {getFollowUpIcon(followUp.method)}
                                        <span className="ms-1 text-uppercase">
                                          {followUp.method === "status_update"
                                            ? "Status Update"
                                            : followUp.method}
                                        </span>
                                      </Badge>
                                      <strong>
                                        {formatDate(followUp.date)}
                                      </strong>
                                      <span className="ms-2 text-muted">
                                        by {followUp?.responder?.name}
                                      </span>
                                    </div>
                                    <p className="mb-0">{followUp.summary}</p>
                                  </div>
                                  <div>
                                    <Button color="light" size="sm">
                                      <Edit size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </ListGroupItem>
                            ))}
                          </ListGroup>
                        )}
                      </Col>
                    </Row>
                  </TabPane>

                  {/* Personal Details Tab */}
                  <TabPane tabId="2">
                    <Row>
                      <Col md={6}>
                        <Card className="border-0 shadow-sm mb-4">
                          <CardHeader className="bg-light">
                            <h5 className="mb-0">Personal Information</h5>
                          </CardHeader>
                          <CardBody>
                            <ListGroup flush>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Full Name:</strong> {member.name}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Gender:</strong> {member.gender}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Age Group:</strong> {member.ageGroup}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Marital Status:</strong>{" "}
                                {member.maritalStatus}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Occupation:</strong> {member.occupation}
                              </ListGroupItem>
                            </ListGroup>
                          </CardBody>
                        </Card>

                        <Card className="border-0 shadow-sm">
                          <CardHeader className="bg-light">
                            <h5 className="mb-0">Contact Details</h5>
                          </CardHeader>
                          <CardBody>
                            <ListGroup flush>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Phone:</strong> {member.mobile}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Email:</strong> {member.email}
                              </ListGroupItem>
                              {/* <ListGroupItem className="border-0 px-0">
                                <strong>Address:</strong> {member.address}
                              </ListGroupItem> */}
                            </ListGroup>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col md={6}>
                        <Card className="border-0 shadow-sm mb-4">
                          <CardHeader className="bg-light">
                            <h5 className="mb-0">Church Connection</h5>
                          </CardHeader>
                          <CardBody>
                            <ListGroup flush>
                              <ListGroupItem className="border-0 px-0">
                                <strong>First Visit:</strong>{" "}
                                {formatDate(member.visitDate)}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Guest Of:</strong>{" "}
                                {member.guestOf || "None"}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Zone:</strong> {member.zone}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Cell Group:</strong> {member.cellGroup}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Interests:</strong>{" "}
                                {member.interests.map((interest, index) => (
                                  <Badge
                                    color="info"
                                    key={index}
                                    className="me-1"
                                  >
                                    {interest}
                                  </Badge>
                                ))}
                              </ListGroupItem>
                            </ListGroup>
                          </CardBody>
                        </Card>

                        <Card className="border-0 shadow-sm">
                          <CardHeader className="bg-light">
                            <h5 className="mb-0">Faith Journey</h5>
                          </CardHeader>
                          <CardBody>
                            <ListGroup flush>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Decision:</strong> {member.decision}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Comments:</strong>{" "}
                                {member.comments || "None"}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Fellowship Interest:</strong>{" "}
                                {member.joinFellowship ? "Yes" : "No"}
                              </ListGroupItem>
                              <ListGroupItem className="border-0 px-0">
                                <strong>Fellowship Details:</strong>{" "}
                                {member.fellowshipDetails || "None"}
                              </ListGroupItem>
                            </ListGroup>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>

                  {/* Action Plan Tab */}
                  <TabPane tabId="3">
                    <Row>
                      <Col md={8}>
                        <h5 className="mb-4">Follow-up Action Plan</h5>

                        <div className="mb-4">
                          <h6 className="fw-bold">
                            Current Status:{" "}
                            <Badge color={getStatusColor(member.status)}>
                              {getStatusLabel(member.status)}
                            </Badge>
                          </h6>
                          <p className="text-muted">
                            The member is currently at step{" "}
                            {calculateProgressPercentage(member.status) / 25} of
                            4 in our discipleship journey.
                          </p>
                        </div>

                        <div className="timeline mb-4">
                          <div className="timeline-item">
                            <div className="d-flex mb-3">
                              <div
                                className={`timeline-marker ${
                                  member.status === "new" ||
                                  member.status === "in_school" ||
                                  member.status === "in_department" ||
                                  member.status === "established"
                                    ? "bg-success"
                                    : "bg-light"
                                }`}
                              >
                                <CheckCircle size={16} className="text-white" />
                              </div>
                              <div className="timeline-content">
                                <h6 className="mb-0">
                                  Step 1: New Member Welcome
                                </h6>
                                <p className="text-muted mb-0">
                                  Initial contact and welcome
                                </p>
                              </div>
                              {member.status === "new" && (
                                <Badge color="success" pill>
                                  Current Step
                                </Badge>
                              )}
                            </div>
                            <div className="ms-4 mb-3">
                              <strong>Action Items:</strong>
                              <ul className="mb-0">
                                <li>Initial phone call within 48 hours</li>
                                <li>
                                  Send welcome email with church information
                                </li>
                                <li>Invite to newcomers class</li>
                              </ul>
                            </div>
                          </div>

                          <div className="timeline-item">
                            <div className="d-flex mb-3">
                              <div
                                className={`timeline-marker ${
                                  member.status === "in_school" ||
                                  member.status === "in_department" ||
                                  member.status === "established"
                                    ? "bg-success"
                                    : "bg-light"
                                }`}
                              >
                                <CheckCircle
                                  size={16}
                                  className={
                                    member.status === "in_school" ||
                                    member.status === "in_department" ||
                                    member.status === "established"
                                      ? "text-white"
                                      : "text-muted"
                                  }
                                />
                              </div>
                              <div className="timeline-content">
                                <h6 className="mb-0">
                                  Step 2: Newcomers School
                                </h6>
                                <p className="text-muted mb-0">
                                  Foundational teaching and integration
                                </p>
                              </div>
                              {member.status === "in_school" && (
                                <Badge color="success" pill>
                                  Current Step
                                </Badge>
                              )}
                            </div>
                            <div className="ms-4 mb-3">
                              <strong>Action Items:</strong>
                              <ul className="mb-0">
                                <li>Follow up on class attendance</li>
                                <li>Connect with a mentor</li>
                                <li>Explore interest areas for ministry</li>
                              </ul>
                            </div>
                          </div>

                          <div className="timeline-item">
                            <div className="d-flex mb-3">
                              <div
                                className={`timeline-marker ${
                                  member.status === "in_department" ||
                                  member.status === "established"
                                    ? "bg-success"
                                    : "bg-light"
                                }`}
                              >
                                <CheckCircle
                                  size={16}
                                  className={
                                    member.status === "in_department" ||
                                    member.status === "established"
                                      ? "text-white"
                                      : "text-muted"
                                  }
                                />
                              </div>
                              <div className="timeline-content">
                                <h6 className="mb-0">
                                  Step 3: Department Assignment
                                </h6>
                                <p className="text-muted mb-0">
                                  Integration into ministry area
                                </p>
                              </div>
                              {member.status === "in_department" && (
                                <Badge color="success" pill>
                                  Current Step
                                </Badge>
                              )}
                            </div>
                            <div className="ms-4 mb-3">
                              <strong>Action Items:</strong>
                              <ul className="mb-0">
                                <li>Introduction to department leader</li>
                                <li>Schedule first ministry participation</li>
                                <li>Regular check-ins for first month</li>
                              </ul>
                            </div>
                          </div>

                          <div className="timeline-item">
                            <div className="d-flex mb-3">
                              <div
                                className={`timeline-marker ${
                                  member.status === "established"
                                    ? "bg-success"
                                    : "bg-light"
                                }`}
                              >
                                <CheckCircle
                                  size={16}
                                  className={
                                    member.status === "established"
                                      ? "text-white"
                                      : "text-muted"
                                  }
                                />
                              </div>
                              <div className="timeline-content">
                                <h6 className="mb-0">
                                  Step 4: Established Member
                                </h6>
                                <p className="text-muted mb-0">
                                  Full integration and discipleship
                                </p>
                              </div>
                              {member.status === "established" && (
                                <Badge color="success" pill>
                                  Current Step
                                </Badge>
                              )}
                            </div>
                            <div className="ms-4 mb-3">
                              <strong>Action Items:</strong>
                              <ul className="mb-0">
                                <li>Leadership development opportunities</li>
                                <li>Spiritual gift assessment</li>
                                <li>Set up to mentor new members</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <Button
                          color="success"
                          onClick={() => setStatusUpdateModal(true)}
                        >
                          <ChevronRight size={16} className="me-1" />
                          Advance to Next Step
                        </Button>
                      </Col>

                      <Col md={4}>
                        <Card className="shadow-sm">
                          <CardHeader className="bg-light">
                            <h5 className="mb-0">Next Actions</h5>
                          </CardHeader>
                          <CardBody>
                            {lastContactDays > 14 && (
                              <Alert
                                color="warning"
                                className="d-flex align-items-center mb-3"
                              >
                                <AlertCircle size={16} className="me-2" />
                                <div>
                                  No follow-up in {lastContactDays} days.
                                  Contact needed!
                                </div>
                              </Alert>
                            )}

                            <ListGroup className="mb-3">
                              {member.status === "new" && (
                                <>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Call to welcome</strong>
                                      <div className="small text-muted">
                                        Within 48 hours of visit
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Invite to newcomers class</strong>
                                      <div className="small text-muted">
                                        Send details about next class
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                </>
                              )}

                              {member.status === "in_school" && (
                                <>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Check class attendance</strong>
                                      <div className="small text-muted">
                                        Confirm attendance at newcomers classes
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Connect with cell group</strong>
                                      <div className="small text-muted">
                                        Introduce to cell group leader
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                </>
                              )}

                              {member.status === "in_department" && (
                                <>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Ministry participation</strong>
                                      <div className="small text-muted">
                                        Confirm first ministry activity
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Feedback check-in</strong>
                                      <div className="small text-muted">
                                        Get feedback on their experience
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                </>
                              )}

                              {member.status === "established" && (
                                <>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Leadership assessment</strong>
                                      <div className="small text-muted">
                                        Evaluate for leadership potential
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>Mentorship opportunity</strong>
                                      <div className="small text-muted">
                                        Set up to mentor newer members
                                      </div>
                                    </div>
                                    <Button color="primary" size="sm">
                                      Complete
                                    </Button>
                                  </ListGroupItem>
                                </>
                              )}
                            </ListGroup>

                            {currentUser.sub === member?.assignedTo?.id && (
                              <Button
                                color="primary"
                                block
                                onClick={() => setFollowUpModal(true)}
                              >
                                <Plus size={16} className="me-1" />
                                Add Custom Follow-up
                              </Button>
                            )}
                          </CardBody>
                        </Card>

                        <Card className="shadow-sm mt-4">
                          <CardHeader className="bg-light">
                            <h5 className="mb-0">Interests & Connections</h5>
                          </CardHeader>
                          <CardBody>
                            <h6>Ministry Interests</h6>
                            <div className="mb-3">
                              {member.interests.map((interest, index) => (
                                <Badge
                                  color="info"
                                  className="me-1 mb-1"
                                  key={index}
                                >
                                  {interest}
                                </Badge>
                              ))}
                            </div>

                            <h6>Cell Group</h6>
                            <div className="mb-3">
                              <Badge color="primary" className="mb-2">
                                {member.cellGroup}
                              </Badge>
                              <div className="small text-muted">
                                {member.zone} Zone
                              </div>
                            </div>

                            <h6>Connected Through</h6>
                            <div>
                              {member.guestOf ? (
                                <Badge color="light" className="text-dark">
                                  {member.guestOf}
                                </Badge>
                              ) : (
                                <span className="text-muted">Direct visit</span>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Follow-up Modal */}
        <Modal
          isOpen={followUpModal}
          toggle={() => setFollowUpModal(!followUpModal)}
        >
          <ModalHeader toggle={() => setFollowUpModal(!followUpModal)}>
            Add New Follow-up
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={followUpForm.date}
                  onChange={handleFollowUpChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="method">Contact Method</Label>
                <Input
                  type="select"
                  name="method"
                  id="method"
                  value={followUpForm.method}
                  onChange={handleFollowUpChange}
                >
                  <option value="call">Phone Call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  {/* <option value="in_person">In Person</option> */}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="summary">Summary</Label>
                <Input
                  type="textarea"
                  name="summary"
                  id="summary"
                  placeholder="Describe the interaction and outcomes..."
                  rows="4"
                  value={followUpForm.summary}
                  onChange={handleFollowUpChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => setFollowUpModal(!followUpModal)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={submitFollowUp}
              disabled={!followUpForm.summary}
            >
              <Send size={16} className="me-1" />
              Save Follow-up
            </Button>
          </ModalFooter>
        </Modal>

        {/* Status Update Modal */}
        <Modal
          isOpen={statusUpdateModal}
          toggle={() => setStatusUpdateModal(!statusUpdateModal)}
        >
          <ModalHeader toggle={() => setStatusUpdateModal(!statusUpdateModal)}>
            Update Member Status
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="status">New Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={statusForm.status}
                  onChange={handleStatusChange}
                >
                  <option value="">Select new status...</option>
                  <option value="new" disabled={member.status !== "new"}>
                    New Member
                  </option>
                  <option
                    value="in_school"
                    disabled={
                      member.status === "in_department" ||
                      member.status === "established"
                    }
                  >
                    In Newcomers School
                  </option>
                  <option
                    value="in_department"
                    disabled={member.status === "established"}
                  >
                    Assigned to Department
                  </option>
                  <option value="established">Established Member</option>
                </Input>
                {!statusForm.status && (
                  <div className="small text-muted mt-1">
                    Select the next appropriate status for this member's
                    journey.
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  type="textarea"
                  name="notes"
                  id="notes"
                  placeholder="Additional notes about this status change..."
                  rows="4"
                  value={statusForm.notes}
                  onChange={handleStatusChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => setStatusUpdateModal(!statusUpdateModal)}
            >
              Cancel
            </Button>
            <Button
              color="success"
              onClick={submitStatusUpdate}
              disabled={!statusForm.status}
            >
              <CheckCircle size={16} className="me-1" />
              Update Status
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={assignUserModal}
          toggle={() => setAssignUserModal(!assignUserModal)}
        >
          <ModalHeader toggle={() => setAssignUserModal(!assignUserModal)}>
            Assign Member to Team Member
          </ModalHeader>
          <ModalBody>
            {loadingUsers ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading users...</span>
                </div>
              </div>
            ) : (
              <Form>
                <FormGroup>
                  <Label for="userId">Select Team Member</Label>
                  <Input
                    type="select"
                    name="userId"
                    id="userId"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Select a team member...</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                {member.assignedTo && (
                  <Alert color="info">
                    <div className="d-flex align-items-center">
                      <Info size={16} className="me-2" />
                      <div>
                        Currently assigned to:{" "}
                        <strong>{member.assignedTo.name || "Unknown"}</strong>
                      </div>
                    </div>
                  </Alert>
                )}
              </Form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => setAssignUserModal(!assignUserModal)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={assignMemberToUser}
              disabled={!selectedUserId || loadingUsers}
            >
              <CheckCircle size={16} className="me-1" />
              {member.assignedTo ? "Reassign Member" : "Assign Member"}
            </Button>
          </ModalFooter>
        </Modal>

        {/* Department Assignment Modal */}
        <Modal
          isOpen={departmentModal}
          toggle={() => setDepartmentModal(!departmentModal)}
        >
          <ModalHeader toggle={() => setDepartmentModal(!departmentModal)}>
            Assign Member to Department
          </ModalHeader>
          <ModalBody>
            {loadingDepartments ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">
                    Loading departments...
                  </span>
                </div>
              </div>
            ) : (
              <Form>
                <FormGroup>
                  <Label for="departmentId">Select Department</Label>
                  <Input
                    type="select"
                    name="departmentId"
                    id="departmentId"
                    value={selectedDepartmentId}
                    onChange={(e) => setSelectedDepartmentId(e.target.value)}
                  >
                    <option value="">Select a department...</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                {member.department && (
                  <Alert color="info">
                    <div className="d-flex align-items-center">
                      <Info size={16} className="me-2" />
                      <div>
                        Currently assigned to:{" "}
                        <strong>{member.department.name || "Unknown"}</strong>
                      </div>
                    </div>
                  </Alert>
                )}
              </Form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => setDepartmentModal(!departmentModal)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={assignMemberToDepartment}
              disabled={!selectedDepartmentId || loadingDepartments}
            >
              <CheckCircle size={16} className="me-1" />
              {member.department ? "Reassign Department" : "Assign Department"}
            </Button>
          </ModalFooter>
        </Modal>

        {/* Cell Group Assignment Modal */}
        <Modal
          isOpen={cellGroupModal}
          toggle={() => setCellGroupModal(!cellGroupModal)}
        >
          <ModalHeader toggle={() => setCellGroupModal(!cellGroupModal)}>
            Assign Member to Cell Group
          </ModalHeader>
          <ModalBody>
            {loadingCellGroups ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">
                    Loading cell groups...
                  </span>
                </div>
              </div>
            ) : (
              <Form>
                <FormGroup>
                  <Label for="cellGroupId">Select Cell Group</Label>
                  <Input
                    type="select"
                    name="cellGroupId"
                    id="cellGroupId"
                    value={selectedCellGroupId}
                    onChange={(e) => setSelectedCellGroupId(e.target.value)}
                  >
                    <option value="">Select a cell group...</option>
                    {cellGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                {member.cellGroup && (
                  <Alert color="info">
                    <div className="d-flex align-items-center">
                      <Info size={16} className="me-2" />
                      <div>
                        Currently assigned to:{" "}
                        <strong>{member.cellGroup.name || "Unknown"}</strong>
                      </div>
                    </div>
                  </Alert>
                )}
              </Form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => setCellGroupModal(!cellGroupModal)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={assignMemberToCellGroup}
              disabled={!selectedCellGroupId || loadingCellGroups}
            >
              <CheckCircle size={16} className="me-1" />
              {member.cellGroup ? "Reassign Cell Group" : "Assign Cell Group"}
            </Button>
          </ModalFooter>
        </Modal>

        {/* Custom CSS for timeline */}
        <style jsx>{`
          .timeline-marker {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
          }

          .timeline-item {
            position: relative;
            padding-bottom: 20px;
          }

          .timeline-item:before {
            content: "";
            position: absolute;
            left: 16px;
            top: 32px;
            height: calc(100% - 32px);
            width: 2px;
            background-color: #e9ecef;
          }

          .timeline-item:last-child:before {
            display: none;
          }
        `}</style>
      </Container>
    </>
  );
};

export default MemberDetails;
