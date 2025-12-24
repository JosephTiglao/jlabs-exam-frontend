import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapUpdater from "../components/MapUpdater";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [geo, setGeo] = useState(null);
  const [ip, setIp] = useState("");
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  const fetchGeo = async (targetIp = "", addToHistory = false) => {
    const url = targetIp
      ? `https://ipinfo.io/${targetIp}/geo`
      : `https://ipinfo.io/geo`;

    try {
      const res = await axios.get(url);
      setGeo(res.data);

      if (addToHistory && targetIp) setHistory((prev) => [...prev, res.data]);
    } catch (err) {
      alert("Failed to fetch IP info");
    }
  };

  useEffect(() => {
    fetchGeo();
  }, []);

  const isValidIP = (value) => /^(\d{1,3}\.){3}\d{1,3}$/.test(value);

  const deleteSelected = () => {
    setHistory(history.filter((item) => !selected.includes(item)));
    setSelected([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const location = geo?.loc ? geo.loc.split(",").map(Number) : [0, 0];

  return (
    <div className="container">
      <div className="header">
        <div className="logo-section">
          <div className="logo-icon">
            <i className="fas fa-earth-americas"></i>
          </div>
          <div className="logo-text">IP GeoTracker</div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <div className="search-section">
            <div className="section-title">Search IP Address</div>
            <div className="search-input-wrapper">
              <i className="fas fa-search"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Enter IP address"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!isValidIP(ip)) {
                    alert("Invalid IP address");
                    return;
                  }
                  fetchGeo(ip, true);
                }}
              >
                Search
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  fetchGeo();
                  setIp("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
          {geo && (
            <div className="results-section">
              <div className="results-header">
                <i className="fas fa-circle-info"></i>
                <h3>Results</h3>
              </div>
              <div className="result-item">
                <span className="result-label">IP:</span>
                <span className="result-value">{geo.ip}</span>
              </div>
              <div className="result-item">
                <span className="result-label">City:</span>
                <span className="result-value">{geo.city}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Region:</span>
                <span className="result-value">{geo.region}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Country:</span>
                <span className="country-badge">
                  <span>{geo.country}</span>
                </span>
              </div>
            </div>
          )}

          <div className="history-section">
            <div className="history-header">
              <h3>Search History</h3>
              <button
                className="clear-all-btn"
                onClick={deleteSelected}
                disabled={selected.length === 0}
              >
                Delete Selected
              </button>
            </div>
            <ul>
              {history.map((h, i) => (
                <li key={i} className="history-item">
                  <div className="history-item-content">
                    <i className="fas fa-location-dot"></i>
                    <div
                      className="history-item-text"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() => {
                        setIp(h.ip);
                        fetchGeo(h.ip);
                      }}
                    >
                      <div className="history-ip">{h.ip}</div>
                      {h.city && h.country && (
                        <div className="history-location">
                          {h.city}, {h.country}
                        </div>
                      )}
                    </div>

                    <input
                      type="checkbox"
                      checked={selected.includes(h)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected([...selected, h]);
                        } else {
                          setSelected(
                            selected.filter((item) => item.ip !== h.ip)
                          );
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="map-section">
          {geo?.loc && (
            <MapContainer
              center={location}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <MapUpdater position={location} />

              <Marker position={location}>
                <Popup>
                  {geo.city}, {geo.country}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
