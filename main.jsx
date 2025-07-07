import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [numero, setNumero] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  const buscarProcesso = async () => {
    try {
      setErro('');
      const response = await fetch(`https://legaltech-backend-mock.onrender.com/processos/${encodeURIComponent(numero)}`, {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:senha123')
        }
      });
      if (!response.ok) throw new Error(await response.text());
      const json = await response.json();
      setDados(json);
    } catch (err) {
      setErro(err.message);
      setDados(null);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 24 }}>
      <h1>Consulta de Processo</h1>
      <input
        placeholder="Digite o número do processo"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        style={{ width: 320, padding: 8 }}
      />
      <button onClick={buscarProcesso} style={{ marginLeft: 12, padding: 8 }}>Buscar</button>

      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}

      {dados && (
        <div style={{ marginTop: 24 }}>
          <h2>Processo {dados.numero}</h2>

          <h3>Andamentos</h3>
          <ul>{dados.andamentos.map((a, i) => <li key={i}>{a.data}: {a.descricao}</li>)}</ul>

          <h3>Intimações</h3>
          <ul>{dados.intimacoes.map((i, j) => <li key={j}>{i.data}: {i.descricao}</li>)}</ul>

          <h3>Documentos</h3>
          <ul>{dados.documentos.map((d, k) => <li key={k}>{d.nome}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);