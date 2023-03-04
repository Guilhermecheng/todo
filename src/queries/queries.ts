import { gql } from '@apollo/client';

export const GET_TODOS = gql`
    query GetTasks {
      tasks {
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

// export const MARK_TODO_AS_DONE = gql`
//   mutation MarkTaskAsDone {
//     updateTask(where: {
//       id: "clejhbcsh2flz0blvvnjj1dsy"
//     },
//     data: {
//       isTaskDone: true
//     }
//   }
// `;
