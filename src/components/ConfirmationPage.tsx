import { useLocation, useNavigate } from "react-router-dom";
import "./confirmationPageStyle.css";
import type { BookingResponse } from "../interfaces/index";

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as BookingResponse | null;

  if (!booking) {
    console.log("location.state", location.state);
    return (
      <div className="confirmation-container">
        <h2>Ingen booking fundet</h2>
        <button onClick={() => navigate("/booking")}>Tilbage</button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="confirmation-container">
      <div className="confirmation-content">
        <h1 className="confirmation-title">BOOKING VERIFIED!</h1>

        <div className="confirmation-details">
          <div className="detail-item">
            <span className="detail-label">Bokningsnummer:</span>
            <span className="detail-value">
              {booking.bookingId.slice(0, 6)}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Dato:</span>
            <span className="detail-value">{formatDate(booking.when)}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Tid:</span>
            <span className="detail-value">{formatTime(booking.when)}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Personer:</span>
            <span className="detail-value">{booking.people}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Baner:</span>
            <span className="detail-value">{booking.lanes}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Skostørrelser:</span>
            <span className="detail-value">{booking.shoes}</span>
          </div>

          <div className="detail-item total">
            <span className="detail-label">Totalsum:</span>
            <span className="detail-value price">{booking.price} kr</span>
          </div>
        </div>

        <button className="back-button" onClick={() => navigate("/booking")}>
          NY BOOKING
        </button>
      </div>
    </section>
  );
}

export default ConfirmationPage;
