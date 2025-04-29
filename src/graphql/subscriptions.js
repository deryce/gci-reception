/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateLeader = /* GraphQL */ `
  subscription OnCreateLeader($filter: ModelSubscriptionLeaderFilterInput) {
    onCreateLeader(filter: $filter) {
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
export const onUpdateLeader = /* GraphQL */ `
  subscription OnUpdateLeader($filter: ModelSubscriptionLeaderFilterInput) {
    onUpdateLeader(filter: $filter) {
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
export const onDeleteLeader = /* GraphQL */ `
  subscription OnDeleteLeader($filter: ModelSubscriptionLeaderFilterInput) {
    onDeleteLeader(filter: $filter) {
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
export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember($filter: ModelSubscriptionMemberFilterInput) {
    onCreateMember(filter: $filter) {
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
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember($filter: ModelSubscriptionMemberFilterInput) {
    onUpdateMember(filter: $filter) {
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
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember($filter: ModelSubscriptionMemberFilterInput) {
    onDeleteMember(filter: $filter) {
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
export const onCreateCellGroup = /* GraphQL */ `
  subscription OnCreateCellGroup(
    $filter: ModelSubscriptionCellGroupFilterInput
  ) {
    onCreateCellGroup(filter: $filter) {
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
export const onUpdateCellGroup = /* GraphQL */ `
  subscription OnUpdateCellGroup(
    $filter: ModelSubscriptionCellGroupFilterInput
  ) {
    onUpdateCellGroup(filter: $filter) {
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
export const onDeleteCellGroup = /* GraphQL */ `
  subscription OnDeleteCellGroup(
    $filter: ModelSubscriptionCellGroupFilterInput
  ) {
    onDeleteCellGroup(filter: $filter) {
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
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment(
    $filter: ModelSubscriptionDepartmentFilterInput
  ) {
    onCreateDepartment(filter: $filter) {
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
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment(
    $filter: ModelSubscriptionDepartmentFilterInput
  ) {
    onUpdateDepartment(filter: $filter) {
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
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment(
    $filter: ModelSubscriptionDepartmentFilterInput
  ) {
    onDeleteDepartment(filter: $filter) {
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
export const onCreateFollowUp = /* GraphQL */ `
  subscription OnCreateFollowUp($filter: ModelSubscriptionFollowUpFilterInput) {
    onCreateFollowUp(filter: $filter) {
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
export const onUpdateFollowUp = /* GraphQL */ `
  subscription OnUpdateFollowUp($filter: ModelSubscriptionFollowUpFilterInput) {
    onUpdateFollowUp(filter: $filter) {
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
export const onDeleteFollowUp = /* GraphQL */ `
  subscription OnDeleteFollowUp($filter: ModelSubscriptionFollowUpFilterInput) {
    onDeleteFollowUp(filter: $filter) {
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
