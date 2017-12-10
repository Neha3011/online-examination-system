import React from 'react';
import { Button, FormGroup, InputGroup, Row, Checkbox } from 'react-bootstrap';
import Popup from '../Popup';

class AssignQuestion extends React.Component {
  state = {
    'assigned': [],
    'students': [],
    'viewStudentPopup': false
  };

  selectQuestion = (questionId) => {
    this.setState({
      'assigned': this.state.assigned.concat(questionId)
    });
  };

  selectStudent = (studentId) => {
    this.setState({
      'students': this.state.students.concat(studentId)
    });
  };

  toggleViewStudents = () => {
    this.setState({
      'viewStudentPopup': !this.state.viewStudentPopup
    });
  };

  assignQuestion = () => {
    this.props.actions.assignQuestion(this.state.students, this.state.assigned);
    this.toggleViewStudents();
  };

  renderStudentDetails = () => {
    return (
        <Popup
            contentLabel="Allow Prescription Confirmation"
            popupType="students"
        >
          <div className="popup__header">
            Assign to these students?
          </div>
          <div className="popup__body">
            {
              this.props.exam.get('studentList').map((student) => {
                return (
                  <div key={student.get('id')}>
                    <Checkbox
                        onChange={this.selectStudent.bind(this, student.get('id'))}
                    />
                    <div>{student.get('name')}</div>
                  </div>
                )
              })
            }
          </div>
          <div className="popup__actions">
            <div
                className="popup__action btn-green btn-outline"
                onClick={this.toggleViewStudents}
            >
              CANCEL
            </div>
            <div
                className="popup__action btn-green"
                onClick={this.assignQuestion}
            >
              ALLOW
            </div>
          </div>
        </Popup>
    )
  };

  render() {
    return (
      <div className="assign">
        {(() => {
          if (this.state.viewStudentPopup) {
            return this.renderStudentDetails();
          }
        })()}
        <FormGroup>
          <InputGroup className="assign__header">
            <Row className="assign__header__selectAll">
              <div>
                Click author to create a new question and will be added automatically to the question list.
              </div>
              <div className="assign__header__btn">
                <Button
                  bsStyle="primary"
                  onClick={this.toggleViewStudents}
                >
                  Assign
                </Button>
              </div>
            </Row>
          </InputGroup>
        </FormGroup>
        {
          this.props.exam.get('questions').map((question, key) => {
            return (
                <div className="assign__question">
                  <Checkbox
                    onChange={this.selectQuestion.bind(this, question.get('id'))}
                  />
                  <div className="assign__question__container">
                    <div className="assign__question__addon">{`S. No ${key + 1}`}</div>
                    <div className="assign__question_list">
                      <div className="assign__question__title">
                        {question.get('title')}
                      </div>
                      <div className="assign__question__description">
                        {question.get('description')}
                      </div>
                    </div>
                    <div className="assign__question__addon">
                      <div className="assign__question__header">
                        Question Type:
                      </div>
                      <div>
                        {question.get('type')}
                      </div>
                    </div>
                  </div>
                </div>
            );
          })
        }
      </div>
    );
  }
}

export default AssignQuestion;