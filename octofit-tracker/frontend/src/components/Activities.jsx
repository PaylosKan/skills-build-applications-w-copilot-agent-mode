import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Activities</h2>
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity.id ?? activity._id ?? `${activity.type}-${activity.date}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{activity.type}</strong>
                  <div className="text-muted">{activity.date}</div>
                </div>
                <span className="badge text-bg-primary rounded-pill">{activity.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activities;
