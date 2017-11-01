import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import fetch from 'node-fetch';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      const course = {id: 'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      //act
      const action = courseActions.createCourseSuccess(course);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Course Action Async', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('Should should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
    const apiCourses = [
      {id: 1, firstName: 'Cory', lastName: 'House'},
      {id: 2, firstName: 'John', lastName: 'Papa'}
    ];
    //Example call to nock
    nock('http://127.0.0.1')
      .get('/courses')
      .reply(404, {courses: apiCourses});

    fetch('http://127.0.0.1/courses')
      .then(res => res.json())
      .then(body => {
        const courses = body.courses;

        //assert payload
        expect(courses.length).toEqual(2);
        expect(courses).toEqual(apiCourses);

        const expectedActions = [
          {type: types.BEGIN_AJAX_CALL},
          {type: types.LOAD_COURSES_SUCCESS, courses}
        ];

        const store = mockStore({courses: []}, expectedActions);
        return store.dispatch(courseActions.loadCourses())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
          expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
          done();
        });
      });
  });
});
