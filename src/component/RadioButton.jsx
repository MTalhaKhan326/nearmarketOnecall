import { radioClasses } from "@mui/material";
import React, { useState } from "react";

function RadioButtons() {
  const [selectedClass, setSelectedClass] = useState("");

  const handleOptionChange = (e) => {
    setSelectedClass(e.target.value);
    console.log(e.target.value)
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-gray-600"
          value="Class1"
          checked={selectedClass === "Class1"}
          onChange={handleOptionChange}
        />
        <span className="ml-2 text-gray-700">Class1</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-gray-600"
          value="Class2"
          checked={selectedClass === "Class2"}
          onChange={handleOptionChange}
        />
        <span className="ml-2 text-gray-700">Class2</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-gray-600"
          value="Class3"
          checked={selectedClass === "Class3"}
          onChange={handleOptionChange}
        />
        <span className="ml-2 text-gray-700">Class3</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-gray-600"
          value="Class4"
          checked={selectedClass === "Class4"}
          onChange={handleOptionChange}
        />
        <span className="ml-2 text-gray-700">Class4</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio text-gray-600"
          value="Allkind"
          checked={selectedClass === "Allkind"}
          onChange={handleOptionChange}
        />
        <span className="ml-2 text-gray-700">Allkind</span>
      </label>
    </div>
  );
}
export default RadioButtons