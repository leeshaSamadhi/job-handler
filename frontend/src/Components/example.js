import React, { useEffect, useState } from 'react'
import ExamForm from "../../components/Forms/ExamForm";
import { FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Toolbar, } from '@material-ui/core';
import Controls from "../../components/Controls/Controls";
import Popup from "../../components/Popup/Popup";

import Examcard from "../../components/Card/Examcard"
import Grid from '@material-ui/core/Grid';
import { InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import SearchRounded from '@material-ui/icons/SearchRounded';
import axios from "axios";
import Swal from "sweetalert2";
import CloseIcon from '@material-ui/icons/Close';
const Exams = () => {


    const [openPopup, setOpenPopup] = useState(false)
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [examData, setExamData] = useState([]);
    const [filteredExams, setFileredExams] = useState([]);

    let handleChange2 = (event) => {

        setSearchCategory(event.target.value);
        console.log(searchCategory);

    };
    function readAllExams() {
        return Promise.resolve().then(opts => {
            return axios.get('http://localhost:5000/api/exam')
                .then(response => {
                    return (response.data);
                })
                .catch((err) => {
                    console.log('Unable access ...');
                });

        });
    }

    useEffect(() => {
        readAllExams().then(r => setExamData(r))
    }, []);

    useEffect(() => {

        setFileredExams(
            examData.filter((exaam) =>
                exaam.exam_name.toLowerCase().includes(searchName.toLowerCase())
                 && exaam.category.toLowerCase().includes(searchCategory && searchCategory.toLowerCase())
            )
        );
    }, [searchName, searchCategory, examData]);


    const handleDelete = (id) => {
        const originalExams = filteredExams;
        Swal.fire({
            title: "Are you sure you want to delete this exam?",
            text: "You won't be able to revert this change!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const exams = originalExams.filter((m) => m._id !== id);
                setFileredExams(exams);
                axios
                    .delete(`http://localhost:5000/api/exam/${id}`)
                    .then((res) => {
                        Swal.mixin({
                            toast: true,
                            icon: "success",
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 6000,
                        }).fire({
                            title: "Exam deleted successfully!",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        setFileredExams(originalExams);
                        console.log(err.response);
                        Swal.mixin({
                            toast: true,
                            icon: "error",
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 6000,
                        }).fire({
                            title: err.response.data.message,
                            type: "error",
                        });
                    });
            }
        });
    };








    return (
        <>
            <div style={{}}>
                <div style={{ float: 'right' }}>
                    <Toolbar>
                        <Button
                            onClick={() => { setOpenPopup(true); }}
                            variant="contained"
                            color="primary"
                        >                       Add
                        </Button>
                    </Toolbar>
                </div>
            </div>
            <Popup
                title="Add Exam"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ExamForm />
            </Popup>
            <div>

            </div>
            <Grid style={{ float: 'left' }} container justify="flex-start" spacing={3}>

                <TextField
                    label="Search Exam"
                    variant="outlined"
                    onChange={(e) => {
                        console.log("Pass");
                        setSearchName(e.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRounded />
                            </InputAdornment>
                        ),
                    }}
                    style={{ paddingBottom: "20px" }}
                />



                <FormControl variant="outlined">
                    <InputLabel>
                        Category
                    </InputLabel>
                    
                    <Select endAdornment={<IconButton onClick={()=> setSearchCategory("")}>
                       <CloseIcon />
                       </IconButton>} onChange={handleChange2}>
                             {examData && [...new Set(examData.map((op) => op.category))].map((option, index) => (
                                <MenuItem key={index} value={option} >
                                 {option}
                                </MenuItem>
                                 ))}
                     </Select>
                </FormControl>

                <Grid container justify="flex-start" spacing={3}></Grid>
                {filteredExams && (() => {
                    const exams = [];

                    filteredExams.map(r => {
                        exams.push(<Grid item xs={12} sm={6} md={4} lg={3}>
                            <Examcard examData={r} handleDelete={handleDelete} />
                        </Grid>);
                        return filteredExams;
                    })

                    return exams;
                })()}
            </Grid>




        </>

    );
}


export default Exams;