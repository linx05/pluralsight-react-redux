import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as CourseActions from '../actions/courseActions';

describe('Store Integration', () => {
  it('Should handle creating courses', () => {
    //arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      id: '1',
      title: 'ABC'
    };

    //action
    const action = CourseActions.createCourseSuccess(course);
    store.dispatch(action);

    //assert
    const actual = store.getState().courses.filter(x => x.id === course.id)[0];

    expect(actual).toEqual(course);
  });

  it('Should handle updating a newly created course', () => {
    const store = createStore(rootReducer, initialState);
    const courseCreate = [
      {
        id: '1',
        title: 'ABC'
      },
      {
        id: '2',
        title: 'EFG'
      }
    ];

    const updatedCourse = {
      id: '2',
      title: 'XYZ'
    };

    //action create course
    courseCreate.map(course => {
      const actionCreate = CourseActions.createCourseSuccess(course);
      store.dispatch(actionCreate);
    });
    const resultCreate = store.getState().courses;

    //assert course create
    expect(resultCreate.length).toEqual(2);
    expect(resultCreate).toEqual(courseCreate);
    //action update course
    const actionUpdate = CourseActions.updateCourseSuccess(updatedCourse);
    store.dispatch(actionUpdate);

    const resultUpdate = store.getState().courses;
    const updatedResult = resultUpdate.find(course => course.id === updatedCourse.id);
    //assert course update
    expect(resultUpdate.length).toEqual(2);
    expect(updatedResult).toBeTruthy();
    expect(updatedResult.title).toEqual(updatedCourse.title);
  });

  it('Should handle deleting a course', () => {
    const initialCourses = [
      {id: 'a', title: 'ABC'},
      {id: 'b', title: 'DEF'},
      {id: 'c', title: 'HIJ'}
    ];
    const store = createStore(rootReducer, Object.assign({}, initialState,{courses: initialCourses}));

    //action
    const action = CourseActions.deleteCourseSuccess(initialCourses[0].id);
    store.dispatch(action);

    //assert
    const actual = store.getState().courses;
    expect(actual.length).toEqual(2);
  });
});
