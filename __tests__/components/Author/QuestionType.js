import React from 'react';
import QuestionType from '../../../src/component/Author/QuestionType';
import renderer from 'react-test-renderer';

test('render QuestionType:', () => {
  const component = renderer.create(
      <QuestionType />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});