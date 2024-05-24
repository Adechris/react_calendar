import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = () => {
    const newEvent = {
      date: date,
      title: "Add Event",
    };
    setEvents([...events, newEvent]);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEditTitle(event.title);
  };

  const handleSaveEdit = () => {
    const updatedEvents = events.map((event) =>
      event === editingEvent ? { ...event, title: editTitle } : event
    );

    setEvents(updatedEvents);
    setEditingEvent(false);
  };

  const handleCancelEdit = () => {
    setEditingEvent(false);
    setEditTitle("");
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  return (
    <Container className="mt-5 ">
      
      <div className="d-flex justify-content-center">
      <Calendar onChange={handleDateChange} value={date} />
      </div>
      <main className="mt-3 text-center">
        <h2>Events for {date.toDateString()}</h2>
        {events
          .filter((event) => event.date.toDateString() === date.toDateString())
          .map((event, index) => (
            <div key={index}>
              {editingEvent === event ? (
                <>
                  <input
                    type="text"
                    className="form-control shadow-none mt-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <div className="mt-3">
                    <button
                      className="btn btn-success"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <strong>{event.title}</strong>
                  <div className="mt-3">
                    <button
                      className="btn btn-success"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleDeleteEvent(event)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        <button className="btn btn-dark mt-3" onClick={handleAddEvent}>
          Add Event
        </button>
      </main>
    </Container>
  );
};

export default App;
