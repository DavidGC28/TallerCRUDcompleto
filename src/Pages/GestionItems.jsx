import React, { useState, useEffect } from 'react';
import ListaItems from '../components/ListaItems';

export default function GestionItems() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [foto, setFoto] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  // URL base de tu API Spring Boot
  const API_URL = 'http://localhost:8080/auth/items';

  // Obtener la lista al cargar el componente
  const cargarItems = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
    }
  };

  useEffect(() => {
    cargarItems();
  }, []);

  // Manejar envío del formulario (Crear o Actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('especie', especie);
    if (foto) {
      formData.append('foto', foto);
    }

    try {
      let response;
      if (editandoId) {
        // Petición PUT para actualizar
        response = await fetch(`${API_URL}/${editandoId}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Petición POST para crear
        response = await fetch(API_URL, {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        limpiarFormulario();
        cargarItems();
      } else {
        alert('Error al guardar la mascota');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (item) => {
    setEditandoId(item.id);
    setNombre(item.nombre);
    setEspecie(item.especie);
    setFoto(null); // La foto es opcional al editar
  };

  // Eliminar elemento
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta mascota?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        cargarItems();
      } else {
        alert('No se pudo eliminar');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const limpiarFormulario = () => {
    setEditandoId(null);
    setNombre('');
    setEspecie('');
    setFoto(null);
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>{editandoId ? 'Editar Mascota' : 'Registrar Nueva Mascota'}</h2>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: '8px', flex: '1' }}
        />
        <input
          type="text"
          placeholder="Especie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
          style={{ padding: '8px', flex: '1' }}
        />
        <input
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px' }}>
          {editandoId ? 'Actualizar' : 'Guardar'}
        </button>
        {editandoId && (
          <button type="button" onClick={limpiarFormulario} style={{ padding: '8px 16px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}>
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h2>Listado de Mascotas</h2>
      <ListaItems items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}