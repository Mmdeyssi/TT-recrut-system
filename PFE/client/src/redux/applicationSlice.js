import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
        statusMap: {},
    },
    reducers:{
      updateApplicantStatus: (state, action) => {
        const { id, status } = action.payload;
      
        if (!state.statusMap) state.statusMap = {};
        state.statusMap[id] = status;
      
        if (state.applicants && Array.isArray(state.applicants.applications)) {
          state.applicants.applications = state.applicants.applications.map((app) =>
            app._id === id ? { ...app, status } : app
          );
        }
      },
      
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
            //Also build statusMap when we set applicants
            const map = {};
            action.payload?.applications?.forEach((app) => {
              map[app._id] = app.status;
            });
            state.statusMap = map;
          
        },
        
    }
});
export const { setAllApplicants, updateApplicantStatus } =
  applicationSlice.actions;
export default applicationSlice.reducer;