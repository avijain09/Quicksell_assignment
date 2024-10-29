import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allTickets: [],
  allUser: [],
  selectedData: [],
  userMode: false,
  errorMessage: null,
};

export const DataReducer = createReducer(initialState, {
  FETCH_DATA_INIT: (state) => {
    state.loading = true;
    state.allTickets = [];  
    state.allUser = [];
  },
  FETCH_DATA_SUCCESS: (state, action) => {
    state.loading = false;
    state.allTickets = action.payload.tickets || [];
    state.allUser = action.payload.users || [];
  },
  FETCH_DATA_FAILURE: (state) => {
    state.loading = false;
    state.allTickets = [];
    state.allUser = [];
    state.errorMessage = "Failed to fetch data";
  },
});


export const SelectDataReducer = createReducer(initialState, {
  FETCH_SELECTED_INIT: (state) => {
    state.loading = true;
    state.selectedData = [];
    state.userMode = false;  
  },
  FETCH_SELECTED_SUCCESS: (state, action) => {
    state.loading = false;
    state.selectedData = action.payload.groupedData || [];
    state.userMode = action.payload.userMode || false;
  },
  FETCH_SELECTED_FAILURE: (state, action) => {
    state.loading = false;
    state.selectedData = [];
    state.errorMessage = action.payload.message || "Failed to select data";
  },
});
