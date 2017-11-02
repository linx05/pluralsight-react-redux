import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const CourseListRow = ({course, onDelete}) => {
  return (
    <tr>
      <th><a href={course.watchHref} target="_blank">Watch</a></th>
      <th><a href="#" onClick={() => onDelete(course.id)}>Delete</a></th>
      <th><Link to={`/course/${course.id}`}>{course.title}</Link></th>
      <th>{course.authorId}</th>
      <th>{course.category}</th>
      <th>{course.length}</th>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseListRow;
