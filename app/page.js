"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    ticketClass: "",
  });

  const [error, setError] = useState("");

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setFormData((prev) => ({ ...prev, eventDate: `${yyyy}-${mm}-${dd}` }));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { fullName, eventName, eventDate, eventTime, ticketClass } = formData;

    if (!fullName || !eventName || !eventDate || !eventTime || !ticketClass) {
      setError("Please fill in all fields before generating your pass.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    const searchParams = new URLSearchParams({
      fullName,
      eventName,
      eventDate,
      eventTime,
      ticketClass
    });

    router.push(`/ticket?${searchParams.toString()}`);
  };

  return (
    <main className="app">
      {/* Header */}
      <header className="header">
        <div className="header__badge">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
          </svg>
          GDG Ticket Generator
        </div>
        <h1>Create Your Dev Pass</h1>
        <p>
          Fill in the details below and generate a modern Google Developer Group digital ticket.
        </p>
      </header>

      {/* Form */}
      <section className="form-card">
        <div className="form-card__title">Ticket Details</div>
        <form
          id="ticketForm"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="e.g. Jane Doe"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventName">Event Name / Chapter</label>
            <input
              type="text"
              id="eventName"
              placeholder="e.g. DevFest Lagos 2026"
              required
              value={formData.eventName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="eventDate">Date</label>
              <input
                type="date"
                id="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventTime">Time</label>
              <input
                type="time"
                id="eventTime"
                required
                value={formData.eventTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ticketClass">Ticket Role</label>
            <select
              id="ticketClass"
              required
              value={formData.ticketClass}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Attendee">Attendee</option>
              <option value="Speaker">Speaker</option>
              <option value="Organizer">Organizer</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          <button type="submit" className="btn-generate" id="btnGenerate">
            <span className="btn-generate__content">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
              Generate Dev Pass
            </span>
          </button>

          <div
            className={`form-error ${error ? "visible" : ""}`}
            id="formError"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span id="formErrorMessage">
              {error || "Please fill in all fields."}
            </span>
          </div>
        </form>
      </section>
    </main>
  );
}
