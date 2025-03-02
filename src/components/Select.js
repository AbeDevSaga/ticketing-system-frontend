import React from "react";
import Select from "react-select";

const CustomSelect = ({ value, onChange, options, className }) => {
  const selectedOption = options.find((option) => option.value === value);

  const handleChange = (selectedOption) => {
    onChange({ target: { value: selectedOption.value } });
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      className={`react-select-container ${className}`}
      classNamePrefix="react-select"
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          border: "none",
          borderRadius: "0.5rem",
          color: "white",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#6D28D9" : "white",
          color: state.isSelected ? "white" : "black",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "white",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "white",
        }),
      }}
    />
  );
};

export default CustomSelect;
