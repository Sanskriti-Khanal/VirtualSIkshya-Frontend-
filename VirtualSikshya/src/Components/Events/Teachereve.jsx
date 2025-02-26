import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../../styles/teacherDashboard.css";

Modal.setAppElement("#root");

const TeacherEvents = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState([
    { date: new Date(2024, 1, 15), title: "Math Exam", description: "Final math exam at 10 AM" },
    { date: new Date(2024, 1, 20), title: "Science Fair", description: "Annual science fair event" },
    { date: new Date(2024, 1, 25), title: "Parent-Teacher Meeting", description: "Meeting at 3 PM" }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Function to handle date selection
  const handleDateClick = (date) => {
    const filteredEvents = events.filter((event) => event.date.toDateString() === date.toDateString());
    setSelectedEvents(filteredEvents);
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  // Function to check if a date has an event
  const isEventDay = (date) => {
    return events.some((event) => event.date.toDateString() === date.toDateString());
  };

  return (
    <div className="dashboard-card" style={{ marginTop: "100px" }}>
      <h5>Teacher Events</h5>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        highlightDates={events.map((event) => event.date)}
        dayClassName={(date) => (isEventDay(date) ? "event-day" : undefined)}
        onSelect={handleDateClick}
      />

      {/* Modal for Viewing Events */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <div className="modal-content">
          <h2>Events on {selectedDate.toDateString()}</h2>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event, index) => (
              <div key={index} className="event-item">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
            ))
          ) : (
            <p>No events scheduled for this day.</p>
          )}
          <button className="close-button" onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherEvents;
