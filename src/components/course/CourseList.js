import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

const CourseList = ({courses, deleteCourse, changeOrder}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th className="clickable" onClick={() => changeOrder('title')}>Title</th>
          <th className="clickable" onClick={() => changeOrder('authorId')}>Author</th>
          <th className="clickable" onClick={() => changeOrder('category')}>Category</th>
          <th className="clickable" onClick={() => changeOrder('length')}>Length</th>
        </tr>
      </thead>
      <tbody>
      {courses.map(course =>
        <CourseListRow key={course.id} course={course} onDelete={deleteCourse} />
      )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func,
  changeOrder: PropTypes.func
};

export default CourseList;
