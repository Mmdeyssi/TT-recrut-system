import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        filterQuery:[],
        
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload;
        },
        addAdminJob: (state, action) => {
            state.allAdminJobs.push(action.payload);
          },
          
        deleteJob: (state, action) => {
            state.allAdminJobs = state.allAdminJobs.filter(job => job._id !== action.payload);//remove from all admin jobs
            state.allAppliedJobs = state.allAppliedJobs.filter(job => job._id !== action.payload);//remove from the allapplied jobs 
          },
          
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery,
    setFilterQuery,
    deleteJob,
    addAdminJob,
} = jobSlice.actions;
      
export default jobSlice.reducer;