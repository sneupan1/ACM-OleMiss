import React from "react";
import "./form-input.styles.scss";

const FormInput = ({
  handleChange,
  label,
  type,
  inputOptions,
  ...otherProps
}) => {
  return (
    <div className="form-input-group">
      {type === "select" ? (
        <select className="form-input" onChange={handleChange} {...otherProps}>
          <option value={""}></option>
          {inputOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className="form-input input-textarea"
          rows="5"
          onChange={handleChange}
          {...otherProps}
        ></textarea>
      ) : (
        <input
          className="form-input"
          type={type}
          onChange={handleChange}
          {...otherProps}
        />
      )}

      {label ? (
        <label
          className={`${
            otherProps.value && otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
