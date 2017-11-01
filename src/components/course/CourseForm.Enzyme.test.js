import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseForm from './CourseForm';

function setup(loading) {
  const props = {
    allAuthors: [],
    course: {},
    loading: loading,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
}

describe("CourseForm Testing Through Enzyme",function () {
  it("renders form", function () {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('save button is labeled "Save" when not loading', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('Save button is labeled "Saving" when loading', function () {
    const wrapper = setup(true);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
