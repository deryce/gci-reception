import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Progress,
  Card,
  FormFeedback,
} from "reactstrap";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Users,
  Calendar,
  Heart,
  Briefcase,
  MessageSquare,
  CheckCircle,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Send,
  Home,
  Church,
  AlertCircle,
} from "lucide-react";
import EnhancedNavbar from "../components/header";
import { generateClient } from "aws-amplify/api";
import { createMember } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

// Reusable FormInput component
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
  <FormGroup className="mb-4">
    <Label for={name} className="d-flex align-items-center mb-2">
      {icon && <span className="mr-2 text-primary">{icon}</span>} {label}{" "}
      {rules?.required && "*"}
    </Label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          className={`form-control-lg shadow-sm border-0 ${
            error ? "is-invalid" : ""
          }`}
        />
      )}
    />
    {error && (
      <FormFeedback>
        <span className="d-flex align-items-center">
          <AlertCircle size={14} className="mr-2" /> {error.message}
        </span>
      </FormFeedback>
    )}
  </FormGroup>
);

const ChurchRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const client = generateClient();

  // Get current date in YYYY-MM-DD format for the date picker default value
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, touchedFields },
    trigger,
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Personal Details
      name: "",
      city: "",
      mobile: "",
      email: "",
      visitDate: formattedDate, // Initialize with current date

      // Church Connection
      guestOf: "",
      ageGroup: "",
      gender: "",
      maritalStatus: "",
      occupation: "",

      // Faith Journey
      decision: "",
      comments: "",

      // Community
      joinFellowship: false,
      fellowshipDetails: "",
    },
  });

  // Watch for fellowship checkbox changes
  const watchJoinFellowship = watch("joinFellowship");

  // Debug the form state - remove in production
  const formValues = watch();

  // Define what fields are required for each step
  const stepValidation = {
    1: ["name", "city", "email", "visitDate"],
    2: ["ageGroup", "maritalStatus", "gender"],
    3: ["decision"],
    4: [],
  };

  // Check if the current step's fields are valid
  const isStepValid = async () => {
    const fieldsToValidate = stepValidation[step];
    // Trigger validation only for the current step's fields
    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async (e) => {
    // Prevent any default form submission
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Validate fields for current step before proceeding
    const valid = await isStepValid();

    if (valid) {
      setStep(step + 1);
      window.scrollTo(0, 0);
      // Clear errors for fields that will no longer be visible
      clearErrors();
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
    // Clear errors when going back
    clearErrors();
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);

      // Prepare input data
      const input = {
        name: data.name,
        city: data.city,
        mobile: data.mobile,
        email: data.email,
        visitDate: data.visitDate,
        guestOf: data.guestOf,
        ageGroup: data.ageGroup,
        gender: data.gender.toUpperCase(),
        maritalStatus: data.maritalStatus.toUpperCase(),
        occupation: data.occupation,
        decision: data.decision,
        comments: data.comments,
        joinFellowship: data.joinFellowship,
        fellowshipDetails:
          "Become part of our community and join our regular gatherings",
        interests: data.fellowshipDetails,
        status: "NEW",
      };

      // Create member in database
      const resp = await client.graphql({
        query: createMember,
        variables: { input },
      });
      console.log("Created member", resp.data.createMember);

      // Show success alert and redirect when OK is clicked
      window.alert(
        "Registration submitted successfully! Welcome to our community."
      );

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      window.alert(
        "There was an error processing your registration. Please try again."
      );
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Progress percentage
  const progress = Math.round((step / totalSteps) * 100);

  // Render form based on current step
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-center mb-5">
              <h3 className="text-primary font-weight-bold mb-3">
                Personal Details
              </h3>
              <p className="text-muted">Help us get to know you better</p>
            </div>

            <FormInput
              name="name"
              control={control}
              label="Full Name"
              placeholder="John Doe"
              icon={<User size={18} />}
              error={errors.name}
              rules={{
                required: "Your name is required",
              }}
            />

            <FormInput
              name="visitDate"
              control={control}
              label="Visit Date"
              type="date"
              icon={<Calendar size={18} />}
              error={errors.visitDate}
              rules={{
                required: "Please select a visit date",
              }}
            />
            {watch("visitDate") && (
              <small className="text-muted mt-2 d-block mb-4">
                Selected: {formatDate(watch("visitDate"))}
              </small>
            )}

            <FormInput
              name="city"
              control={control}
              label="City"
              placeholder="Your city"
              icon={<MapPin size={18} />}
              error={errors.city}
              rules={{
                required: "Your city is required",
              }}
            />

            <Row form>
              <Col md={6}>
                <FormInput
                  name="mobile"
                  control={control}
                  label="Phone Number"
                  placeholder="(123) 456-7890"
                  icon={<Phone size={18} />}
                  error={errors.mobile}
                  rules={{
                    pattern: {
                      value: /^[0-9\-\+\(\)\s]*$/,
                      message: "Please enter a valid phone number",
                    },
                  }}
                />
              </Col>
              <Col md={6}>
                <FormInput
                  name="email"
                  control={control}
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  icon={<Mail size={18} />}
                  error={errors.email}
                  rules={{
                    // required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  }}
                />
              </Col>
            </Row>
          </>
        );

      case 2:
        return (
          <>
            <div className="text-center mb-5">
              <h3 className="text-primary font-weight-bold mb-3">
                Church Connection
              </h3>
              <p className="text-muted">Tell us a bit about yourself</p>
            </div>

            <FormInput
              name="guestOf"
              control={control}
              label="I came as a guest of"
              placeholder="Friend or family member's name"
              icon={<Users size={18} />}
              error={errors.guestOf}
            />

            <FormGroup tag="fieldset" className="mb-4">
              <Label className="d-flex align-items-center mb-3">
                <Calendar size={18} className="mr-2 text-primary" /> Age Group *
              </Label>

              <div className="d-flex flex-wrap">
                {["-14", "15-18", "19-25", "26-35", "36-45", "+46"].map(
                  (age) => (
                    <div key={age} className="mb-3 mr-3">
                      <Label check className="age-group-option">
                        <Controller
                          name="ageGroup"
                          control={control}
                          rules={{ required: "Please select your age group" }}
                          render={({ field }) => (
                            <Input
                              type="radio"
                              className="d-none"
                              checked={field.value === age}
                              onChange={() => field.onChange(age)}
                            />
                          )}
                        />
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            watch("ageGroup") === age
                              ? "bg-primary text-white"
                              : "bg-light border"
                          }`}
                          onClick={() => setValue("ageGroup", age)}
                        >
                          {age}
                        </div>
                      </Label>
                    </div>
                  )
                )}
              </div>
              {errors.ageGroup && (
                <div className="text-danger d-flex align-items-center mt-2">
                  <AlertCircle size={14} className="mr-2" />{" "}
                  {errors.ageGroup.message}
                </div>
              )}
            </FormGroup>

            <FormGroup tag="fieldset" className="mb-4">
              <Label className="d-flex align-items-center mb-3">
                <Users size={18} className="mr-2 text-primary" /> Gender *
              </Label>

              <div className="d-flex">
                {["Male", "Female"].map((status) => (
                  <div key={status} className="mb-3 mr-4">
                    <Label check className="marital-status-option">
                      <Controller
                        name="gender"
                        control={control}
                        rules={{
                          required: "Please select your gender.",
                        }}
                        render={({ field }) => (
                          <Input
                            type="radio"
                            className="d-none"
                            checked={field.value === status}
                            onChange={() => field.onChange(status)}
                          />
                        )}
                      />
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          watch("gender") === status
                            ? "bg-primary text-white"
                            : "bg-light border"
                        }`}
                        onClick={() => setValue("gender", status)}
                      >
                        {status}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
              {errors.gender && (
                <div className="text-danger d-flex align-items-center mt-2">
                  <AlertCircle size={14} className="mr-2" />{" "}
                  {errors.gender.message}
                </div>
              )}
            </FormGroup>

            <FormGroup tag="fieldset" className="mb-4">
              <Label className="d-flex align-items-center mb-3">
                <Heart size={18} className="mr-2 text-primary" /> Marital Status
                *
              </Label>

              <div className="d-flex">
                {["Single", "Married"].map((status) => (
                  <div key={status} className="mb-3 mr-4">
                    <Label check className="marital-status-option">
                      <Controller
                        name="maritalStatus"
                        control={control}
                        rules={{
                          required: "Please select your marital status",
                        }}
                        render={({ field }) => (
                          <Input
                            type="radio"
                            className="d-none"
                            checked={field.value === status}
                            onChange={() => field.onChange(status)}
                          />
                        )}
                      />
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          watch("maritalStatus") === status
                            ? "bg-primary text-white"
                            : "bg-light border"
                        }`}
                        onClick={() => setValue("maritalStatus", status)}
                      >
                        {status}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
              {errors.maritalStatus && (
                <div className="text-danger d-flex align-items-center mt-2">
                  <AlertCircle size={14} className="mr-2" />{" "}
                  {errors.maritalStatus.message}
                </div>
              )}
            </FormGroup>

            <FormInput
              name="occupation"
              control={control}
              label="Occupation"
              placeholder="Your profession"
              icon={<Briefcase size={18} />}
              error={errors.occupation}
            />
          </>
        );

      case 3:
        return (
          <>
            <div className="text-center mb-5">
              <h3 className="text-primary font-weight-bold mb-3">
                Faith Journey
              </h3>
              <p className="text-muted">Share your spiritual decision</p>
            </div>

            <FormGroup tag="fieldset" className="mb-5">
              <Label className="d-flex align-items-center mb-3">
                <BookOpen size={18} className="mr-2 text-primary" /> My decision
                today *
              </Label>

              <Card
                className="shadow-sm mb-3 hover-card border-0"
                onClick={() => {
                  setValue(
                    "decision",
                    "I would like to give my life to Christ"
                  );
                  // Manually trigger validation for decision field after setting value
                  trigger("decision");
                }}
              >
                <Label check className="p-4 mb-0">
                  <Controller
                    name="decision"
                    control={control}
                    rules={{ required: "Please select a decision" }}
                    render={({ field }) => (
                      <Input
                        type="radio"
                        className="mr-3"
                        checked={
                          field.value ===
                          "I would like to give my life to Christ"
                        }
                        onChange={() => {
                          field.onChange(
                            "I would like to give my life to Christ"
                          );
                          // Manually trigger validation for decision field after change
                          trigger("decision");
                        }}
                      />
                    )}
                  />
                  <div className="d-flex align-items-center">
                    <div
                      className={`rounded-circle p-2 ${
                        watch("decision") ===
                        "I would like to give my life to Christ"
                          ? "bg-success-light"
                          : "bg-light"
                      } mr-3`}
                    >
                      <CheckCircle size={22} className="text-success" />
                    </div>
                    <span className="font-weight-bold">
                      I would like to give my life to Christ
                    </span>
                  </div>
                </Label>
              </Card>

              <Card
                className="shadow-sm hover-card border-0"
                onClick={() => {
                  setValue(
                    "decision",
                    "I would like to renew my commitment to Christ"
                  );
                  // Manually trigger validation for decision field after setting value
                  trigger("decision");
                }}
              >
                <Label check className="p-4 mb-0">
                  <Controller
                    name="decision"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="radio"
                        className="mr-3"
                        checked={
                          field.value ===
                          "I would like to renew my commitment to Christ"
                        }
                        onChange={() => {
                          field.onChange(
                            "I would like to renew my commitment to Christ"
                          );
                          // Manually trigger validation for decision field after change
                          trigger("decision");
                        }}
                      />
                    )}
                  />
                  <div className="d-flex align-items-center">
                    <div
                      className={`rounded-circle p-2 ${
                        watch("decision") ===
                        "I would like to renew my commitment to Christ"
                          ? "bg-success-light"
                          : "bg-light"
                      } mr-3`}
                    >
                      <CheckCircle size={22} className="text-success" />
                    </div>
                    <span className="font-weight-bold">
                      I would like to renew my commitment to Christ
                    </span>
                  </div>
                </Label>
              </Card>

              {errors.decision && (
                <div className="text-danger d-flex align-items-center mt-3">
                  <AlertCircle size={14} className="mr-2" />{" "}
                  {errors.decision.message}
                </div>
              )}
            </FormGroup>

            <FormInput
              name="comments"
              control={control}
              label="Prayer Request / Comments"
              placeholder="Share your prayer requests or any comments you have..."
              type="textarea"
              icon={<MessageSquare size={18} />}
              error={errors.comments}
            />
          </>
        );

      case 4:
        return (
          <>
            <div className="text-center mb-5">
              <h3 className="text-primary font-weight-bold mb-3">
                Community Involvement
              </h3>
              <p className="text-muted">
                Last step: Let us know how you'd like to connect
              </p>
            </div>

            <div className="bg-light-blue rounded-lg p-4 mb-5 shadow-sm border-left border-primary border-w-3">
              <FormGroup check className="mb-3">
                <Label check className="d-flex align-items-center">
                  <Controller
                    name="joinFellowship"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        className="mr-3 custom-checkbox"
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          // If unchecking the box, clear any errors for the fellowship details
                          if (!e.target.checked) {
                            clearErrors("fellowshipDetails");
                          }
                        }}
                      />
                    )}
                  />
                  <div>
                    <span className="font-weight-bold d-flex align-items-center">
                      <Home size={18} className="mr-2 text-primary" />I would
                      like to join the church fellowship
                    </span>
                    <small className="text-muted">
                      Become part of our community and join our regular
                      gatherings
                    </small>
                  </div>
                </Label>
              </FormGroup>

              {watchJoinFellowship && (
                <div className="ml-4 pl-2 border-left border-primary border-w-2">
                  <FormInput
                    name="fellowshipDetails"
                    control={control}
                    label="What are you most interested in?"
                    placeholder="Bible study, youth group, worship team, etc."
                    error={errors.fellowshipDetails}
                    rules={{
                      required: watchJoinFellowship
                        ? "Please provide details about your interests"
                        : false,
                    }}
                  />
                </div>
              )}
            </div>

            <div className="bg-light-blue rounded-lg p-4 shadow-sm">
              <h5 className="mb-4 font-weight-bold text-primary">
                Review Your Information
              </h5>
              <Row>
                <Col md={6} className="mb-4">
                  <p className="mb-1 text-muted small text-uppercase">Name</p>
                  <p className="font-weight-bold">
                    {watch("name") || "Not provided"}
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <p className="mb-1 text-muted small text-uppercase">
                    Visit Date
                  </p>
                  <p className="font-weight-bold">
                    {formatDate(watch("visitDate"))}
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <p className="mb-1 text-muted small text-uppercase">City</p>
                  <p className="font-weight-bold">
                    {watch("city") || "Not provided"}
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <p className="mb-1 text-muted small text-uppercase">Phone</p>
                  <p className="font-weight-bold">
                    {watch("mobile") || "Not provided"}
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <p className="mb-1 text-muted small text-uppercase">Email</p>
                  <p className="font-weight-bold">
                    {watch("email") || "Not provided"}
                  </p>
                </Col>
                <Col md={6} className="mb-4">
                  <p className="mb-1 text-muted small text-uppercase">
                    Age Group
                  </p>
                  <p className="font-weight-bold">
                    {watch("ageGroup") || "Not provided"}
                  </p>
                </Col>
              </Row>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <EnhancedNavbar />
      <div className="registration-page py-5" style={{ marginTop: "120px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <div className="text-center mb-5">
                <div className="church-logo mb-4">
                  <Church size={48} className="text-white" />
                </div>
                <h1 className="display-4 font-weight-bold text-dark mb-3">
                  Great Commissioners International
                </h1>
                <h2 className="h3 text-primary mb-3">
                  Welcome to Our Community
                </h2>
                <p className="lead text-muted">
                  We're glad you're here! Let's get to know each other better.
                </p>
              </div>

              <Card className="border-0 shadow-lg rounded-lg overflow-hidden">
                <div className="progress-header bg-primary p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white">
                      Step {step} of {totalSteps}
                    </span>
                    <span className="text-white font-weight-bold">
                      {progress}% Complete
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    className="progress-thin bg-primary-light"
                    barClassName="bg-white"
                  />
                </div>

                <div className="p-4 p-lg-5">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    {renderForm()}

                    <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                      {step > 1 ? (
                        <Button
                          color="light"
                          onClick={prevStep}
                          type="button"
                          className="d-flex align-items-center px-4 py-2 shadow-sm border-0"
                        >
                          <ChevronLeft size={20} className="mr-2" /> Back
                        </Button>
                      ) : (
                        <div></div>
                      )}

                      {step < totalSteps ? (
                        <Button
                          color="primary"
                          onClick={nextStep}
                          type="button"
                          className="d-flex align-items-center px-4 py-2 shadow-sm border-0"
                        >
                          Continue <ChevronRight size={20} className="ml-2" />
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          type="submit"
                          className="d-flex align-items-center px-4 py-2 shadow-sm border-0"
                        >
                          <Send size={18} className="mr-2" /> Submit
                          Registration
                        </Button>
                      )}
                    </div>
                  </Form>
                </div>
              </Card>

              <div className="text-center mt-4">
                <p className="text-muted small">
                  © 2025 Great Commissioners International. All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <style jsx>{`
          .registration-page {
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            min-height: 100vh;
          }

          .church-logo {
            background: linear-gradient(45deg, #3498db, #2980b9);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 10px 15px rgba(41, 128, 185, 0.3);
          }

          .progress-thin {
            height: 8px;
            border-radius: 4px;
          }

          .progress-header {
            background: linear-gradient(90deg, #3498db, #2980b9);
          }

          .bg-primary-light {
            background-color: rgba(255, 255, 255, 0.3);
          }

          .bg-light-blue {
            background-color: #f1f7fc;
          }

          .border-w-3 {
            border-left-width: 3px !important;
          }

          .border-w-2 {
            border-left-width: 2px !important;
          }

          .age-group-option:hover div,
          .marital-status-option:hover div {
            cursor: pointer;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
            transition: all 0.2s ease;
          }

          .hover-card {
            transition: all 0.3s ease;
          }

          .hover-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            cursor: pointer;
          }

          .bg-success-light {
            background-color: rgba(40, 167, 69, 0.1);
          }

          .custom-checkbox {
            width: 20px;
            height: 20px;
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

          input[type="date"].form-control-lg {
            padding: 7px 15px;
          }

          .text-primary {
            color: #3498db !important;
          }

          .bg-primary {
            background-color: #3498db !important;
          }

          .btn-primary {
            background-color: #3498db;
            border-color: #3498db;
          }

          .btn-primary:hover {
            background-color: #2980b9;
            border-color: #2980b9;
          }

          .btn-success {
            background-color: #27ae60;
            border-color: #27ae60;
          }

          .btn-success:hover {
            background-color: #219653;
            border-color: #219653;
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
        `}</style>
      </div>
    </>
  );
};

export default ChurchRegistrationForm;
