import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Row, Col, Radio } from 'react-bootstrap';
import _ from 'lodash';

class QuestionType extends React.Component {
  constructor(props) {
    super(props);
    this._initialState = {
      'questions': {
        'id': Math.floor(Math.random() * 100000) + 1  ,
        'title': '',
        'description': '',
        'passageAnswer': '',
        'instructions': '',
        'answers': [{
          'option': '',
          'isAnswer': false
        }, {
          'option': '',
          'isAnswer': false
        }, {
          'option': '',
          'isAnswer': false
        }, {
          'option': '',
          'isAnswer': false
        }]
      }
    };
    this.state = this._initialState;
  }

  componentWillMount() {
    this.setup(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questionType !== this.props.questionType) {
      this.setup(nextProps);
    }
  }

  setup = (props) => {
    const questions = _.clone(this.state.questions);
    questions.type = props.questionType;
    this.setState({
      questions
    });
  };

  onInputChange = (data, value) => {
    const { key, index, subkey } = data;
    const questions = _.clone(this.state.questions);
    if (key === 'answers') {
      if (subkey) {
        questions.answers[index].isAnswer = !questions.answers[index].isAnswer;
      } else {
        questions.answers[index].option = value.target.value;
      }
    } else {
      questions[key] = value.target.value;
    }
    this.setState({
      questions
    });
  };

  resetQuestion = () => {
    this.setState(this._initialState);
  };

  submitQuestion = () => {
    this.props.actions.saveQuestions(this.state.questions);
    this.setState(this._initialState);
  };

  render() {
    return (
        <Form>
          <FormGroup>
            <ControlLabel>Question Title:</ControlLabel>
            <FormControl
                type="text"
                placeholder="Type your question title here..."
                value={this.state.questions.title}
                onChange={this.onInputChange.bind(this, { 'key': 'title' })}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Question Description:</ControlLabel>
            <FormControl
                type="text"
                placeholder="Type your question description here..."
                value={this.state.questions.description}
                onChange={this.onInputChange.bind(this, { 'key': 'description' })}
            />
          </FormGroup>

          {(() => {
            if (this.props.questionType === 'mcq') {
              return (
                  <FormGroup>
                    <Row>
                      <Col sm={10}>
                        <ControlLabel>Answer Options:</ControlLabel>
                      </Col>
                      <Col sm={2}>
                        <ControlLabel>Right Answer:</ControlLabel>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10}>
                        <FormControl
                            type="text"
                            placeholder="Type Option A here..."
                            value={this.state.questions.answers[0].option}
                            onChange={this.onInputChange.bind(this, { 'key': 'answers', 'index': 0 })}
                        />
                      </Col>
                      <Col sm={2}>
                        <Radio
                            name="answers"
                            checked={this.state.questions.answers[0].isAnswer}
                            onChange={this.onInputChange.bind(this, { 'key': 'answers', 'index': 0, 'subkey': 'isAnswer' })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10}>
                        <FormControl
                            type="text"
                            placeholder="Type Option B here..."
                            value={this.state.questions.answers[1].option}
                            onChange={this.onInputChange.bind(this, { 'key': 'answers', 'index': 1 })}
                        />
                      </Col>
                      <Col sm={2}>
                        <Radio
                            name="answers"
                            checked={this.state.questions.answers[1].isAnswer}
                            onChange={this.onInputChange.bind(this, { 'key': 'answers', 'index': 1, 'subkey': 'isAnswer' })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10}>
                        <FormControl
                            type="text"
                            placeholder="Type Option C here..."
                            value={this.state.questions.answers[2].option}
                            onChange={this.onInputChange.bind(this, { 'key': 'answers', 'index': 2 })}
                        />
                      </Col>
                      <Col sm={2}>
                        <Radio
                            name="answers"
                            checked={this.state.questions.answers[2].isAnswer}
                            onChange={this.onInputChange.bind(this, { 'key': 'answers', 'index': 2, 'subkey': 'isAnswer' })}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10}>
                        <FormControl
                            type="text"
                            placeholder="Type Option D here..."
                            value={this.state.questions.answers[3].option}
                            onChange={this.onInputChange.bind(this, {'key': 'answers', 'index': 3 })}
                        />
                      </Col>
                      <Col sm={2}>
                        <Radio
                            name="answers"
                            checked={this.state.questions.answers[3].isAnswer}
                            onChange={this.onInputChange.bind(this, { 'key': 'answers', 'index': 3, 'subkey': 'isAnswer' })}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
              );
            } else if (this.props.questionType === 'passage') {
              return (
                  <FormGroup>
                    <ControlLabel>Ideal Answer:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Type your answer here..."
                        value={this.state.questions.passageAnswer}
                        onChange={this.onInputChange.bind(this, { 'key': 'passageAnswer' })}
                    />
                  </FormGroup>
              )
            }
          })()}

          <FormGroup>
            <ControlLabel>Instructions:</ControlLabel>
            <FormControl
                type="text"
                placeholder="Type instructions here... (eg: file size, file format, etc.)"
                value={this.state.questions.instructions}
                onChange={this.onInputChange.bind(this, { 'key': 'instructions' })}
            />
          </FormGroup>

          <FormGroup>
            <Col sm={8} className="paddingNone">
              Click author to create a new question and will be added automatically to the question list.
            </Col>
            <Col sm={2} className="author__btn">
              <Button
                  onClick={this.resetQuestion}
              >
                Cancel
              </Button>
            </Col>
            <Col sm={2} className="author__btn">
              <Button
                  bsStyle="primary"
                  onClick={this.submitQuestion}
              >
                Author
              </Button>
            </Col>
          </FormGroup>
        </Form>
    );
  }
}

export default QuestionType;