import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export interface TaskProps {
  id: string;
  task: string;
  isDone: boolean;
}
