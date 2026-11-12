import React from 'react';
import GestionItems from './Pages/GestionItems';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#1f2937', color: 'white', padding: '16px 24px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Taller CRUD de Imágenes con Spring Boot, React y JWT</h1>
      </header>
      
      <main>
        {/* Aquí montamos nuestra página principal de gestión */}
        <GestionItems />
      </main>
    </div>
  );
}

export default App;