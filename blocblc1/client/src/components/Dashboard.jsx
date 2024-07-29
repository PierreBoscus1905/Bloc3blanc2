import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const handleAddVehicleClick = () => {
    navigate('/add-vehicle'); // Redirige vers la page du formulaire
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseURI}api/vehicules/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Mettre à jour la liste des véhicules en supprimant l'élément supprimé
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      } else {
        alert('Erreur lors de la suppression du véhicule');
      }
    } catch (error) {
      alert('Erreur réseau lors de la suppression du véhicule');
    }
  };

  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        const response = await fetch(`${baseURI}api/clients/count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setClientCount(data.count);
        } else {
          alert('Erreur lors de la récupération du nombre de clients');
          navigate('/');
        }
      } catch (error) {
        alert('Erreur réseau');
        navigate('/');
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${baseURI}api/vehicules`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        } else {
          alert('Erreur lors de la récupération des véhicules');
        }
      } catch (error) {
        alert('Erreur réseau');
      }
    };

    fetchClientCount();
    fetchVehicles();
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h2>Tableau de bord admin</h2>
      <p>Nombre de clients inscrits : {clientCount}</p>
      <button onClick={handleAddVehicleClick}>Ajouter un Véhicule</button>
      <h3>Liste des véhicules</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Année</th>
            <th>Client</th>
            <th></th> {/* Colonne vide pour les boutons de suppression */}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.marque}</td>
              <td>{vehicle.modele}</td>
              <td>{vehicle.annee}</td>
              <td>{vehicle.client_nom}</td>
              <td>
                <button onClick={() => handleDelete(vehicle.id)} className="delete-button">
                  ✗
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
