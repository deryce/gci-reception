/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMember } from "../graphql/queries";
import { updateMember } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function MemberUpdateForm(props) {
  const {
    id: idProp,
    member: memberModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    city: "",
    mobile: "",
    email: "",
    visitDate: "",
    guestOf: "",
    ageGroup: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    decision: "",
    comments: "",
    joinFellowship: false,
    fellowshipDetails: "",
    interests: [],
    status: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [city, setCity] = React.useState(initialValues.city);
  const [mobile, setMobile] = React.useState(initialValues.mobile);
  const [email, setEmail] = React.useState(initialValues.email);
  const [visitDate, setVisitDate] = React.useState(initialValues.visitDate);
  const [guestOf, setGuestOf] = React.useState(initialValues.guestOf);
  const [ageGroup, setAgeGroup] = React.useState(initialValues.ageGroup);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [maritalStatus, setMaritalStatus] = React.useState(
    initialValues.maritalStatus
  );
  const [occupation, setOccupation] = React.useState(initialValues.occupation);
  const [decision, setDecision] = React.useState(initialValues.decision);
  const [comments, setComments] = React.useState(initialValues.comments);
  const [joinFellowship, setJoinFellowship] = React.useState(
    initialValues.joinFellowship
  );
  const [fellowshipDetails, setFellowshipDetails] = React.useState(
    initialValues.fellowshipDetails
  );
  const [interests, setInterests] = React.useState(initialValues.interests);
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = memberRecord
      ? { ...initialValues, ...memberRecord }
      : initialValues;
    setName(cleanValues.name);
    setCity(cleanValues.city);
    setMobile(cleanValues.mobile);
    setEmail(cleanValues.email);
    setVisitDate(cleanValues.visitDate);
    setGuestOf(cleanValues.guestOf);
    setAgeGroup(cleanValues.ageGroup);
    setGender(cleanValues.gender);
    setMaritalStatus(cleanValues.maritalStatus);
    setOccupation(cleanValues.occupation);
    setDecision(cleanValues.decision);
    setComments(cleanValues.comments);
    setJoinFellowship(cleanValues.joinFellowship);
    setFellowshipDetails(cleanValues.fellowshipDetails);
    setInterests(cleanValues.interests ?? []);
    setCurrentInterestsValue("");
    setStatus(cleanValues.status);
    setErrors({});
  };
  const [memberRecord, setMemberRecord] = React.useState(memberModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMember.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMember
        : memberModelProp;
      setMemberRecord(record);
    };
    queryData();
  }, [idProp, memberModelProp]);
  React.useEffect(resetStateValues, [memberRecord]);
  const [currentInterestsValue, setCurrentInterestsValue] = React.useState("");
  const interestsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    city: [],
    mobile: [{ type: "Required" }],
    email: [],
    visitDate: [],
    guestOf: [],
    ageGroup: [],
    gender: [],
    maritalStatus: [],
    occupation: [],
    decision: [],
    comments: [],
    joinFellowship: [],
    fellowshipDetails: [],
    interests: [],
    status: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          city: city ?? null,
          mobile,
          email: email ?? null,
          visitDate: visitDate ?? null,
          guestOf: guestOf ?? null,
          ageGroup: ageGroup ?? null,
          gender: gender ?? null,
          maritalStatus: maritalStatus ?? null,
          occupation: occupation ?? null,
          decision: decision ?? null,
          comments: comments ?? null,
          joinFellowship: joinFellowship ?? null,
          fellowshipDetails: fellowshipDetails ?? null,
          interests: interests ?? null,
          status: status ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateMember.replaceAll("__typename", ""),
            variables: {
              input: {
                id: memberRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MemberUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city: value,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="Mobile"
        isRequired={true}
        isReadOnly={false}
        value={mobile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile: value,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.mobile ?? value;
          }
          if (errors.mobile?.hasError) {
            runValidationTasks("mobile", value);
          }
          setMobile(value);
        }}
        onBlur={() => runValidationTasks("mobile", mobile)}
        errorMessage={errors.mobile?.errorMessage}
        hasError={errors.mobile?.hasError}
        {...getOverrideProps(overrides, "mobile")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email: value,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Visit date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={visitDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate: value,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.visitDate ?? value;
          }
          if (errors.visitDate?.hasError) {
            runValidationTasks("visitDate", value);
          }
          setVisitDate(value);
        }}
        onBlur={() => runValidationTasks("visitDate", visitDate)}
        errorMessage={errors.visitDate?.errorMessage}
        hasError={errors.visitDate?.hasError}
        {...getOverrideProps(overrides, "visitDate")}
      ></TextField>
      <TextField
        label="Guest of"
        isRequired={false}
        isReadOnly={false}
        value={guestOf}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf: value,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.guestOf ?? value;
          }
          if (errors.guestOf?.hasError) {
            runValidationTasks("guestOf", value);
          }
          setGuestOf(value);
        }}
        onBlur={() => runValidationTasks("guestOf", guestOf)}
        errorMessage={errors.guestOf?.errorMessage}
        hasError={errors.guestOf?.hasError}
        {...getOverrideProps(overrides, "guestOf")}
      ></TextField>
      <TextField
        label="Age group"
        isRequired={false}
        isReadOnly={false}
        value={ageGroup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup: value,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.ageGroup ?? value;
          }
          if (errors.ageGroup?.hasError) {
            runValidationTasks("ageGroup", value);
          }
          setAgeGroup(value);
        }}
        onBlur={() => runValidationTasks("ageGroup", ageGroup)}
        errorMessage={errors.ageGroup?.errorMessage}
        hasError={errors.ageGroup?.hasError}
        {...getOverrideProps(overrides, "ageGroup")}
      ></TextField>
      <SelectField
        label="Gender"
        placeholder="Please select an option"
        isDisabled={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender: value,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      >
        <option
          children="Male"
          value="MALE"
          {...getOverrideProps(overrides, "genderoption0")}
        ></option>
        <option
          children="Female"
          value="FEMALE"
          {...getOverrideProps(overrides, "genderoption1")}
        ></option>
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "genderoption2")}
        ></option>
      </SelectField>
      <SelectField
        label="Marital status"
        placeholder="Please select an option"
        isDisabled={false}
        value={maritalStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus: value,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.maritalStatus ?? value;
          }
          if (errors.maritalStatus?.hasError) {
            runValidationTasks("maritalStatus", value);
          }
          setMaritalStatus(value);
        }}
        onBlur={() => runValidationTasks("maritalStatus", maritalStatus)}
        errorMessage={errors.maritalStatus?.errorMessage}
        hasError={errors.maritalStatus?.hasError}
        {...getOverrideProps(overrides, "maritalStatus")}
      >
        <option
          children="Single"
          value="SINGLE"
          {...getOverrideProps(overrides, "maritalStatusoption0")}
        ></option>
        <option
          children="Married"
          value="MARRIED"
          {...getOverrideProps(overrides, "maritalStatusoption1")}
        ></option>
        <option
          children="Divorced"
          value="DIVORCED"
          {...getOverrideProps(overrides, "maritalStatusoption2")}
        ></option>
        <option
          children="Widowed"
          value="WIDOWED"
          {...getOverrideProps(overrides, "maritalStatusoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Occupation"
        isRequired={false}
        isReadOnly={false}
        value={occupation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation: value,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.occupation ?? value;
          }
          if (errors.occupation?.hasError) {
            runValidationTasks("occupation", value);
          }
          setOccupation(value);
        }}
        onBlur={() => runValidationTasks("occupation", occupation)}
        errorMessage={errors.occupation?.errorMessage}
        hasError={errors.occupation?.hasError}
        {...getOverrideProps(overrides, "occupation")}
      ></TextField>
      <TextField
        label="Decision"
        isRequired={false}
        isReadOnly={false}
        value={decision}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision: value,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.decision ?? value;
          }
          if (errors.decision?.hasError) {
            runValidationTasks("decision", value);
          }
          setDecision(value);
        }}
        onBlur={() => runValidationTasks("decision", decision)}
        errorMessage={errors.decision?.errorMessage}
        hasError={errors.decision?.hasError}
        {...getOverrideProps(overrides, "decision")}
      ></TextField>
      <TextField
        label="Comments"
        isRequired={false}
        isReadOnly={false}
        value={comments}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments: value,
              joinFellowship,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.comments ?? value;
          }
          if (errors.comments?.hasError) {
            runValidationTasks("comments", value);
          }
          setComments(value);
        }}
        onBlur={() => runValidationTasks("comments", comments)}
        errorMessage={errors.comments?.errorMessage}
        hasError={errors.comments?.hasError}
        {...getOverrideProps(overrides, "comments")}
      ></TextField>
      <SwitchField
        label="Join fellowship"
        defaultChecked={false}
        isDisabled={false}
        isChecked={joinFellowship}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship: value,
              fellowshipDetails,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.joinFellowship ?? value;
          }
          if (errors.joinFellowship?.hasError) {
            runValidationTasks("joinFellowship", value);
          }
          setJoinFellowship(value);
        }}
        onBlur={() => runValidationTasks("joinFellowship", joinFellowship)}
        errorMessage={errors.joinFellowship?.errorMessage}
        hasError={errors.joinFellowship?.hasError}
        {...getOverrideProps(overrides, "joinFellowship")}
      ></SwitchField>
      <TextField
        label="Fellowship details"
        isRequired={false}
        isReadOnly={false}
        value={fellowshipDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails: value,
              interests,
              status,
            };
            const result = onChange(modelFields);
            value = result?.fellowshipDetails ?? value;
          }
          if (errors.fellowshipDetails?.hasError) {
            runValidationTasks("fellowshipDetails", value);
          }
          setFellowshipDetails(value);
        }}
        onBlur={() =>
          runValidationTasks("fellowshipDetails", fellowshipDetails)
        }
        errorMessage={errors.fellowshipDetails?.errorMessage}
        hasError={errors.fellowshipDetails?.hasError}
        {...getOverrideProps(overrides, "fellowshipDetails")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests: values,
              status,
            };
            const result = onChange(modelFields);
            values = result?.interests ?? values;
          }
          setInterests(values);
          setCurrentInterestsValue("");
        }}
        currentFieldValue={currentInterestsValue}
        label={"Interests"}
        items={interests}
        hasError={errors?.interests?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("interests", currentInterestsValue)
        }
        errorMessage={errors?.interests?.errorMessage}
        setFieldValue={setCurrentInterestsValue}
        inputFieldRef={interestsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Interests"
          isRequired={false}
          isReadOnly={false}
          value={currentInterestsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.interests?.hasError) {
              runValidationTasks("interests", value);
            }
            setCurrentInterestsValue(value);
          }}
          onBlur={() => runValidationTasks("interests", currentInterestsValue)}
          errorMessage={errors.interests?.errorMessage}
          hasError={errors.interests?.hasError}
          ref={interestsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "interests")}
        ></TextField>
      </ArrayField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              city,
              mobile,
              email,
              visitDate,
              guestOf,
              ageGroup,
              gender,
              maritalStatus,
              occupation,
              decision,
              comments,
              joinFellowship,
              fellowshipDetails,
              interests,
              status: value,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="New"
          value="NEW"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="In school"
          value="IN_SCHOOL"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="In department"
          value="IN_DEPARTMENT"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Established"
          value="ESTABLISHED"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
        <option
          children="Archived"
          value="ARCHIVED"
          {...getOverrideProps(overrides, "statusoption4")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || memberModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || memberModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
