import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddVehicleForm.css';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    annee: '',
    client_id: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseURI + 'api/vehicules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/dashboard'); // Redirige vers le tableau de bord après l'ajout
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors de l\'ajout du véhicule');
      }
    } catch (error) {
      setError('Erreur réseau');
    }
  };

  return (
    <div>
      <h2>Ajouter un Véhicule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Marque:</label>
          <input
            type="text"
            name="marque"
            value={formData.marque}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Modèle:</label>
          <input
            type="text"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Année:</label>
          <input
            type="number"
            name="annee"
            value={formData.annee}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID Client:</label>
          <input
            type="number"
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter Véhicule</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddVehicleForm;