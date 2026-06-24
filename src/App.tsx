import { useState } from 'react';

// Table Interface
interface Table {
  id: number;
  number: number;
  shape: 'CIRCLE' | 'RECTANGLE';
  status: 'EMPTY' | 'CHECKED_OK' | 'WARNING' | 'CRITICAL';
  timer: string | null;
}

export default function App() {
  //Init Tables Data
  const [tables, setTables] = useState<Table[]>([
    { id: 1, number: 1, shape: 'RECTANGLE', status: 'EMPTY', timer: null },
    { id: 2, number: 2, shape: 'RECTANGLE', status: 'EMPTY', timer: null },
    { id: 3, number: 3, shape: 'RECTANGLE', status: 'EMPTY', timer: null },
    { id: 4, number: 4, shape: 'CIRCLE', status: 'CHECKED_OK', timer: '0:45' },
    { id: 5, number: 5, shape: 'CIRCLE', status: 'WARNING', timer: '2:15' },
    { id: 6, number: 6, shape: 'CIRCLE', status: 'CRITICAL', timer: '6:32' },
  ]);

  // Color Switch
  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'EMPTY': return '#ffffff';
      case 'CHECKED_OK': return '#d1ffd1';
      case 'WARNING': return '#fff3b3';
      case 'CRITICAL': return '#ffb3b3';
      default: return '#ffffff';
    }
  };

  // function Table Click
  const handleTableClick = (id: number) => {
    setTables(tables.map(table => {
      if (table.id === id) {
        // If table.status = EMPTY -> turn WARNING
        // If table.status = CHECKED_OK -> turn EMPTY
        // If table.status = else -> turn CHECKED_OK
        if (table.status === 'EMPTY') {
          return { ...table, status: 'WARNING', timer: '0:00' };
        } else {
          if (table.status === 'CHECKED_OK') {
            return{ ...table, status: 'EMPTY', timer: ''};
          } else {
          return { ...table, status: 'CHECKED_OK', timer: '0:00' };
          }
        }
      }
      return table;
    }));
  };

  // HTML Insert
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#bfbfbf', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '40px', padding: '0 20px' }}>
        <h1 style={{ margin: '0', fontSize: '36px', color: '#000' }}>APin Restaurant Tracker</h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '18px', color: '#000' }}>Real-Time Control Panel</p>
      </header>

      {/* Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '40px 60px', 
        maxWidth: '800px', 
        margin: '0 auto',
        justifyItems: 'center'
      }}>
        {/* Fila Superior: Mesas 6 y 3 */}
        <TableCard table={tables.find(t => t.number === 6)!} getStatusColor={getStatusColor} onClick={handleTableClick} />
        <TableCard table={tables.find(t => t.number === 3)!} getStatusColor={getStatusColor} onClick={handleTableClick} />

        {/* Fila Central: Mesas 5 y 2 */}
        <TableCard table={tables.find(t => t.number === 5)!} getStatusColor={getStatusColor} onClick={handleTableClick} />
        <TableCard table={tables.find(t => t.number === 2)!} getStatusColor={getStatusColor} onClick={handleTableClick} />

        {/* Fila Inferior: Mesas 4 y 1 */}
        <TableCard table={tables.find(t => t.number === 4)!} getStatusColor={getStatusColor} onClick={handleTableClick} />
        <TableCard table={tables.find(t => t.number === 1)!} getStatusColor={getStatusColor} onClick={handleTableClick} />
      </div>
    </div>
  );
}

// Sub-component TableCard
function TableCard({ table, getStatusColor, onClick }: { 
  table: Table; 
  getStatusColor: (status: Table['status']) => string;
  onClick: (id: number) => void; 
}) {
  
  //commonStyle Modification
  const commonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getStatusColor(table.status),
    border: '2px solid #a6a6a6',
    cursor: 'pointer',
    transition: '0.3s ease',
    userSelect: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  };

  // Renderizado condicional basado estrictamente en la FORMA física de la mesa
  const renderShape = () => {
    if (table.shape === 'CIRCLE') {
      return (
        <div onClick={() => onClick(table.id)} style={{
          ...commonStyle,
          width: '180px',
          height: '180px',
          borderRadius: '50%',
        }}>
          <span style={{ fontSize: '32px', color: '#000', fontWeight: '500' }}>
            {table.timer ? table.timer : ''}
          </span>
        </div>
      );
    } else {
      return (
        <div onClick={() => onClick(table.id)} style={{
          ...commonStyle,
          width: '260px',
          height: '160px',
          borderRadius: '4px' // Rectángulo con esquinas ligeramente suavizadas
        }}>
          <span style={{ fontSize: '32px', color: '#000', fontWeight: '500' }}>
            {table.timer ? table.timer : ''}
          </span>
        </div>
      );
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {renderShape()}
      {/* Etiqueta fija abajo de la mesa */}
      <p style={{ margin: '15px 0 0 0', fontSize: '20px', color: '#000', fontWeight: 'bold' }}>
        Table {table.number}
      </p>
    </div>
  );
}