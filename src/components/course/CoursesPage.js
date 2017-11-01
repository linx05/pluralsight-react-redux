import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.state = {
      course: {title: ''}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.courseRow = this.courseRow.bind(this);
  }

  onTitleChange (event) {
    const course = this.state.course;

    this.setState(Object.assign({}, course, {
      course: {title: event.target.value}
    }));
  }

  onClickSave () {
    this.props.actions.createCourse(this.state.course);
  }

  courseRow (course, index) {
    return <div key={index} className="course">{course.title}</div>;
  }

  render () {
    return (
      <div>
        <h1>Courses</h1>
        <Link to="/course" className="btn btn-primary">Add Course</Link>
        <CourseList courses={this.props.courses} />
        {/*<input type="text"*/}
               {/*onChange={this.onTitleChange}*/}
               {/*value={this.state.course.title}*/}
        {/*/>*/}
        {/*<input type="button" value="Save"*/}
               {/*onClick={this.onClickSave}*/}
        {/*/>*/}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

const mapStateToProps =  (state, ownProps) => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
