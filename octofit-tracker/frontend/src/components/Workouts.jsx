import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Workouts</h2>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout.id ?? workout._id ?? workout.title} className="col-md-6 col-xl-4">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Difficulty:</strong> {workout.difficulty}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Focus:</strong> {workout.focus}
                  </p>
                  <p className="card-text mb-0">
                    <strong>Duration:</strong> {workout.duration} min
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

export default Workouts;
