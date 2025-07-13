import React, { useState, useEffect } from 'react';

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBugs = async () => {
    setError(null);
    try {
      const res = await fetch('/api/bugs');
      if (!res.ok) throw new Error('Failed to fetch bugs');
      const data = await res.json();
      setBugs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBugs();
    window.addEventListener('bugListUpdate', fetchBugs);
    return () => window.removeEventListener('bugListUpdate', fetchBugs);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bugs/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      window.dispatchEvent(new Event('bugListUpdate'));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBug = async (id) => {
    try {
      const res = await fetch(`/api/bugs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete bug');
      window.dispatchEvent(new Event('bugListUpdate'));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Bug List</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <ul>
        {bugs.map(bug => (
          <li key={bug._id}>
            <strong>{bug.title}</strong> - {bug.description} <br />
            Status: {bug.status}
            <select value={bug.status} onChange={e => updateStatus(bug._id, e.target.value)}>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <button onClick={() => deleteBug(bug._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BugList;
