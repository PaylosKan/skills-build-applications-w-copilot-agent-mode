import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Teams</h2>
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team.id ?? team._id ?? team.name} className="col-md-6 col-xl-4">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Members:</strong> {team.members ?? 0}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Wins:</strong> {team.wins ?? 0}
                  </p>
                  <p className="card-text mb-0">
                    <strong>Sport:</strong> {team.sport ?? 'Fitness'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
