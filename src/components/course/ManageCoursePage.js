import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorFormattedForDropdown} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false,
      redirect: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors});
    return formIsValid;
  }

  redirectToList() {
    this.setState({saving: false, redirect: true});
    toastr.success('Course Saved!');
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(res => this.redirectToList())
      .catch(err => {
        this.setState({saving: false});
        toastr.error(err);
      });
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({
      course: course
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/courses"/>;
    }
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          course={this.state.course}
          errors={this.state.errors}
          loading={this.state.saving}
          allAuthors={this.props.authors}
          onSave={this.saveCourse}
          onChange={this.updateCourseState}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id;

  let course = (courseId && state.courses.length > 0) ? state.courses.find(course => course.id === courseId) : {id: ''};

  return {
    course: course,
    authors: authorFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

