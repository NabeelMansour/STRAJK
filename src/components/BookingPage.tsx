import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingPageStyle.css";
import logo from "/assets/logo.svg";

function BookingPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [numberOfLanes, setNumberOfLanes] = useState(1);
  const [shoeSizes, setShoeSizes] = useState<string[]>([""]);
  const [menuOpen, setMenuOpen] = useState(false);

  // När antal spelare ändras, uppdatera skostorlekar
  const handlePlayersChange = (newCount: number) => {
    setNumberOfPlayers(newCount);
    const newShoeSizes = [];
    for (let i = 0; i < newCount; i++) {
      newShoeSizes.push(shoeSizes[i] || "");
    }
    setShoeSizes(newShoeSizes);
  };

  // Uppdatera en skostorlek
  const handleShoeSizeChange = (index: number, value: string) => {
    const newShoes = [...shoeSizes];
    newShoes[index] = value;
    setShoeSizes(newShoes);
  };

  // Strike-knapp (bara UI, gör inget ännu)
  const handleStrike = () => {
    setTimeout(() => {
      navigate("/confirmation");
    }, 1000);
    console.log({ date, time, numberOfPlayers, numberOfLanes, shoeSizes });
  };
  return (
    <section className="booking-container">
      {/* Header */}
      <header className="booking-header">
        <button
          className="hamburger-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="header-content">
          <img src={logo} alt="Logo" className="booking-logo" />
          <h1 className="booking-title">BOOKING</h1>
        </div>
        <div style={{ width: "24px" }}></div>
      </header>

      {/* Menu */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMenuOpen(false)}>×</button>
            <nav>
              <a href="/booking">Bokning</a>
              <a href="/">Hem</a>
            </nav>
          </div>
        </div>
      )}

      <div className="form-section">
        <hr className="section-divider" />
        <div className="section-divider-text">WHEN, WHAT & WHO</div>

        <div className="input-group">
          <label className="input-label purple">DATE</label>
          <input
            type="date"
            className="input-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="input-group">
          <label className="input-label">TIME</label>
          <input
            type="time"
            className="input-field pink-border"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label purple">
            NUMBER OF AWESOME BOWLERS
          </label>
          <div className="number-input-wrapper">
            <button
              type="button"
              className="number-btn"
              onClick={() => handlePlayersChange(numberOfPlayers - 1)}
              disabled={numberOfPlayers <= 1}
            >
              −
            </button>
            <input
              type="number"
              className="input-field number-input"
              value={numberOfPlayers}
              onChange={(e) => {
                const count = parseInt(e.target.value) || 1;
                handlePlayersChange(count);
              }}
              min="1"
            />
            <span className="number-suffix">pers</span>
            <button
              type="button"
              className="number-btn"
              onClick={() => handlePlayersChange(numberOfPlayers + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Antal banor */}
        <div className="input-group">
          <label className="input-label purple">NUMBER OF LANES</label>
          <div className="number-input-wrapper">
            <button
              type="button"
              className="number-btn"
              onClick={() => setNumberOfLanes(numberOfLanes - 1)}
              disabled={numberOfLanes <= 1}
            >
              −
            </button>
            <input
              type="number"
              className="input-field number-input"
              value={numberOfLanes}
              onChange={(e) => setNumberOfLanes(parseInt(e.target.value) || 1)}
              min="1"
            />
            <span className="number-suffix">
              lane{numberOfLanes !== 1 ? "s" : ""}
            </span>
            <button
              type="button"
              className="number-btn"
              onClick={() => setNumberOfLanes(numberOfLanes + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Skostorlekar - visas när spelare väljs */}
      {numberOfPlayers > 0 && (
        <div className="form-section">
          <hr className="section-divider" />
          <div className="section-divider-text">SHOES</div>

          {shoeSizes.map((shoe, index) => (
            <div key={index} className="shoe-size-item">
              <div className="shoe-size-input-group">
                <label className="input-label purple">
                  SHOE SIZE / PERSON {index + 1}
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={shoe}
                  onChange={(e) => handleShoeSizeChange(index, e.target.value)}
                  placeholder="44"
                  min="30"
                  max="50"
                />
              </div>
              {numberOfPlayers > 1 && (
                <button
                  className="remove-person-btn"
                  onClick={() => handlePlayersChange(numberOfPlayers - 1)}
                >
                  −
                </button>
              )}
            </div>
          ))}

          <button
            className="add-person-btn"
            onClick={() => handlePlayersChange(numberOfPlayers + 1)}
          >
            +
          </button>
        </div>
      )}

      {/* Strike-knapp */}
      <button className="strike-button" onClick={handleStrike}>
        STRIIIIIIKE!
      </button>
    </section>
  );
}

export default BookingPage;
