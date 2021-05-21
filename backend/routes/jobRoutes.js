var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Router = require("router");
const router = Router();
var urlencodedParser = bodyParser.urlencoded({extended: true});
var JobsController = require("../controllers/jobControlller");


router.post("/jobs", urlencodedParser, (req, res) => JobsController.InsertJob(req, res));

router.get("/getjobs",urlencodedParser,(req,res)=>JobsController.GetJobs(req,res));

router.get("/getpendingjobs", urlencodedParser, (req, res) => JobsController.GetPendingJobs(req, res));

router.put("/editjobs",urlencodedParser,(req,res)=>JobsController.EditJob(req,res));

router.post("/deletejobs",urlencodedParser,(req,res)=>JobsController.DeleteJob(req,res));


module.exports = router;