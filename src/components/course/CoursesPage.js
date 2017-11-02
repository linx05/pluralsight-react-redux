import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
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
    this.changeCourseOrder = this.changeCourseOrder.bind(this);
    this.state = {
      order: 'title',
      sort: 'desc'
    };
  }

  redirectToAddCoursePage() {
    this.props.history.push('/course');
  }

  changeCourseOrder(field) {
    this.setState((prevState) => ({
      order: field,
      sort: prevState.order === field ? (prevState.sort === 'desc' ? 'asc' : 'desc') : 'desc'
    }));
  }

  deleteCourse(id) {
    this.props.actions.deleteCourse(id)
      .then(res => {
        toastr.error('Course Deleted!');
      });
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <input type="submit"
                   value="Add Course"
                   className="btn btn-primary"
                   onClick={this.redirectToAddCoursePage}/>
          </div>
          <div className="col-sm-12 col-md-6">
            {this.props.courses.length > 0 &&
            <h2 className="text-right">Registered Courses: {this.props.courses.length}</h2>}
          </div>
        </div>

        {this.props.courses.length > 0 ?
          <CourseList courses={sortByField(this.props.courses, this.state.order, this.state.sort)}
                      deleteCourse={this.deleteCourse} changeOrder={this.changeCourseOrder}/>
          : (!this.props.busy && <div>
            <h1 className="center-block">You seem to not have any courses, create one!</h1>
          </div>)
        }
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  busy: PropTypes.bool
};

function sortByField(list, field, sort = 'desc') {
  return list.sort((a, b) => {
    const nameA = a[field].toUpperCase(); // ignore upper and lowercase
    const nameB = b[field].toUpperCase(); // ignore upper and lowercase
    let valToReturn = 0;
    if (nameA < nameB) {
      valToReturn = -1;
    }
    if (nameA > nameB) {
      valToReturn = 1;
    }
    if (sort === 'asc') {
      valToReturn = valToReturn * -1;
    }

    return valToReturn;
  });
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses,
    busy: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesPage));
