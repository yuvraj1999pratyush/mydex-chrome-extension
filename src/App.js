import React, { useState, useEffect } from "react";
import MainPage from "./components/MainPage/MainPage";
import FormPage from "./components/FormPage/FormPage";

import "./index.css";

function App() {
  const [currScreen, setCurrScreen] = useState("home");
  const [formFields, setFormFields] = useState([
    {
      name: "Full Name",
      value: "",
      type: "text",
      displayType: "text",
    },
    {
      name: "Email",
      value: "",
      type: "email",
      displayType: "text",
    },
    {
      name: "Phone No",
      value: "",
      type: "number",
      displayType: "text",
    },
    {
      name: "LinkedIn URL",
      value: "",
      type: "text",
      displayType: "link",
    },
    {
      name: "GitHub URL",
      value: "",
      type: "text",
      displayType: "link",
    },
    {
      name: "Website",
      value: "",
      type: "text",
      displayType: "link",
    },
  ]);

  useEffect(() => {
    chrome.storage.local.get(
      formFields.map((field) => field.name),
      (result) => {
        const prevFormFields = formFields.map((field) => ({
          ...field,
          value: result[field.name] || "",
        }));

        setFormFields(prevFormFields);
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="title-cx">
        <h1>My Dex</h1>
        <p>Store your general info here</p>
      </div>
      {currScreen === "home" ? (
        <MainPage formFields={formFields} setCurrScreen={setCurrScreen} />
      ) : (
        <FormPage
          formFields={formFields}
          setFormFields={setFormFields}
          setCurrScreen={setCurrScreen}
        />
      )}
    </div>
  );
}

export default App;
