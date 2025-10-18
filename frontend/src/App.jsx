import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");          // User input
  const [shortUrl, setShortUrl] = useState(""); // Full short URL from backend
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send long URL to backend
      const res = await axios.post("http://localhost:8001/url", { url });

      // Backend returns full shortUrl
      setShortUrl(res.data.shortUrl); // <-- fetch it directly

      setUrl(""); // Clear input
    } catch (err) {
      console.error("Axios error:", err.response ? err.response.data : err.message);
      setError("Error generating short URL. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔗 URL Shortener</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {shortUrl && (
        <div style={styles.result}>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px", fontFamily: "Arial" },
  form: { display: "flex", justifyContent: "center", gap: "10px" },
  input: { width: "400px", padding: "8px" },
  button: { padding: "8px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  result: { marginTop: "20px" },
  error: { color: "red", marginTop: "10px" },
};
