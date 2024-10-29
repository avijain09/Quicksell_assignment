import React from "react";
import { useSelector } from "react-redux";
import "./DashBoard.css";
import Card from "../Card/Card";
import { ReactComponent as MenuIcon } from "../../Assests/icons/3 dot menu.svg";
import { ReactComponent as Add } from "../../Assests/icons/add.svg";
import { ReactComponent as Backlog } from "../../Assests/icons/Backlog.svg";
import { ReactComponent as Done } from "../../Assests/icons/Done.svg";
import { ReactComponent as InProgress } from "../../Assests/icons/in-progress.svg";
import { ReactComponent as Todo } from "../../Assests/icons/To-do.svg";
import { ReactComponent as Cancelled } from "../../Assests/icons/Cancelled.svg";
import { ReactComponent as Urgent } from "../../Assests/icons/SVG - Urgent Priority colour.svg";
import { ReactComponent as Nopriority } from "../../Assests/icons/No-priority.svg";
import { ReactComponent as HighPriority } from "../../Assests/icons/Img - High Priority.svg";
import { ReactComponent as MediumPriority } from "../../Assests/icons/Img - Medium Priority.svg";
import { ReactComponent as LowPriority } from "../../Assests/icons/Img - Low Priority.svg";

const DashBoard = () => {
  const groupStatus = localStorage.getItem("group") === "status";
  const groupPriority = localStorage.getItem("group") === "priority";

  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  return (
    selectedData && (
      <div
        className="dashContainer"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        {selectedData.map((item, idx) => {
          const cardWidth = 18.7;

          return (
            <div
              key={idx}
              className="dashCardContainer"
              style={{ width: `${cardWidth}%` }}
            >
              <div className="dashCardHeading flex-sb">
                <div className="leftView">
                  {user ? (
                    <div
                      className="imageContainer relative"
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "inline-block",
                      }}
                    ></div>
                  ) : groupStatus ? (
                    <div
                      className="cardTitle"
                      style={{
                        width: "15px",
                        height: "15px",
                        display: "inline-block",
                        fontWeight: 200,
                      }}
                    >
                      {item[idx].title === "Backlog" ? (
                        <Backlog style={{ width: "13px", height: "13px", cursor: "pointer" }} />
                      ) : item[idx].title === "Todo" ? (
                        <Todo style={{ width: "13px", height: "13px", cursor: "pointer" }} />
                      ) : item[idx].title === "In progress" ? (
                        <InProgress style={{ width: "13px", height: "13px", cursor: "pointer" }} />
                      ) : item[idx].title === "Done" ? (
                        <Done style={{ width: "13px", height: "13px", cursor: "pointer" }} />
                      ) : (
                        <Cancelled style={{ width: "13px", height: "13px", cursor: "pointer" }} />
                      )}
                    </div>
                  ) : groupPriority ? (
                    <div
                      className="tags color-grey"
                      style={{
                        width: "35px",
                        height: "30px",
                        display: "inline-block",
                      }}
                    >
                      {["Low", "Medium", "High"].includes(item[idx].title) ? (
                        <>
                          {item[idx].title === "Low" && <LowPriority width="24" height="24" />}
                          {item[idx].title === "Medium" && <MediumPriority width="24" height="24" />}
                          {item[idx].title === "High" && <HighPriority width="24" height="24" />}
                        </>
                      ) : item[idx].title === "Urgent" ? (
                        <Urgent style={{ width: "24px", height: "24px", cursor: "pointer" }} />
                      ) : (
                        <Nopriority style={{ width: "24px", height: "24px", cursor: "pointer" }} />
                      )}
                    </div>
                  ) : (
                    <img
                      style={{ width: "30px", height: "30px", borderRadius: "100%" }}
                      src="pp.jpg"
                      alt="UserImage"
                    />
                  )}{" "}
                  <span>
                    {item[idx]?.title} 
                    {" "}
                    <span  style={{ color: 'grey' }}>{item[idx].value?.length}</span>
                  </span>

                </div>
                <div className="rightView">
                  <Add style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                  <MenuIcon style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                </div>
              </div>
              <div className="dashList flex-gap-10">
                {item[idx]?.value?.map((element, subIndex) => (
                  <Card
                    key={subIndex}
                    id={element.id}
                    title={element.title}
                    tag={element.tag}
                    status={element.status}
                    priority={element.priority}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {groupStatus && (
          <>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "90px", wordSpacing: "4px" }}>
                <div
                  className="cardTitle"
                  style={{
                    width: "13px",
                    height: "13px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                  <Done style={{ width: "13px", height: "13px", cursor: "pointer" }} />
                </div>{" "}
                <span style={{ fontSize: "16px", fontWeight: "lighter" }}>Done</span> <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                <Add style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                <MenuIcon style={{ width: "20px", height: "20px", cursor: "pointer" }} />
              </div>
            </div>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "60px", wordSpacing: "4px" }}>
                <div
                  className="cardTitle"
                  style={{
                    width: "9px",
                    height: "9px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                  <Cancelled style={{ width: "13px", height: "13px", cursor: "pointer" }} />
                </div>{" "}
                <span style={{ fontSize: "16px", fontWeight: "lighter" }}>Canceled</span> <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                <Add style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                <MenuIcon style={{ width: "20px", height: "20px", cursor: "pointer" }} />
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default DashBoard;

