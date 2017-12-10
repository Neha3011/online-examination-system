import React from 'react';
import { Nav, NavItem, FormGroup, ControlLabel, Radio } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Mcq from './QuestionType';
import examActions from '../../actions/exam';
import AssignQuestion from './AssignQuestion';

class Author extends React.Component {
  state = {
    'questionType': '',
    'actionType': ''
  };

  onSelectQuestionType = (key, type) => {
    this.setState({
      [key]: type
    });
  };

  renderSidebar = () => {
    return (
      <div className="author__sidebar">
        <Nav bsStyle="pills" stacked={true} activeKey="1">
          <NavItem
            onClick={this.onSelectQuestionType.bind(this, 'actionType', 'assign')}
          >
            Assign Question
          </NavItem>
          <NavItem
            onClick={this.onSelectQuestionType.bind(this, 'actionType', 'prepare')}
          >
            Questionnaire
          </NavItem>
        </Nav>
      </div>
    );
  };

  renderQuestionOption = () => {
    return (
      <FormGroup>
        <ControlLabel>What type of question you want to create?</ControlLabel>
        <Radio
            name="questionType"
            checked={this.state.questionType === 'mcq'}
            onChange={this.onSelectQuestionType.bind(this, 'questionType', 'mcq')}
        >
          Multiple type choice question
        </Radio>
        <Radio
            name="questionType"
            checked={this.state.questionType === 'submission'}
            onChange={this.onSelectQuestionType.bind(this, 'questionType', 'submission')}
        >
          Submission type choice question
        </Radio>
        <Radio
            name="questionType"
            checked={this.state.questionType === 'passage'}
            onChange={this.onSelectQuestionType.bind(this, 'questionType', 'passage')}
        >
          Passage type choice question
        </Radio>
      </FormGroup>
    );
  };

  render() {
    return (
      <div className="author">
        {this.renderSidebar()}
        <div className="author__container col-md-8">
          {(() => {
            if (this.state.actionType === 'prepare') {
              return (
                <div>
                  {this.renderQuestionOption()}
                  {(() => {
                    if (this.state.questionType) {
                      return (
                          <Mcq
                            questionType={this.state.questionType}
                            actions={this.props.actions}
                          />
                      );
                    }
                  })()}
                </div>
              );
            }
            return (
              <AssignQuestion
                actions={this.props.actions}
                exam={this.props.exam}
              />
            );
          })()}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Author);
