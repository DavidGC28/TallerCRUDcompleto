import React from 'react';

export default function ListaItems({ items, onEdit, onDelete }) {
  return (
    <div className="cards-grid">
      {items.map((item) => {
        
        let imageUrl = '';
        if (item.foto) {
          const uint8Array = new Uint8Array(item.foto);
          const blob = new Blob([uint8Array], { type: item.mimeType || 'image/jpeg' });
          imageUrl = URL.createObjectURL(blob);
        }

        return (
          <div className="card" key={item.id}>
            {imageUrl ? (
              <img src={imageUrl} alt={item.nombre} className="card-img" />
            ) : (
              <div className="card-img-placeholder">Sin imagen</div>
            )}
            <div className="card-body">
              <h3>{item.nombre}</h3>
              <p><strong>Especie:</strong> {item.especie}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => onEdit(item)}>Editar</button>
                <button className="btn-delete" onClick={() => onDelete(item.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}