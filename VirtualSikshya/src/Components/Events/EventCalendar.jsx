import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/teacherDashboard.css";

Modal.setAppElement("#root");

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2024, 1, 15), title: "Math Exam", description: "Final math exam at 10 AM" },
    { date: new Date(2024, 1, 20), title: "Science Fair", description: "Annual science fair event" },
    { date: new Date(2024, 1, 25), title: "Parent-Teacher Meeting", description: "Meeting at 3 PM" }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");

  // Inline styles
  const containerStyle = {
    marginTop: "100px",
  };

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

  // Function to add a new event
  const handleAddEvent = () => {
    if (newEventTitle.trim() === "") return;
    setEvents([...events, { date: selectedDate, title: newEventTitle, description: newEventDescription }]);
    setNewEventTitle("");
    setNewEventDescription("");
    setModalIsOpen(false);
  };

  return (
    <div className="dashboard-card" style={containerStyle}>
      <h5>Calendar</h5>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        highlightDates={events.map((event) => event.date)} // Highlights event days
        dayClassName={(date) => (isEventDay(date) ? "event-day" : undefined)} // Adds a class to event days
        onSelect={handleDateClick} // Open modal when clicking an event day
      />

      {/* Modal for Event Details */}
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

          {/* Form to Add New Event */}
          <div className="event-form">
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <textarea
              placeholder="Event Description"
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
            />
            <button onClick={handleAddEvent}>Add Event</button>
          </div>

          <button className="close-button" onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default EventCalendar;
