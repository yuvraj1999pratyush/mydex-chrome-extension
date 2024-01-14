import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";

import "./style.css";

const MainPage = (props) => {
  const { formFields, setCurrScreen } = props;
  const [copyMsg, setCopyMsg] = useState("");

  const formatValue = (theVal) => {
    if (theVal.length > 30) {
      return `${theVal.slice(0, 27)}...`;
    } else {
      return theVal;
    }
  };

  const renderValue = (theVal, theDisplay) => {
    if (theDisplay === "link") {
      return (
        <a href={theVal} target="_blank">
          {formatValue(theVal)}
        </a>
      );
    } else {
      return <p>{formatValue(theVal)}</p>;
    }
  };

  const handleCopyMsg = (theName, theValue) => {
    setCopyMsg(`COPIED ${theName}: ${theValue}`);
  };

  return (
    <div className="main-page">
      {formFields.map((item) => {
        return (
          <div className="info-field">
            <h3>{item.name}</h3>
            <span>
              {item.value ? (
                renderValue(item.value, item.displayType)
              ) : (
                <i>Not Added</i>
              )}
              {item.value && (
                <CopyToClipboard
                  text={item.value}
                  onCopy={() => {
                    handleCopyMsg(item.name, item.value);
                  }}
                >
                  <ContentCopyIcon
                    style={{
                      height: "16px",
                      color: "#000000",
                      cursor: "pointer",
                    }}
                  />
                </CopyToClipboard>
              )}
            </span>
          </div>
        );
      })}
      <button
        onClick={() => {
          setCurrScreen("form");
        }}
        className="edit-btn-cx"
      >
        <span>Edit</span>
        <EditIcon style={{ height: "16px", color: "rgb(112, 112, 249)" }} />
      </button>
      {copyMsg && <span className="msg-cx">{copyMsg}</span>}
    </div>
  );
};

export default MainPage;
