import axios from "axios";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppNavBar from "./AppNavBar";
import JobTable from "./JobTable";
import CreateJobFooter from "./CreateJobFooter";
import { Link } from "react-router-dom";




class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      rerender: true,
      startDate: new Date(),
      salary: "",
    
    };
    this.onChange = this.props.onChange;

    
  }
  setStartDate(date) {
    this.setState({
      startDate: date,
    });
  }

  handleSubmit(e) {
    this.setState({ ...this.state, rerender: false });
    e.preventDefault();
    const job = [
      [
        e.target.title.value,
        e.target.full_part.value,
        e.target.skills.value,
        e.target.salary.value,
        e.target.description.value,
        e.target.job_status.value,
        e.target.no_of_openings.value,
        new Date(this.state.startDate).toISOString().substring(0, 10),
      ],
    ];
    console.log(
      new Date(e.target.deadline.value).toISOString().substring(0, 10)
    );
    axios({
      method: "POST",
      url: "http://localhost:3001/jobs",
      data: job,
    })
      .then((response) => {
        this.setState({ ...this.state, rerender: true });
        console.log(job);
      })
      .catch((err) => {
        this.setState({ ...this.state, rerender: true });
        console.log(err);
      });

  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }


 


  render() {
    const handleSubmit = this.handleSubmit.bind(this);
  

    return (
      <div>
        <AppNavBar />
        <div className="button-container">
          <Button variant="danger" onClick={() => this.handleModalShowHide()}>
            Create New Job
          </Button>
          <Link to={"/pendingJobs"}>
            <Button variant="success">View Pending Jobs</Button>
          </Link>
        </div>

        <br />
        {this.state.rerender && <JobTable />}

        <Modal show={this.state.showHide}>
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Head to create a new job!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input
                  className="form-control"
                  id="title"
                  useref="title"
                  name="jobTitle"
                  autoComplete="title"
                />
              </div>
              <label>Job Type</label>
              <div className="form-group">
                <input
                  type="radio"
                  name="time"
                  id="full_part"
                  value="Full Time"
                />
                <label htmlFor="full_part">Full Time</label>
                <br />
                <input
                  type="radio"
                  name="time"
                  id="full_part"
                  value="Part Time"
                />
                <label htmlFor="full_part">Part Time</label>
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills required</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="skills"
                  useref="skills"
                  required=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  placeholder="enter salary amount"
                  min="40000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Job Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Job Description"
                  required=""
                />
              </div>

              <label>Job Status</label>
              <div className="form-group">
                <input
                  type="radio"
                  name="job_status"
                  id="job_status"
                  value="Pending"
                />
                <label htmlFor="job_type">Pending</label>
                <br />
                <input
                  type="radio"
                  name="job_status"
                  id="job_status"
                  value="Accepted"
                />
                <label htmlFor="job_type">Accepted</label>
              </div>

              <br />
              <div className="form-group">
                <label htmlFor="no_of_openings">Number of Openings</label>
                <input
                  type="number"
                  className="form-control"
                  id="no_of_openings"
                  useref="no_of_openings"
                  min="1"
                  required=""
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline for the applicants : </label>
                <DatePicker
                  className="datepicker"
                  selected={this.state.startDate}
                  onChange={(date) => this.setStartDate(date)}
                  id="deadline"
                  minDate={this.state.startDate}
                  placeholderText="Click to select a date"
                />
                <p>
                  Please enter a date
                  <span
                    style={{ backgroundColor: "yellow", fontWeight: "bold" }}
                  >
                    after 20 days of the current date
                  </span>
                </p>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={() => this.handleModalShowHide()}
                  
                  
                >
                  Create
                </button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleModalShowHide()}
             
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <CreateJobFooter />
      </div>
    );
  }
}

export default CreateJob;
