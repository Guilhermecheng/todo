import { gql } from '@apollo/client';

export const GET_TODOS = gql`
    query GetTasks {
      tasks(orderBy: createdAt_DESC) {
        createdAt
        id
        isTaskDone
        publishedAt
        taskDescription
        updatedAt
      }
    }
`;

export const CREATE_TODO = gql`
  mutation CreateTask($task: String!, $isTaskDone: Boolean!) {
    createTask(data: {
      taskDescription: $task, 
      isTaskDone: $isTaskDone
    }) {
      id
      stage
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(where: { id: $id }) {
      id
    }
  }
`;

export const MARK_TODO_STATE = gql`
  mutation UpdateTask($id:ID!, $isTaskDone: Boolean!) {
    updateTask(where: {
      id: $id
    },
    data: {
      isTaskDone: $isTaskDone
    }
    ) {
      id
      taskDescription
      isTaskDone
    } 
  }
`;
