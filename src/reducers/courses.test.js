import expect from 'expect';
import * as actions from '../actions/courseActions';
import courseReducer from './courses';

describe('Course Reducer', () => {
  it('Should add a course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [
      {title: 'ABC'},
      {title: 'DEF'}
    ];
    const newCourse = {title: 'ZYX'};
    const action = actions.createCourseSuccess(newCourse);

    //act
    const newState = courseReducer(initialState, action);

    //assert
    expect(newState.length).toBe(3);
    expect(newState[0].title).toEqual(initialState[0].title);
    expect(newState).toNotEqual(initialState);
  });

  it('Should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [
      {id: 'a', title: 'ABC'},
      {id: 'b', title: 'DEF'},
      {id: 'c', title: 'HIJ'}
    ];

    const updateCourse = {id: 'b', title: 'ZYX'};
    const action = actions.updateCourseSuccess(updateCourse);
    //act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.filter(x => x.id === updateCourse.id)[0];
    //assert
    expect(newState.length).toEqual(3);
    expect(updatedCourse.title).toEqual(updateCourse.title);

  });
});

