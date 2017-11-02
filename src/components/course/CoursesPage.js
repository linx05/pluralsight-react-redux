import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

export class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  redirectToAddCoursePage() {
    this.props.history.push('/course');
  }

  deleteCourse (id) {
    this.props.actions.deleteCourse(id)
      .then(res => {
        toastr.error('Course Deleted!');
      });
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>

        <CourseList courses={this.props.courses} deleteCourse={this.deleteCourse}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesPage));
