/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      role
      followUpsResponded {
        nextToken
        __typename
      }
      assignedMembers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      role
      followUpsResponded {
        nextToken
        __typename
      }
      assignedMembers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      role
      followUpsResponded {
        nextToken
        __typename
      }
      assignedMembers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLeader = /* GraphQL */ `
  mutation CreateLeader(
    $input: CreateLeaderInput!
    $condition: ModelLeaderConditionInput
  ) {
    createLeader(input: $input, condition: $condition) {
      id
      name
      phone
      email
      cellGroup {
        id
        name
        createdAt
        updatedAt
        cellGroupLeaderId
        __typename
      }
      department {
        id
        name
        createdAt
        updatedAt
        departmentLeaderId
        __typename
      }
      createdAt
      updatedAt
      leaderCellGroupId
      leaderDepartmentId
      __typename
    }
  }
`;
export const updateLeader = /* GraphQL */ `
  mutation UpdateLeader(
    $input: UpdateLeaderInput!
    $condition: ModelLeaderConditionInput
  ) {
    updateLeader(input: $input, condition: $condition) {
      id
      name
      phone
      email
      cellGroup {
        id
        name
        createdAt
        updatedAt
        cellGroupLeaderId
        __typename
      }
      department {
        id
        name
        createdAt
        updatedAt
        departmentLeaderId
        __typename
      }
      createdAt
      updatedAt
      leaderCellGroupId
      leaderDepartmentId
      __typename
    }
  }
`;
export const deleteLeader = /* GraphQL */ `
  mutation DeleteLeader(
    $input: DeleteLeaderInput!
    $condition: ModelLeaderConditionInput
  ) {
    deleteLeader(input: $input, condition: $condition) {
      id
      name
      phone
      email
      cellGroup {
        id
        name
        createdAt
        updatedAt
        cellGroupLeaderId
        __typename
      }
      department {
        id
        name
        createdAt
        updatedAt
        departmentLeaderId
        __typename
      }
      createdAt
      updatedAt
      leaderCellGroupId
      leaderDepartmentId
      __typename
    }
  }
`;
export const createMember = /* GraphQL */ `
  mutation CreateMember(
    $input: CreateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    createMember(input: $input, condition: $condition) {
      id
      name
      city
      mobile
      email
      visitDate
      guestOf
      ageGroup
      gender
      maritalStatus
      occupation
      decision
      comments
      joinFellowship
      fellowshipDetails
      interests
      cellGroup {
        id
        name
        createdAt
        updatedAt
        cellGroupLeaderId
        __typename
      }
      status
      department {
        id
        name
        createdAt
        updatedAt
        departmentLeaderId
        __typename
      }
      followUps {
        nextToken
        __typename
      }
      assignedTo {
        id
        name
        email
        phone
        role
        createdAt
        updatedAt
        __typename
      }
      assignedToId
      createdAt
      updatedAt
      cellGroupMembersId
      departmentMembersId
      __typename
    }
  }
`;
export const updateMember = /* GraphQL */ `
  mutation UpdateMember(
    $input: UpdateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    updateMember(input: $input, condition: $condition) {
      id
      name
      city
      mobile
      email
      visitDate
      guestOf
      ageGroup
      gender
      maritalStatus
      occupation
      decision
      comments
      joinFellowship
      fellowshipDetails
      interests
      cellGroup {
        id
        name
        createdAt
        updatedAt
        cellGroupLeaderId
        __typename
      }
      status
      department {
        id
        name
        createdAt
        updatedAt
        departmentLeaderId
        __typename
      }
      followUps {
        nextToken
        __typename
      }
      assignedTo {
        id
        name
        email
        phone
        role
        createdAt
        updatedAt
        __typename
      }
      assignedToId
      createdAt
      updatedAt
      cellGroupMembersId
      departmentMembersId
      __typename
    }
  }
`;
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember(
    $input: DeleteMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    deleteMember(input: $input, condition: $condition) {
      id
      name
      city
      mobile
      email
      visitDate
      guestOf
      ageGroup
      gender
      maritalStatus
      occupation
      decision
      comments
      joinFellowship
      fellowshipDetails
      interests
      cellGroup {
        id
        name
        createdAt
        updatedAt
        cellGroupLeaderId
        __typename
      }
      status
      department {
        id
        name
        createdAt
        updatedAt
        departmentLeaderId
        __typename
      }
      followUps {
        nextToken
        __typename
      }
      assignedTo {
        id
        name
        email
        phone
        role
        createdAt
        updatedAt
        __typename
      }
      assignedToId
      createdAt
      updatedAt
      cellGroupMembersId
      departmentMembersId
      __typename
    }
  }
`;
export const createCellGroup = /* GraphQL */ `
  mutation CreateCellGroup(
    $input: CreateCellGroupInput!
    $condition: ModelCellGroupConditionInput
  ) {
    createCellGroup(input: $input, condition: $condition) {
      id
      name
      leader {
        id
        name
        phone
        email
        createdAt
        updatedAt
        leaderCellGroupId
        leaderDepartmentId
        __typename
      }
      members {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      cellGroupLeaderId
      __typename
    }
  }
`;
export const updateCellGroup = /* GraphQL */ `
  mutation UpdateCellGroup(
    $input: UpdateCellGroupInput!
    $condition: ModelCellGroupConditionInput
  ) {
    updateCellGroup(input: $input, condition: $condition) {
      id
      name
      leader {
        id
        name
        phone
        email
        createdAt
        updatedAt
        leaderCellGroupId
        leaderDepartmentId
        __typename
      }
      members {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      cellGroupLeaderId
      __typename
    }
  }
`;
export const deleteCellGroup = /* GraphQL */ `
  mutation DeleteCellGroup(
    $input: DeleteCellGroupInput!
    $condition: ModelCellGroupConditionInput
  ) {
    deleteCellGroup(input: $input, condition: $condition) {
      id
      name
      leader {
        id
        name
        phone
        email
        createdAt
        updatedAt
        leaderCellGroupId
        leaderDepartmentId
        __typename
      }
      members {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      cellGroupLeaderId
      __typename
    }
  }
`;
export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
      id
      name
      leader {
        id
        name
        phone
        email
        createdAt
        updatedAt
        leaderCellGroupId
        leaderDepartmentId
        __typename
      }
      members {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      departmentLeaderId
      __typename
    }
  }
`;
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
      id
      name
      leader {
        id
        name
        phone
        email
        createdAt
        updatedAt
        leaderCellGroupId
        leaderDepartmentId
        __typename
      }
      members {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      departmentLeaderId
      __typename
    }
  }
`;
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
      id
      name
      leader {
        id
        name
        phone
        email
        createdAt
        updatedAt
        leaderCellGroupId
        leaderDepartmentId
        __typename
      }
      members {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      departmentLeaderId
      __typename
    }
  }
`;
export const createFollowUp = /* GraphQL */ `
  mutation CreateFollowUp(
    $input: CreateFollowUpInput!
    $condition: ModelFollowUpConditionInput
  ) {
    createFollowUp(input: $input, condition: $condition) {
      id
      date
      method
      summary
      member {
        id
        name
        city
        mobile
        email
        visitDate
        guestOf
        ageGroup
        gender
        maritalStatus
        occupation
        decision
        comments
        joinFellowship
        fellowshipDetails
        interests
        status
        assignedToId
        createdAt
        updatedAt
        cellGroupMembersId
        departmentMembersId
        __typename
      }
      memberId
      responder {
        id
        name
        email
        phone
        role
        createdAt
        updatedAt
        __typename
      }
      responderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFollowUp = /* GraphQL */ `
  mutation UpdateFollowUp(
    $input: UpdateFollowUpInput!
    $condition: ModelFollowUpConditionInput
  ) {
    updateFollowUp(input: $input, condition: $condition) {
      id
      date
      method
      summary
      member {
        id
        name
        city
        mobile
        email
        visitDate
        guestOf
        ageGroup
        gender
        maritalStatus
        occupation
        decision
        comments
        joinFellowship
        fellowshipDetails
        interests
        status
        assignedToId
        createdAt
        updatedAt
        cellGroupMembersId
        departmentMembersId
        __typename
      }
      memberId
      responder {
        id
        name
        email
        phone
        role
        createdAt
        updatedAt
        __typename
      }
      responderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFollowUp = /* GraphQL */ `
  mutation DeleteFollowUp(
    $input: DeleteFollowUpInput!
    $condition: ModelFollowUpConditionInput
  ) {
    deleteFollowUp(input: $input, condition: $condition) {
      id
      date
      method
      summary
      member {
        id
        name
        city
        mobile
        email
        visitDate
        guestOf
        ageGroup
        gender
        maritalStatus
        occupation
        decision
        comments
        joinFellowship
        fellowshipDetails
        interests
        status
        assignedToId
        createdAt
        updatedAt
        cellGroupMembersId
        departmentMembersId
        __typename
      }
      memberId
      responder {
        id
        name
        email
        phone
        role
        createdAt
        updatedAt
        __typename
      }
      responderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
