import React from "react";
import "./Card.css";
import { ReactComponent as HighPriority } from "../../Assests/icons/Img - High Priority.svg";
import { ReactComponent as MediumPriority } from "../../Assests/icons/Img - Medium Priority.svg";
import { ReactComponent as LowPriority} from "../../Assests/icons/Img - Low Priority.svg";
import { ReactComponent as Nopriority} from "../../Assests/icons/No-priority.svg";
import { ReactComponent as Backlog } from "../../Assests/icons/Backlog.svg";
import { ReactComponent as Done } from "../../Assests/icons/Done.svg";
import { ReactComponent as InProgress } from "../../Assests/icons/in-progress.svg";
import { ReactComponent as Todo } from "../../Assests/icons/To-do.svg";
import { ReactComponent as Cancelled } from "../../Assests/icons/Cancelled.svg";
import { ReactComponent as GreyUrgent } from "../../Assests/icons/SVG - Urgent Priority grey.svg";

const Card = ({ id, title, tag, status, priority }) => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];
  const bygroup=localStorage.getItem("group");

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div
          className="imageContainer relative"
          style={{ width: "35px", height: "30px" }}
        >
      
          {bygroup !== "user" && (<><img
            style={{ width: "95%", height: "95%", borderRadius: "50%" }}
            src="pp.jpg"
            alt="UserImage"
          />
          <div className="showStatus"></div>
          </>
          )}
          
        </div>
      </div>
      
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        {!isStatus && (
          status === "Backlog" ? (
            <Backlog style={{ width: "14px", height: "14px", cursor: "pointer",marginRight:"3px" }} />
          ) : status === "Todo" ? (
            <Todo style={{ width: "14px", height: "14px", cursor: "pointer",marginRight:"3px" }} />
          ) : status === "In progress" ? (
            <InProgress style={{ width: "14px", height: "14px", cursor: "pointer",marginRight:"3px" }} />
          ) : status === "Done" ? (
            <Done style={{ width: "14px", height: "14px", cursor: "pointer",marginRight:"3px" }} />
          ) : (
            <Cancelled style={{ width: "14px", height: "14px", cursor: "pointer" ,marginRight:"3px" }} />
          )
        )}
        <span style={{ margin: "0.2px" }}>{title}</span>
      </div>
      
      <div className="cardTags">
        {!isPriority ? (
          <div className="tags color-grey">
          {priority === 1 || priority === 2 || priority === 3 ? (
            <>
              {priority === 3 && <LowPriority width="24" height="24" />}
              {priority === 2 && <MediumPriority width="24" height="24" />}
              {priority === 1 && <HighPriority width="24" height="24" />}
            </>
          ) : priority === 4 ? (
            <GreyUrgent width="24" height="24" />
          ) : (
            <Nopriority width="24" height="24" />
          )}
        </div>
        ) : null}
        {tag?.map((element, index) => {
          return (
            <div key={index} className="tags color-grey">
              <span>•</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
