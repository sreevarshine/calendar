import React, { useEffect, useState } from "react";

function EventForm({ onAddEvent, editEvent }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    color: "#f66e23",
    completed: false,
  });

  // ✅ Load event into form when editEvent changes
  useEffect(() => {
    if (editEvent) {
      setForm(editEvent);
    }
  }, [editEvent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventToAdd = editEvent
      ? { ...form, id: editEvent.id }
      : { ...form, id: Date.now() };
    onAddEvent(eventToAdd);
    setForm({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      color: "#f66e23",
      completed: false,
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="startTime"
        type="time"
        value={form.startTime}
        onChange={handleChange}
        required
      />
      <input
        name="endTime"
        type="time"
        value={form.endTime}
        onChange={handleChange}
        required
      />
      <input
        name="color"
        type="color"
        value={form.color}
        onChange={handleChange}
      />
      <button type="submit">{editEvent ? "Update" : "Add"} Event</button>
    </form>
  );
}

export default EventForm;
