import * as types from '../constants/ActionTypes';

const Actions = {
  saveQuestions(data) {
    return {
      'type': types.SAVE_QUESTIONS,
      data
    };
  },

  assignQuestion(students, questions) {
    return {
      'type': types.ASSIGN_QUESTIONS,
      students,
      questions
    };
  }
};

export default Actions;
