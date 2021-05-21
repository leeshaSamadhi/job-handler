var express = require('express');
var app = express();
const db = require('../db.config');

exports.InsertJob = function (req, res) {
    const job = req.body;
    console.log(job);

    const query = db.query(
        "INSERT INTO jobs (title, full_part, skills, salary, description, job_status, no_of_openings, deadline) VALUES (?)",
        job,
        function (err, result) {
            if (err) throw err;

            res.send(result);
        }
    );
}


exports.GetJobs = function (req, res) {
    const query = db.query("SELECT * FROM jobs;", function (err, result) {
        if (err) throw err;

        res.send(result);
    });
};

exports.GetPendingJobs = function (req, res) {
    const query = db.query(
        `SELECT *
         FROM jobs
         WHERE job_status = "Pending";`,
        function (err, result) {
            if (err) throw err;

            res.send(result);
        });
}


exports.EditJob = function (req, res) {
    const job = req.body;

    const query = db.query(`Update jobs SET title='${job.title}', full_part='${job.full_part}', skills='${job.skills}', salary='${job.salary}', description='${job.description}', job_status='${job.job_status}', no_of_openings='${job.no_of_openings}', deadline='${job.deadline}' WHERE job_id='${job.job_id}'`,
        function (err, result) {
            if (err) throw err;

            res.send(result);
        });
}


exports.DeleteJob = function (req, res) {
    const query = db.query(
        `DELETE FROM jobs WHERE job_id="${req.body.job_id}";`,
        function (err, result) {
            if (err) throw err;

            res.send(result);
        }
    );
}
