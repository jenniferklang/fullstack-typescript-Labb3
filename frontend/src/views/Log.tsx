import React from "react";

const Log: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="container">
      <h2>Log-sidan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input type="date" className="form-control" id="date" />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <input type="text" className="form-control" id="content" />
        </div>
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">
            Symptoms:
          </label>
          <input type="text" className="form-control" id="symptoms" />
        </div>
        <div className="mb-3">
          <label htmlFor="meal" className="form-label">
            Meal:
          </label>
          <input type="text" className="form-control" id="meal" />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default Log;
