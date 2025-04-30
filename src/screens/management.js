import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Badge,
  Alert,
  Spinner,
} from "reactstrap";
import {
  Users,
  UserPlus,
  Home,
  Plus,
  Briefcase,
  Mail,
  Phone,
  User,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Filter,
  AlertCircle,
} from "lucide-react";
import { generateClient } from "aws-amplify/api";
import EnhancedNavbar from "../components/header";
import { useForm, Controller } from "react-hook-form";
import {
  createLeader,
  createCellGroup,
  createDepartment,
  deleteLeader,
  deleteCellGroup,
  deleteDepartment,
} from "../graphql/mutations";
import {
  listLeaders,
  listCellGroups,
  listDepartments,
} from "../graphql/queries";

// Reusable FormInput component (if not already extracted to a separate file)
const FormInput = ({
  name,
  control,
  rules,
  label,
  type = "text",
  error,
  icon,
  placeholder,
}) => (
  <div className="form-group mb-3">
    <label htmlFor={name} className="d-flex align-items-center mb-2">
      {icon && <span className="mr-2 text-primary">{icon}</span>} {label}{" "}
      {rules?.required && "*"}
    </label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          className={`form-control form-control-lg shadow-sm border-0 ${
            error ? "is-invalid" : ""
          }`}
        />
      )}
    />
    {error && (
      <div className="invalid-feedback">
        <span className="d-flex align-items-center">
          <AlertCircle size={14} className="mr-2" /> {error.message}
        </span>
      </div>
    )}
  </div>
);

const LeadershipManagement = () => {
  const client = generateClient();

  // State for data
  const [leaders, setLeaders] = useState([]);
  const [cellGroups, setCellGroups] = useState([]);
  const [departments, setDepartments] = useState([]);

  // State for loading indicators
  const [loading, setLoading] = useState({
    leaders: false,
    cellGroups: false,
    departments: false,
  });

  // State for alerts
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // State for modal visibility
  const [modals, setModals] = useState({
    leader: false,
    cellGroup: false,
    department: false,
  });

  // Initial form values
  const defaultLeaderValues = {
    name: "",
    phone: "",
    email: "",
  };

  const defaultCellGroupValues = {
    name: "",
    leaderId: "",
  };

  const defaultDepartmentValues = {
    name: "",
    leaderId: "",
  };

  // React Hook Form for Leader
  const leaderForm = useForm({
    defaultValues: defaultLeaderValues,
  });

  // React Hook Form for Cell Group
  const cellGroupForm = useForm({
    defaultValues: defaultCellGroupValues,
  });

  // React Hook Form for Department
  const departmentForm = useForm({
    defaultValues: defaultDepartmentValues,
  });

  // Toggle modals
  const toggleModal = (modalName) => {
    setModals({
      ...modals,
      [modalName]: !modals[modalName],
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchLeaders();
    fetchCellGroups();
    fetchDepartments();
  }, []);

  // Fetch Leaders from API
  const fetchLeaders = async () => {
    setLoading((prev) => ({ ...prev, leaders: true }));
    try {
      const result = await client.graphql({
        query: listLeaders,
      });
      setLeaders(result.data.listLeaders.items);
    } catch (error) {
      console.error("Error fetching leaders:", error);
      showAlert("Failed to fetch leaders", "danger");
    } finally {
      setLoading((prev) => ({ ...prev, leaders: false }));
    }
  };

  // Fetch Cell Groups from API
  const fetchCellGroups = async () => {
    setLoading((prev) => ({ ...prev, cellGroups: true }));
    try {
      const result = await client.graphql({
        query: listCellGroups,
      });
      setCellGroups(result.data.listCellGroups.items);
    } catch (error) {
      console.error("Error fetching cell groups:", error);
      showAlert("Failed to fetch cell groups", "danger");
    } finally {
      setLoading((prev) => ({ ...prev, cellGroups: false }));
    }
  };

  // Fetch Departments from API
  const fetchDepartments = async () => {
    setLoading((prev) => ({ ...prev, departments: true }));
    try {
      const result = await client.graphql({
        query: listDepartments,
      });
      setDepartments(result.data.listDepartments.items);
    } catch (error) {
      console.error("Error fetching departments:", error);
      showAlert("Failed to fetch departments", "danger");
    } finally {
      setLoading((prev) => ({ ...prev, departments: false }));
    }
  };

  // Handle creating a new leader
  const handleLeaderSubmit = async (data) => {
    try {
      const input = {
        name: data.name,
        phone: data.phone,
        email: data.email,
      };

      await client.graphql({
        query: createLeader,
        variables: { input },
      });

      // Reset form and close modal
      leaderForm.reset(defaultLeaderValues);
      toggleModal("leader");

      // Refresh leaders list
      fetchLeaders();

      showAlert("Leader created successfully", "success");
    } catch (error) {
      console.error("Error creating leader:", error);
      showAlert("Failed to create leader", "danger");
    }
  };

  // Handle creating a new cell group
  const handleCellGroupSubmit = async (data) => {
    try {
      const input = {
        name: data.name,
        cellGroupLeaderId: data.leaderId,
      };

      await client.graphql({
        query: createCellGroup,
        variables: { input },
      });

      // Reset form and close modal
      cellGroupForm.reset(defaultCellGroupValues);
      toggleModal("cellGroup");

      // Refresh cell groups list
      fetchCellGroups();

      showAlert("Cell Group created successfully", "success");
    } catch (error) {
      console.error("Error creating cell group:", error);
      showAlert("Failed to create cell group", "danger");
    }
  };

  // Handle creating a new department
  const handleDepartmentSubmit = async (data) => {
    try {
      const input = {
        name: data.name,
        departmentLeaderId: data.leaderId,
      };

      await client.graphql({
        query: createDepartment,
        variables: { input },
      });

      // Reset form and close modal
      departmentForm.reset(defaultDepartmentValues);
      toggleModal("department");

      // Refresh departments list
      fetchDepartments();

      showAlert("Department created successfully", "success");
    } catch (error) {
      console.error("Error creating department:", error);
      showAlert("Failed to create department", "danger");
    }
  };

  // Handle deleting a leader
  const handleDeleteLeader = async (id) => {
    if (window.confirm("Are you sure you want to delete this leader?")) {
      try {
        await client.graphql({
          query: deleteLeader,
          variables: { input: { id } },
        });

        fetchLeaders();
        showAlert("Leader deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting leader:", error);
        showAlert("Failed to delete leader", "danger");
      }
    }
  };

  // Handle deleting a cell group
  const handleDeleteCellGroup = async (id) => {
    if (window.confirm("Are you sure you want to delete this cell group?")) {
      try {
        await client.graphql({
          query: deleteCellGroup,
          variables: { input: { id } },
        });

        fetchCellGroups();
        showAlert("Cell group deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting cell group:", error);
        showAlert("Failed to delete cell group", "danger");
      }
    }
  };

  // Handle deleting a department
  const handleDeleteDepartment = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await client.graphql({
          query: deleteDepartment,
          variables: { input: { id } },
        });

        fetchDepartments();
        showAlert("Department deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting department:", error);
        showAlert("Failed to delete department", "danger");
      }
    }
  };

  // Show alert message
  const showAlert = (message, type = "success") => {
    setAlert({
      show: true,
      message,
      type,
    });

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  // Find leader name by ID
  const getLeaderName = (id) => {
    const leader = leaders.find((leader) => leader.id === id);
    return leader ? leader.name : "Not assigned";
  };

  return (
    <>
      <EnhancedNavbar />
      <div className="leadership-page py-5" style={{ marginTop: "120px" }}>
        <Container>
          {alert.show && (
            <Alert color={alert.type} className="mb-4 shadow-sm">
              {alert.message}
            </Alert>
          )}

          <Row className="mb-5">
            <Col>
              <h1 className="display-4 font-weight-bold text-dark mb-3">
                Leadership Management
              </h1>
              <p className="lead text-muted">
                Manage leaders, cell groups, and departments in your church
              </p>
            </Col>
          </Row>

          <Row>
            {/* Leaders Section */}
            <Col lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                  <h4 className="m-0 d-flex align-items-center">
                    <User size={18} className="mr-2" /> Leaders
                  </h4>
                  <Button
                    color="light"
                    size="sm"
                    className="rounded-circle p-2"
                    onClick={() => toggleModal("leader")}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="card-body p-0">
                  {loading.leaders ? (
                    <div className="text-center p-4">
                      <Spinner color="primary" size="sm" /> Loading...
                    </div>
                  ) : leaders.length === 0 ? (
                    <div className="text-center p-4 text-muted">
                      <AlertCircle size={24} className="mb-2" />
                      <p>No leaders found. Add your first leader.</p>
                    </div>
                  ) : (
                    <ListGroup flush>
                      {leaders.map((leader) => (
                        <ListGroupItem
                          key={leader.id}
                          className="border-0 border-bottom py-3"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-1">{leader.name}</h5>
                              <div className="text-muted small d-flex align-items-center mb-1">
                                <Phone size={14} className="mr-1" />{" "}
                                {leader.phone}
                              </div>
                              <div className="text-muted small d-flex align-items-center">
                                <Mail size={14} className="mr-1" />{" "}
                                {leader.email}
                              </div>
                            </div>
                            <div>
                              <Button
                                color="light"
                                size="sm"
                                className="rounded-circle p-1 mr-1"
                              >
                                <Edit size={14} />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                className="rounded-circle p-1"
                                onClick={() => handleDeleteLeader(leader.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </div>
                <div className="card-footer bg-light d-flex justify-content-between">
                  <small className="text-muted">{leaders.length} leaders</small>
                  <Button
                    color="link"
                    size="sm"
                    className="p-0"
                    onClick={fetchLeaders}
                  >
                    <RefreshCw size={14} className="mr-1" /> Refresh
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Cell Groups Section */}
            <Col lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center py-3">
                  <h4 className="m-0 d-flex align-items-center">
                    <Home size={18} className="mr-2" /> Cell Groups
                  </h4>
                  <Button
                    color="light"
                    size="sm"
                    className="rounded-circle p-2"
                    onClick={() => toggleModal("cellGroup")}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="card-body p-0">
                  {loading.cellGroups ? (
                    <div className="text-center p-4">
                      <Spinner color="success" size="sm" /> Loading...
                    </div>
                  ) : cellGroups.length === 0 ? (
                    <div className="text-center p-4 text-muted">
                      <AlertCircle size={24} className="mb-2" />
                      <p>No cell groups found. Create your first cell group.</p>
                    </div>
                  ) : (
                    <ListGroup flush>
                      {cellGroups.map((group) => (
                        <ListGroupItem
                          key={group.id}
                          className="border-0 border-bottom py-3"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-1">{group.name}</h5>
                              <div className="text-muted small d-flex align-items-center">
                                <User size={14} className="mr-1" /> Leader:{" "}
                                {getLeaderName(group.cellGroupLeaderId)}
                              </div>
                            </div>
                            <div>
                              <Button
                                color="light"
                                size="sm"
                                className="rounded-circle p-1 mr-1"
                              >
                                <Edit size={14} />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                className="rounded-circle p-1"
                                onClick={() => handleDeleteCellGroup(group.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </div>
                <div className="card-footer bg-light d-flex justify-content-between">
                  <small className="text-muted">
                    {cellGroups.length} cell groups
                  </small>
                  <Button
                    color="link"
                    size="sm"
                    className="p-0"
                    onClick={fetchCellGroups}
                  >
                    <RefreshCw size={14} className="mr-1" /> Refresh
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Departments Section */}
            <Col lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <div className="card-header bg-info text-white d-flex justify-content-between align-items-center py-3">
                  <h4 className="m-0 d-flex align-items-center">
                    <Briefcase size={18} className="mr-2" /> Departments
                  </h4>
                  <Button
                    color="light"
                    size="sm"
                    className="rounded-circle p-2"
                    onClick={() => toggleModal("department")}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="card-body p-0">
                  {loading.departments ? (
                    <div className="text-center p-4">
                      <Spinner color="info" size="sm" /> Loading...
                    </div>
                  ) : departments.length === 0 ? (
                    <div className="text-center p-4 text-muted">
                      <AlertCircle size={24} className="mb-2" />
                      <p>No departments found. Create your first department.</p>
                    </div>
                  ) : (
                    <ListGroup flush>
                      {departments.map((dept) => (
                        <ListGroupItem
                          key={dept.id}
                          className="border-0 border-bottom py-3"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-1">{dept.name}</h5>
                              <div className="text-muted small d-flex align-items-center">
                                <User size={14} className="mr-1" /> Leader:{" "}
                                {getLeaderName(dept.departmentLeaderId)}
                              </div>
                            </div>
                            <div>
                              <Button
                                color="light"
                                size="sm"
                                className="rounded-circle p-1 mr-1"
                              >
                                <Edit size={14} />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                className="rounded-circle p-1"
                                onClick={() => handleDeleteDepartment(dept.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </div>
                <div className="card-footer bg-light d-flex justify-content-between">
                  <small className="text-muted">
                    {departments.length} departments
                  </small>
                  <Button
                    color="link"
                    size="sm"
                    className="p-0"
                    onClick={fetchDepartments}
                  >
                    <RefreshCw size={14} className="mr-1" /> Refresh
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Leader Modal */}
        <Modal isOpen={modals.leader} toggle={() => toggleModal("leader")}>
          <ModalHeader toggle={() => toggleModal("leader")}>
            <User size={18} className="mr-2 text-primary" /> Add New Leader
          </ModalHeader>
          <form onSubmit={leaderForm.handleSubmit(handleLeaderSubmit)}>
            <ModalBody>
              <FormInput
                name="name"
                control={leaderForm.control}
                label="Leader Name"
                placeholder="Enter full name"
                icon={<User size={18} />}
                error={leaderForm.formState.errors.name}
                rules={{
                  required: "Leader name is required",
                }}
              />

              <FormInput
                name="phone"
                control={leaderForm.control}
                label="Phone Number"
                placeholder="(123) 456-7890"
                icon={<Phone size={18} />}
                error={leaderForm.formState.errors.phone}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9\-\+\(\)\s]*$/,
                    message: "Please enter a valid phone number",
                  },
                }}
              />

              <FormInput
                name="email"
                control={leaderForm.control}
                label="Email Address"
                type="email"
                placeholder="email@example.com"
                icon={<Mail size={18} />}
                error={leaderForm.formState.errors.email}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => toggleModal("leader")}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create Leader
              </Button>
            </ModalFooter>
          </form>
        </Modal>

        {/* Cell Group Modal */}
        <Modal
          isOpen={modals.cellGroup}
          toggle={() => toggleModal("cellGroup")}
        >
          <ModalHeader toggle={() => toggleModal("cellGroup")}>
            <Home size={18} className="mr-2 text-success" /> Add New Cell Group
          </ModalHeader>
          <form onSubmit={cellGroupForm.handleSubmit(handleCellGroupSubmit)}>
            <ModalBody>
              <FormInput
                name="name"
                control={cellGroupForm.control}
                label="Cell Group Name"
                placeholder="Enter cell group name"
                icon={<Home size={18} />}
                error={cellGroupForm.formState.errors.name}
                rules={{
                  required: "Cell group name is required",
                }}
              />

              <div className="form-group mb-3">
                <label
                  htmlFor="leaderId"
                  className="d-flex align-items-center mb-2"
                >
                  <User size={18} className="mr-2 text-success" /> Group Leader
                  *
                </label>
                <Controller
                  name="leaderId"
                  control={cellGroupForm.control}
                  rules={{
                    required: "Please select a leader",
                  }}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="leaderId"
                      className={`form-control form-control-lg shadow-sm border-0 ${
                        cellGroupForm.formState.errors.leaderId
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="">-- Select Leader --</option>
                      {leaders.map((leader) => (
                        <option key={leader.id} value={leader.id}>
                          {leader.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {cellGroupForm.formState.errors.leaderId && (
                  <div className="invalid-feedback">
                    <span className="d-flex align-items-center">
                      <AlertCircle size={14} className="mr-2" />
                      {cellGroupForm.formState.errors.leaderId.message}
                    </span>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => toggleModal("cellGroup")}
              >
                Cancel
              </Button>
              <Button color="success" type="submit">
                Create Cell Group
              </Button>
            </ModalFooter>
          </form>
        </Modal>

        {/* Department Modal */}
        <Modal
          isOpen={modals.department}
          toggle={() => toggleModal("department")}
        >
          <ModalHeader toggle={() => toggleModal("department")}>
            <Briefcase size={18} className="mr-2 text-info" /> Add New
            Department
          </ModalHeader>
          <form onSubmit={departmentForm.handleSubmit(handleDepartmentSubmit)}>
            <ModalBody>
              <FormInput
                name="name"
                control={departmentForm.control}
                label="Department Name"
                placeholder="Enter department name"
                icon={<Briefcase size={18} />}
                error={departmentForm.formState.errors.name}
                rules={{
                  required: "Department name is required",
                }}
              />

              <div className="form-group mb-3">
                <label
                  htmlFor="leaderId"
                  className="d-flex align-items-center mb-2"
                >
                  <User size={18} className="mr-2 text-info" /> Department
                  Leader *
                </label>
                <Controller
                  name="leaderId"
                  control={departmentForm.control}
                  rules={{
                    required: "Please select a leader",
                  }}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="leaderId"
                      className={`form-control form-control-lg shadow-sm border-0 ${
                        departmentForm.formState.errors.leaderId
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="">-- Select Leader --</option>
                      {leaders.map((leader) => (
                        <option key={leader.id} value={leader.id}>
                          {leader.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {departmentForm.formState.errors.leaderId && (
                  <div className="invalid-feedback">
                    <span className="d-flex align-items-center">
                      <AlertCircle size={14} className="mr-2" />
                      {departmentForm.formState.errors.leaderId.message}
                    </span>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => toggleModal("department")}
              >
                Cancel
              </Button>
              <Button color="info" type="submit">
                Create Department
              </Button>
            </ModalFooter>
          </form>
        </Modal>

        <style jsx>{`
          .leadership-page {
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            min-height: 100vh;
          }

          .card-header {
            border-bottom: none;
          }

          .form-control-lg {
            border-radius: 8px;
            padding: 12px 15px;
            background-color: #f8f9fa;
            transition: all 0.3s ease;
          }

          .form-control-lg:focus {
            background-color: #fff;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
          }

          .btn {
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          .list-group-item {
            transition: all 0.2s ease;
          }

          .list-group-item:hover {
            background-color: #f8f9fa;
          }
        `}</style>
      </div>
    </>
  );
};

export default LeadershipManagement;
