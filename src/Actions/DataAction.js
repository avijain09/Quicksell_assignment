import axios from "axios";

const FETCH_DATA_INIT = "FETCH_DATA_INIT";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const FETCH_SELECTED_INIT = "FETCH_SELECTED_INIT";
const FETCH_SELECTED_SUCCESS = "FETCH_SELECTED_SUCCESS";
const FETCH_SELECTED_FAILURE = "FETCH_SELECTED_FAILURE";

export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_INIT });
    const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
    dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILURE });
  }
};

export const selectDataByCriteria = (groupType, tickets, sortBy) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SELECTED_INIT });
    let userMode = false;
    let uniqueSet = new Set();
    let resultsArray = [], groupedData = [];


    if (groupType === "status") {
      tickets?.forEach((ticket) => uniqueSet.add(ticket.status));
      resultsArray = [...uniqueSet];
      resultsArray.forEach((status, idx) => {
        let filteredTickets = tickets.filter((ticket) => ticket.status === status);
        groupedData.push({
          [idx]: {
            title: status,
            value: filteredTickets,
          },
        });
      });
    } else if (groupType === "user") {
      userMode = true;
      tickets?.allUser?.forEach((user, idx) => {
        let userTickets = tickets?.allTickets?.filter((ticket) => ticket.userId === user.id);
        groupedData.push({
          [idx]: {
            title: user.name,
            value: userTickets || [],
          },
        });
      });
    } else {
      const priorityList = ["No priority", "Urgent", "High", "Medium", "Low"];
      priorityList.forEach((priority, idx) => {
        let priorityTickets = tickets?.filter((ticket) => ticket.priority === idx);
        groupedData.push({
          [idx]: {
            title: priority,
            value: priorityTickets || [],
          },
        });
      });
    }


    if (sortBy === "title") {
      groupedData.forEach((group, idx) => {
        group[idx]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }
    if (sortBy === "priority") {
      groupedData.forEach((group, idx) => {
        group[idx]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    dispatch({ type: FETCH_SELECTED_SUCCESS, payload: { groupedData, userMode } });
  } catch (error) {
    dispatch({ type: FETCH_SELECTED_FAILURE, payload: { message: error.message } });
  }
};
