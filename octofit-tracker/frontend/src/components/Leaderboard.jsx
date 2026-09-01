import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Leaderboard</h2>
        <div className="list-group">
          {entries.map((entry) => (
            <div key={entry.rank ?? entry.name} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge text-bg-dark me-3">#{entry.rank ?? 0}</span>
                {entry.name}
              </div>
              <strong>{entry.points ?? entry.score ?? 0} pts</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
