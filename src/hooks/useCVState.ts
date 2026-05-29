import { useReducer } from 'react';
import { CVData, WorkExperience } from '../types/cv';
import { DEFAULT_CV } from '../constants/defaultCV';

type CVAction =
  | { type: 'UPDATE_FIELD'; field: keyof CVData; value: any }
  | { type: 'UPDATE_WORK_EXPERIENCE'; index: number; field: keyof WorkExperience; value: any }
  | { type: 'UPDATE_WORK_TASK'; expIndex: number; taskIndex: number; value: string }
  | { type: 'ADD_WORK_TASK'; expIndex: number }
  | { type: 'ADD_WORK_EXPERIENCE' }
  | { type: 'REMOVE_WORK_EXPERIENCE'; index: number }
  | { type: 'SET_CV_DATA'; data: CVData };

const EMPTY_WORK: WorkExperience = {
  jobTitle: '',
  companyLocation: '',
  dateRange: '',
  mainTasks: [''],
};

function cvReducer(state: CVData, action: CVAction): CVData {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'UPDATE_WORK_EXPERIENCE': {
      const we = [...state.workExperience];
      if (we[action.index]) we[action.index] = { ...we[action.index], [action.field]: action.value };
      return { ...state, workExperience: we };
    }
    case 'UPDATE_WORK_TASK': {
      const we = [...state.workExperience];
      if (we[action.expIndex]) {
        const tasks = [...we[action.expIndex].mainTasks];
        tasks[action.taskIndex] = action.value;
        we[action.expIndex] = { ...we[action.expIndex], mainTasks: tasks };
      }
      return { ...state, workExperience: we };
    }
    case 'ADD_WORK_TASK': {
      const we = [...state.workExperience];
      if (we[action.expIndex]) {
        we[action.expIndex] = {
          ...we[action.expIndex],
          mainTasks: [...we[action.expIndex].mainTasks, ''],
        };
      }
      return { ...state, workExperience: we };
    }
    case 'ADD_WORK_EXPERIENCE':
      return { ...state, workExperience: [...state.workExperience, { ...EMPTY_WORK }] };
    case 'REMOVE_WORK_EXPERIENCE':
      return { ...state, workExperience: state.workExperience.filter((_, i) => i !== action.index) };
    case 'SET_CV_DATA':
      return action.data;
  }
}

export function useCVState() {
  const [cvData, dispatch] = useReducer(cvReducer, DEFAULT_CV);
  return { cvData, dispatch };
}
