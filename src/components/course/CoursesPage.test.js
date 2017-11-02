import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {CoursesPage} from './CoursesPage';

describe('Courses Page', () => {
  it.skip('Remove element from list on delete', (done) => {
    const expectedCourses = [
      {id: 'b', title: 'DEF'},
      {id: 'c', title: 'HIJ'}
    ];
    const props = {
      courses: [
        {id: 'a', title: 'ABC'},
        {id: 'b', title: 'DEF'},
        {id: 'c', title: 'HIJ'}
      ],
      actions: {
        deleteCourse: () => {
          return Promise.resolve();
        }
      },
      history: {}
    };
    //We have to Wrap the element in a memory router so that Enzyme doesn't complain about the Link component later;
    //TODO: Create test to check that after delete only 2 elements are shown;
    const wrapper = mount(<MemoryRouter><CoursesPage {...props} /></MemoryRouter>);
    const deleteLink = wrapper.find('a').first();
    deleteLink.simulate('click');
    expect(wrapper.find('CoursesPage').props().courses).toBe(expectedCourses);
    done();
  });

});
