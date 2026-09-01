import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Users</h2>
        <div className="row g-3">
          {users.map((user) => (
            <div key={user.id ?? user._id ?? user.email} className="col-md-6 col-xl-4">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Team:</strong> {user.team ?? 'Unassigned'}
                  </p>
                  <p className="card-text mb-0">
                    <strong>Streak:</strong> {user.streak ?? 0} days
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

export default Users;
