import React from 'react';
import Popup from '../Popup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import examActions from '../../actions/exam';

class Student extends React.Component {
  state = {
    'showQuestionPopup': false
  };

  showQuestion = (selectedQuestion) => {
    this.setState({
      'showQuestionPopup': true,
      selectedQuestion
    });
  };

  hideQuestion = () => {
    this.setState({
      'showQuestionPopup': false
    });
  };

  renderQuestion = () => {
    return (
        <Popup
            contentLabel="Allow Prescription Confirmation"
            popupType="students"
        >
          <div className="popup__body">
            {
              this.state.selectedQuestion.map((questionId) => {
                return this.props.exam.get('questions').map((question) => {
                  if (questionId === question.get('id')) {
                    return (
                        <div key={questionId} className="questions">
                          {(() => {
                            if (question.get('title')) {
                              return (
                                  <div><b>Question:</b> {question.get('title')}</div>
                              );
                            }
                          })()}
                          {(() => {
                            if (question.get('description')) {
                              return (
                                  <div><b>Description:</b> {question.get('description')}</div>
                              );
                            }
                          })()}
                          {(() => {
                            if (question.get('answers').size) {
                              return (
                                <div className="questions__options">
                                 <b>Options:</b>
                                  {
                                    question.get('answers').map((answer) => {
                                      return (
                                          <div>{answer.get('option')}</div>
                                      );
                                    })
                                  }
                                </div>
                              )
                            }
                          })()}
                        </div>
                    )
                  }
                })
              })
            }
          </div>
          <div className="popup__actions">
            <div
                className="popup__action btn-green btn-outline"
                onClick={this.hideQuestion}
            >
              CLOSE
            </div>
          </div>
        </Popup>
    );
  };

  render() {
    return (
        <div className="assign col-sm-8 col-sm-offset-2">
          {(() => {
            if (this.state.showQuestionPopup) {
              return this.renderQuestion();
            }
          })()}
          {
            this.props.exam.get('studentList').map((student, key) => {
              if (student.get('id') === 20) {
                return (
                    <div className="assign__question">
                      <div className="assign__question__container">
                        <div className="assign__question__addon">{`S. No ${key + 1}`}</div>
                        <div className="assign__question_list">
                          <div className="assign__question__title">
                            <a onClick={this.showQuestion.bind(this, student.get('question'))}> Click to view question </a>
                          </div>
                        </div>
                      </div>
                    </div>
                );
              }
            })
          }
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    'exam': state.get('exam')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': bindActionCreators(examActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
