import React from "react";

import "./style.css";

const FormPage = (props) => {
  const { formFields, setFormFields, setCurrScreen } = props;

  const handleInputChange = (fieldName, value) => {
    const updatedFormFields = formFields.map((field) => {
      if (field.name === fieldName) {
        return { ...field, value };
      }
      return field;
    });

    setFormFields(updatedFormFields);
  };

  const handleSubmit = () => {
    const storageData = {};

    formFields.forEach((field) => {
      storageData[field.name] = field.value;
    });

    chrome.storage.local.set(storageData).then(() => {
      setCurrScreen("home");
    });
  };

  return (
    <div className="form-page">
      {formFields.map((field) => (
        <div key={field.name} className="form-fields">
          <p>{field.name}:</p>
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        </div>
      ))}
      <button className="btn-cx" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default FormPage;
