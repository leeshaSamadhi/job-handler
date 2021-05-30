import axios from "axios";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppNavBar from "./AppNavBar";
import JobTable from "./JobTable";
import CreateJobFooter from "./CreateJobFooter";
import { Link } from "react-router-dom";
import $ from 'jquery';



class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      rerender: true,
      startDate: this.getMinDate(),
      salary: "",

    };
    this.onChange = this.props.onChange;


  }

  handleInput(){
    $('#skills,#salary,#description,#no_of_openings,#title,#full_part').on('input propertychange paste', function () {
    if ($('#skills').val().length>0 && $('#salary').val().length>0 && $('#description').val().length>0 && $('#no_of_openings').val().length>0  && ($('#full_part:checked').val())) {
        $('#job_status_accepted').prop('disabled', false);
    } else {
        $('#job_status_accepted').prop('disabled', true);
        $('#job_status_accepted').prop('checked', false);
    }
});
  }
  setStartDate(date) {
    this.setState({
      startDate: date,
    });
  }

  handleSubmit(e) {
    this.setState({ ...this.state, rerender: false });
    e.preventDefault();
    let job_status;
    if(!e.target.job_status_accepted.checked){
      job_status = 'Pending'
    }else{
      job_status = "Accepted"
    }
    const job = [
      [
        e.target.title.value,
        e.target.full_part.value,
        e.target.skills.value,
        e.target.salary.value,
        e.target.description.value,
        job_status,
        e.target.no_of_openings.value,
        new Date(this.state.startDate).toISOString().substring(0, 10),
      ],
    ];
    axios({
      method: "POST",
      url: "http://localhost:3001/jobs",
      data: job,
    })
      .then((response) => {
        this.setState({ ...this.state, rerender: true });
        this.handleModalShowHide();
      })
      .catch((err) => {
        this.setState({ ...this.state, rerender: true });
        console.log(err);
        alert("something wrong!")
      });

  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  getMinDate(){
    let today= new Date();
    let mindate = new Date();
    mindate.setDate(today.getDate() + 20);
    return mindate
  }



  render() {
    const handleSubmit = this.handleSubmit.bind(this);
    const handleInput = this.handleInput.bind(this);


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

        <Modal scrollable show={this.state.showHide}>
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
                  required="true"
                  onChange={this.handleInput}
                />
              </div>
              <label>Job Type</label>
              <div className="form-group">
                <input
                  type="radio"
                  name="time"
                  id="full_part"
                  required="true"
                  value="Full Time"
                  onChange={this.handleInput}
                />
                <label htmlFor="full_part">Full Time</label>
                <br />
                <input
                  type="radio"
                  name="time"
                  id="full_part"
                  value="Part Time"
                  onChange={this.handleInput}
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
                  required="true"
                  onChange={this.handleInput}
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
                  required="true"
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Job Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Job Description"
                  required="true"
                  onChange={this.handleInput}
                />
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
                  required="true"
                  onChange={this.handleInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline for the applicants : </label>
                <DatePicker
                  className="datepicker"
                  selected={this.state.startDate}
                  onChange={(date) => this.setStartDate(date)}
                  id="deadline"
                  minDate={this.getMinDate()}
                  required="true"
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
              <label>Job Status</label>
              <div className="form-group">
                <input
                  type="radio"
                  name="job_status"
                  id="job_status_pending"
                  value="Pending"
                  onChange={this.handleInput}
                />
                <label htmlFor="job_type">Pending</label>
                <br />
                <input
                  type="radio"
                  name="job_status"
                  id="job_status_accepted"
                  value="Accepted"
                  disabled="true"
                  onChange={this.handleInput}
                />
                <label htmlFor="job_type">Accepted</label>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-success"
                  type="submit"
                 


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
