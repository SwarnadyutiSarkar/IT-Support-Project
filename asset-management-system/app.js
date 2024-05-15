import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const response = await axios.get('/api/assets');
    setAssets(response.data);
  };

  const createAsset = async () => {
    const response = await axios.post('/api/assets', { name, type, location });
    setAssets([...assets, response.data]);
    setName('');
    setType('');
    setLocation('');
  };

  const deleteAsset = async (id) => {
    await axios.delete(`/api/assets/${id}`);
    setAssets(assets.filter(asset => asset.id !== id));
  };

  return (
    <div>
      <h1>Asset Management System</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={createAsset}>Add Asset</button>
      </div>
      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>
            <span>{asset.name} ({asset.type}) - {asset.location}</span>
            <button onClick={() => deleteAsset(asset.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
