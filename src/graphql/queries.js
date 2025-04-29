/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        role
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLeader = /* GraphQL */ `
  query GetLeader($id: ID!) {
    getLeader(id: $id) {
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
export const listLeaders = /* GraphQL */ `
  query ListLeaders(
    $filter: ModelLeaderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeaders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
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
        items {
          id
          date
          method
          summary
          memberId
          responderId
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
          createdAt
          updatedAt
          __typename
        }
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
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCellGroup = /* GraphQL */ `
  query GetCellGroup($id: ID!) {
    getCellGroup(id: $id) {
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
export const listCellGroups = /* GraphQL */ `
  query ListCellGroups(
    $filter: ModelCellGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCellGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        cellGroupLeaderId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
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
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDepartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        departmentLeaderId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFollowUp = /* GraphQL */ `
  query GetFollowUp($id: ID!) {
    getFollowUp(id: $id) {
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
export const listFollowUps = /* GraphQL */ `
  query ListFollowUps(
    $filter: ModelFollowUpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowUps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        method
        summary
        memberId
        responderId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const membersByAssignedToId = /* GraphQL */ `
  query MembersByAssignedToId(
    $assignedToId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    membersByAssignedToId(
      assignedToId: $assignedToId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const followUpsByMemberId = /* GraphQL */ `
  query FollowUpsByMemberId(
    $memberId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFollowUpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followUpsByMemberId(
      memberId: $memberId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        method
        summary
        memberId
        responderId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const followUpsByResponderId = /* GraphQL */ `
  query FollowUpsByResponderId(
    $responderId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFollowUpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followUpsByResponderId(
      responderId: $responderId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        method
        summary
        memberId
        responderId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
