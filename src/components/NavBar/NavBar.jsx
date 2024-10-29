import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDataByCriteria } from "../../Actions/DataAction";
import "./NavBar.css";
import { ReactComponent as DisplayIcon } from "../../Assests/icons/Display.svg";
import { ReactComponent as Down } from "../../Assests/icons/down.svg";

const setLocalStorage = (key, value) => localStorage.setItem(key, value);
const getLocalStorage = (key, defaultValue) => localStorage.getItem(key) || defaultValue;

const NavBar = () => {
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [grouping, setGrouping] = useState(getLocalStorage("group", "status"));
  const [ordering, setOrdering] = useState(getLocalStorage("order", "priority"));

  const handleSelectionChange = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGrouping(value);
      setLocalStorage("group", value);
    } else {
      setOrdering(value);
      setLocalStorage("order", value);
    }
    setDisplayDropdown(false);
  };

  useEffect(() => {
    const selectedData = grouping === "user" ? { allTickets, allUser } : allTickets;
    dispatch(selectDataByCriteria(grouping, selectedData, ordering));
  }, [grouping, ordering, allTickets, allUser, dispatch]);

  return (
    <div className="top-header" style={{ paddingLeft: "13px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayDropdown(!displayDropdown)}
        >
          <DisplayIcon width={20} height={20} />
          Display
          <Down/>
        </button>
 
        {displayDropdown && (
          <div className="dropOnClick flex-gap-10 p-10">
            <Dropdown
              label="Grouping"
              value={grouping}
              onChange={(e) => handleSelectionChange(e, true)}
              options={[
                { value: "status", label: "Status" },
                { value: "user", label: "User" },
                { value: "priority", label: "Priority" },
              ]}
            />
            <Dropdown
              label="Ordering"
              value={ordering}
              onChange={(e) => handleSelectionChange(e, false)}
              options={[
                { value: "priority", label: "Priority" },
                { value: "title", label: "Title" },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Dropdown = ({ label, value, onChange, options }) => (
  <div className="selectGroup flex-sb">
    <span style={{ fontSize: "14px", color: "#555B5A" }}>{label}</span>
    <select value={value} onChange={onChange} className="selectStyle">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default NavBar;
