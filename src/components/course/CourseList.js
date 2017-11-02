import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

const CourseList = ({courses, deleteCourse, changeOrder}) => {

  const clickOnHeader = (field) => {
    return () => changeOrder(field);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th className="clickable" onClick={clickOnHeader('title')}>Title</th>
          <th className="clickable" onClick={clickOnHeader('authorId')}>Author</th>
          <th className="clickable" onClick={clickOnHeader('category')}>Category</th>
          <th className="clickable" onClick={clickOnHeader('length')}>Length</th>
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
