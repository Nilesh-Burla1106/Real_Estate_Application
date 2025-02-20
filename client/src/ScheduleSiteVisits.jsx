import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ApexCharts from "react-apexcharts";

const ScheduleSiteVisits = () => {
  const [siteVisits, setSiteVisits] = useState([]);
  const [newVisit, setNewVisit] = useState({ client: "", date: "", time: "", location: "", budget: "", notes: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({ visitDates: [], visitCounts: [], budgetDistribution: [] });

  useEffect(() => {
    fetchSiteVisits();
  }, []);

  const fetchSiteVisits = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/site-visits");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setSiteVisits(data);
        updateChartData(data);
      } else {
        throw new Error("Data format error.");
      }
    } catch (err) {
      console.error("Error fetching site visits:", err);
      setError("Failed to fetch site visits.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVisit((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(newVisit).every((value) => value.trim() !== "");
  };

  const addOrUpdateSiteVisit = async () => {
    if (!validateForm()) {
      alert("All fields are required.");
      return;
    }

    const url = isEditing
      ? `http://localhost:3001/api/site-visits/${editId}`
      : "http://localhost:3001/api/site-visits";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVisit),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const savedVisit = await response.json();
      setSiteVisits((prevVisits) =>
        isEditing
          ? prevVisits.map((visit) => (visit._id === editId ? savedVisit : visit))
          : [...prevVisits, savedVisit]
      );
      setIsEditing(false);
      setNewVisit({ client: "", date: "", time: "", location: "", budget: "", notes: "" });
      updateChartData(isEditing ? siteVisits : [...siteVisits, savedVisit]);
    } catch (err) {
      console.error("Error saving site visit:", err);
      setError("Failed to save site visit.");
    }
  };

  const editSiteVisit = (visit) => {
    setIsEditing(true);
    setNewVisit(visit);
    setEditId(visit._id);
  };

  const deleteSiteVisit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/site-visits/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const updatedVisits = siteVisits.filter((visit) => visit._id !== id);
      setSiteVisits(updatedVisits);
      updateChartData(updatedVisits);
    } catch (err) {
      console.error("Error deleting site visit:", err);
      setError("Failed to delete site visit.");
    }
  };

  const updateChartData = (data) => {
    const visitDates = {};
    const budgetDistribution = {};
    data.forEach((visit) => {
      visitDates[visit.date] = (visitDates[visit.date] || 0) + 1;
      budgetDistribution[visit.client] = (budgetDistribution[visit.client] || 0) + parseFloat(visit.budget);
    });
    setChartData({
      visitDates: Object.keys(visitDates),
      visitCounts: Object.values(visitDates),
      budgetDistribution: Object.values(budgetDistribution),
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar title="Scheduled Site Visits" />
      <div className="container my-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <h4 className="text-center mb-4">{isEditing ? "Edit Site Visit" : "Add New Site Visit"}</h4>

        <div className="card shadow-lg border-0 p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Client</label>
                <input type="text" className="form-control form-control-lg" name="client" value={newVisit.client} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control form-control-lg" name="date" value={newVisit.date} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" className="form-control form-control-lg" name="time" value={newVisit.time} onChange={handleInputChange} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Location</label>
                <input type="text" className="form-control form-control-lg" name="location" value={newVisit.location} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Budget</label>
                <input type="number" className="form-control form-control-lg" name="budget" value={newVisit.budget} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea className="form-control form-control-lg" name="notes" value={newVisit.notes} onChange={handleInputChange}></textarea>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-success btn-lg mt-3 shadow-sm" onClick={addOrUpdateSiteVisit}>
              {isEditing ? "Update Site Visit" : "Add Site Visit"}
            </button>
          </div>
        </div>

        <div className="table-responsive mt-5">
          <table className="table table-hover table-bordered shadow-sm rounded">
            <thead className="thead-light">
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {siteVisits.length > 0 ? (
                siteVisits.map((visit) => (
                  <tr key={visit._id}>
                    <td>{visit.client}</td>
                    <td>{visit.date}</td>
                    <td>{visit.time}</td>
                    <td>{visit.location}</td>
                    <td>{visit.budget}</td>
                    <td>{visit.notes}</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm mx-1 shadow-sm" onClick={() => editSiteVisit(visit)}>
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm mx-1 shadow-sm" onClick={() => deleteSiteVisit(visit._id)}>
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No site visits available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="container my-5">
          <h4>Site Visit Statistics</h4>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <ApexCharts
                    options={{
                      chart: {
                        type: "bar",
                      },
                      title: {
                        text: "Visits by Date",
                      },
                      xaxis: {
                        categories: chartData.visitDates,
                      },
                    }}
                    series={[
                      {
                        name: "Visits",
                        data: chartData.visitCounts,
                      },
                    ]}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScheduleSiteVisits;
