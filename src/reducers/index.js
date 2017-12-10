import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = fromJS({
  'exam': {
    'questions': [{
      'id': 4,
      'title': 'title',
      'description': 'description'
    }, {
      'id': 3,
      'title': 'title',
      'description': 'description',
      'answers': [{
        'option': 'A',
        'isAnswer': false
      }, {
        'option': 'B',
        'isAnswer': false
      }, {
        'option': 'C',
        'isAnswer': false
      }, {
        'option': 'D',
        'isAnswer': false
      }]
    }, {
      'id': 2,
      'title': 'title',
      'description': 'description'
    }],
    'studentList': [{
      'id': 20,
      'name': 'Neha',
      'question': [3]
    }, {
      'id': 21,
      'name': 'Nidhi',
      'question': []
    }, {
      'id': 22,
      'name': 'Suraj',
      'question': []
    }]
  }
});

export default function(state = initialState, action) {
  let newData;
  switch (action.type) {
    case types.SAVE_QUESTIONS:
      const oldData = state.getIn(['exam', 'questions']).toJSON();
      newData = oldData.concat(action.data);
      return state.mergeIn(['exam', 'questions'], newData);

    case types.ASSIGN_QUESTIONS:
      newData = state.getIn(['exam', 'studentList']).map((studentList) => {
        const updatedData = action.students.map((studentId) => {
          if (studentList.get('id') === studentId) {
            return studentList.mergeIn(['question'], action.questions);
          }
          return studentList;
        });
        return updatedData[0];
      });
      return state.mergeIn(['exam', 'studentList'], newData);

    default:
      return state;
  }
}
