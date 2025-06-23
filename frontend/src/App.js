import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import Calendar from "./Calendar";

function App() {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [view, setView] = useState("month"); // "day" | "week" | "month"

  // ✅ Load events from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("calendar-events");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  // ✅ Save events to localStorage on change
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  // ✅ Add or Edit Event with Overlap Check
  const addEvent = (eventData) => {
    const overlaps = events.some(ev =>
      ev.date === eventData.date &&
      ev.startTime === eventData.startTime &&
      (!editEvent || ev.id !== editEvent.id)
    );

    if (overlaps) {
      alert("⚠️ Overlapping event exists on the same date and time!");
      return;
    }

    if (editEvent) {
      // Edit case: update existing event
      setEvents(prevEvents =>
        prevEvents.map(ev =>
          ev.id === editEvent.id ? { ...eventData, id: editEvent.id } : ev
        )
      );
      setEditEvent(null);
    } else {
      // New event
      const newEvent = {
        ...eventData,
        id: Date.now(),
        completed: false,
      };
      setEvents([...events, newEvent]);
    }
  };

  // ✅ Delete Event
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // ✅ Mark Event as Completed
  const markCompleted = (id) => {
    setEvents(events.map(ev =>
      ev.id === id ? { ...ev, completed: true } : ev
    ));
  };

  return (
    <div className="app">
      <h1>📅 Calendar App</h1>

      {/* 🔁 View Mode Dropdown */}
      <div className="view-toggle">
        <label>View: </label>
        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      {/* 📝 Event Form */}
      <EventForm onAddEvent={addEvent} editEvent={editEvent} />

      {/* 📅 Calendar Component */}
      <Calendar
        events={events}
        setEditEvent={setEditEvent}
        deleteEvent={deleteEvent}
        markCompleted={markCompleted}
        view={view}
      />
    </div>
  );
}

export default App;
