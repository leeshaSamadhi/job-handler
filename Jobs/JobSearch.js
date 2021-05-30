import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";


const JobSearch = ({ jobs, setDisplayJobs }) => {
  const [searchText, setSearchText] = useState("");

  const filterItems = (arr, query) => {
    return arr.filter((el) => {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  };

  const onClickSearch = async () => {
    let allJobTitles = [];
    await jobs.map((job) => allJobTitles.push(job.title));
    let jobTitles = filterItems(allJobTitles, searchText);
    let searchedJobs = [];
    await jobs.map((job) => {
      for (let i = 0; i < jobTitles.length; i++) {
        if (job.title === jobTitles[i]) {
          searchedJobs.push(job);
          break;
        }
      }
    });
    setDisplayJobs(searchedJobs);
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setDisplayJobs(jobs);
    } else {
      onClickSearch();
    }
  }, [searchText]);

  return (
    <div className="search-box">
   
        <TextField
        className="searchBox"
          label="Search Jobs"
          variant="outlined"
          value={searchText}
          color="secondary"
          onChange={handleTextChange}
        />
 
    </div>
  );
};

export default JobSearch;
