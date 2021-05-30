import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import moment from "moment";
import Button from "@material-ui/core/Button";
import DatePicker from "react-datepicker";
import { Alert, Form, Modal } from "react-bootstrap";
import JobSearch from "./JobSearch";
import $ from "jquery";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  container: {
    maxHeight: 440,
  },
  root: {
    width: "100%",
  },
  pagination: {
    position: "relative",
    zIndex: "999",
    marginBottom: "10%",
  },
});

const JobTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState({
    deadline: new Date(),
  });
  const [displayJobs, setDisplayJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    setDisplayJobs(jobs);
  }, [jobs]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOnChange = (e) => {
    setSelected({
      ...selected,
      [e.target.name]: e.target.value,
    });
    $("#skills,#salary,#description,#no_of_openings,#title,#full_part").on(
      "input propertychange paste",
      function () {
        if (
          $("#skills").val().length > 0 &&
          $("#salary").val().length > 0 &&
          $("#description").val().length > 0 &&
          $("#no_of_openings").val().length > 0 &&
          $("#full_part:checked").val()
        ) {
          $("#job_status_accepted").prop("disabled", false);
        } else {
          $("#job_status_accepted").prop("disabled", true);
          $("#job_status_accepted").prop("checked", false);
        }
      }
    );
  };
  const handleOnChangeDate = (date) => {
    setSelected({
      ...selected,
      deadline: new Date(date).toISOString().substring(0, 10),
    });
  };

  const getJobs = () => {
    axios({
      method: "GET",
      url: "http://localhost:3001/jobs/getjobs",
    })
      .then((response) => {
        response.data.length ? setJobs(response.data) : setJobs([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteJob = (index) => {
    axios({
      method: "POST",
      url: "http://localhost:3001/jobs/deletejobs",
      data: {
        job_id: index,
      },
    })
      .then((response) => {
        console.log(response);
        getJobs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      ...selected,
      deadline: new Date(selected.deadline).toISOString().substring(0, 10),
    };
    axios({
      method: "PUT",
      url: "http://localhost:3001/jobs/editjobs",
      data: job,
    })
      .then((response) => {
        setShow(false);
        getJobs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <JobSearch jobs={jobs} setDisplayJobs={setDisplayJobs} />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table className={classes.table} aria-label="job table">
            <TableHead>
              <TableRow>
                <TableCell style={{ verticalAlign: "middle" }}>
                  Job Title
                </TableCell>
                <TableCell style={{ verticalAlign: "middle" }}>
                  Job types
                </TableCell>
                <TableCell style={{ verticalAlign: "middle" }}>
                  Skills
                </TableCell>
                <TableCell style={{ verticalAlign: "middle" }}>
                  Job Status
                </TableCell>
                <TableCell style={{ verticalAlign: "middle" }}>
                  Salary
                </TableCell>
                <TableCell style={{ verticalAlign: "middle" }}>
                  DeadLine
                </TableCell>
                <TableCell style={{ verticalAlign: "middle" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayJobs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((job) => {
                  return (
                    <TableRow key={job._id}>
                      <TableCell component="th" scope="row">
                        {job.title}
                      </TableCell>
                      <TableCell align="left">{job.full_part}</TableCell>
                      <TableCell align="left">{job.skills}</TableCell>
                      <TableCell align="left">{job.job_status}</TableCell>
                      <TableCell align="left">{job.salary}</TableCell>
                      <TableCell align="left">
                        {moment(job.deadline).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="danger"
                          className="m-0"
                          onClick={() => {
                            setSelected(job);
                            setShow(true);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="danger"
                          className="m-0"
                          onClick={() => deleteJob(job.job_id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={displayJobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title>Heads Up! You are updating the job!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                className="form-control"
                id="title"
                useref="jobtitle"
                value={selected.title}
                name="title"
                required="true"
                onChange={handleOnChange}
              />
            </div>
            <label>Job Type</label>
            <div className="form-group">
              <input
                type="radio"
                name="full_part"
                id="full_part"
                value="Full Time"
                onChange={handleOnChange}
                required="true"
                checked={selected.full_part === "Full Time"}
              />
              <label htmlFor="jobType">Full Time</label>
              <br />
              <input
                type="radio"
                name="full_part"
                id="full_part"
                value="Part Time"
                onChange={handleOnChange}
                required="true"
                checked={selected.full_part === "Part Time"}
              />
              <label htmlFor="jobType">Part Time</label>
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills required</label>
              <textarea
                className="form-control"
                id="skills"
                useref="skills"
                value={selected.skills}
                name="skills"
                required="true"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                className="form-control"
                id="salary"
                placeholder="enter salary amount"
                value={selected.salary}
                name="salary"
                required="true"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobdesc">Job Description</label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Job Description"
                value={selected.description}
                name="description"
                required="true"
                onChange={handleOnChange}
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
                name="no_of_openings"
                value={selected.no_of_openings}
                required="true"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline for the applicants : </label>
              <DatePicker
                selected={new Date(selected.deadline)}
                minDate={new Date(selected.deadline)}
                id="deadline"
                name="deadline"
                onChange={(date) => handleOnChangeDate(date)}
                required="true"
              />
            </div>
            <label>Job Status</label>
            <div className="form-group">
              <input
                type="radio"
                name="job_status"
                id="job_status"
                value="Pending"
                checked={selected.job_status === "Pending"}
                onChange={handleOnChange}
              />
              <label htmlFor="jobtype">Pending</label>
              <br />
              <input
                type="radio"
                name="job_status"
                id="job_status"
                value="Accepted"
                checked={selected.job_status === "Accepted"}
                onChange={handleOnChange}
              />
              <label htmlFor="jobtype">Accepted</label>
            </div>
            <div className="form-group">
              <button className="btn btn-success" type="submit">
                Update
              </button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobTable;
