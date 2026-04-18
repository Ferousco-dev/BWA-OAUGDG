"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";

function TicketContent() {
  const searchParams = useSearchParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    if (!searchParams) return;

    const fullName = searchParams.get("fullName") || "Developer";
    const eventName = searchParams.get("eventName") || "GDG Event";
    const eventDate = searchParams.get("eventDate") || "2026-01-01";
    const eventTime = searchParams.get("eventTime") || "10:00";
    const ticketClass = searchParams.get("ticketClass") || "Attendee";

    const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Format Date
    const d = new Date(eventDate + "T00:00:00");
    const formattedDate = d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Format Time
    const [h, m] = eventTime.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    const formattedTime = `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;

    // Generator logic
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let serial = "";
    for (let i = 0; i < 12; i++) {
        if (i > 0 && i % 4 === 0) serial += "-";
        serial += chars[randomBetween(0, chars.length - 1)];
    }

    const qrData = JSON.stringify({
      id: serial,
      name: fullName,
      event: eventName,
      role: ticketClass
    });

    setTicketData({
      fullName,
      eventName,
      date: formattedDate,
      time: formattedTime,
      ticketClass,
      serial: "GDG-" + serial,
      qrData
    });

  }, [searchParams]);

  if (!ticketData) return <div className="loading-state">Generating pass...</div>;

  return (
    <div className="ticket-page-container">
      <div className="ticket-header-nav">
         <Link href="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Create another pass
         </Link>
      </div>

      <div className="gdg-ticket-wrapper">
        <div className="gdg-ticket">
          
          {/* Top Brand Banner */}
          <div className="gdg-ticket__brand-bar">
            <div className="brand-bar__color bg-blue"></div>
            <div className="brand-bar__color bg-red"></div>
            <div className="brand-bar__color bg-yellow"></div>
            <div className="brand-bar__color bg-green"></div>
          </div>

          <div className="gdg-ticket__content">
            {/* Header */}
            <div className="gdg-ticket__top">
              <div className="gdg-logo-placeholder">
                 <span className="gdg-text">&lt; /&gt;</span>
                 Google Developer Groups
              </div>
              <span className={`gdg-badge gdg-badge--${ticketData.ticketClass.toLowerCase()}`}>
                {ticketData.ticketClass}
              </span>
            </div>

            {/* Event Name */}
            <h2 className="gdg-ticket__event">{ticketData.eventName}</h2>

            {/* Date and Time */}
            <div className="gdg-ticket__meta">
              <div className="meta-item">
                <span className="meta-label">Date</span>
                <span className="meta-value">{ticketData.date}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Time</span>
                <span className="meta-value">{ticketData.time}</span>
              </div>
            </div>

            {/* Attendee Info */}
            <div className="gdg-ticket__attendee">
              <div className="attendee-label">Admit One</div>
              <div className="attendee-name">{ticketData.fullName}</div>
              <div className="attendee-serial">{ticketData.serial}</div>
            </div>
          </div>

          {/* Tear Line (CSS dashed border) */}
          <div className="gdg-ticket__divider"></div>

          {/* QR Section */}
          <div className="gdg-ticket__qr-section">
            <div className="qr-wrapper">
              <QRCode 
                value={ticketData.qrData} 
                size={140}
                bgColor={"#ffffff"}
                fgColor={"#1d1d1f"}
                level={"L"}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <p className="qr-scan-text">Scan for entry</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function TicketPage() {
  return (
    <Suspense fallback={<div className="loading-state">Loading pass data...</div>}>
      <TicketContent />
    </Suspense>
  );
}
