
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const ProcessoDetalhes = ({ processo }) => (
  <div className="painel">
    <h2>Processo: {processo.numero}</h2>

    <div className="bloco">
      <h3>📌 Andamentos</h3>
      <ul>{processo.andamentos.map((a, i) => <li key={i}><strong>{a.data}</strong>: {a.descricao}</li>)}</ul>
    </div>

    <div className="bloco">
      <h3>📢 Intimações</h3>
      <ul>{processo.intimacoes.map((i, j) => <li key={j}><strong>{i.data}</strong>: {i.descricao}</li>)}</ul>
    </div>

    <div className="bloco">
      <h3>📎 Documentos</h3>
      <ul>{processo.documentos.map((d, k) => <li key={k}>{d.nome}</li>)}</ul>
    </div>
  </div>
);

const App = () => {
  const [numero, setNumero] = useState('');
  const [processo, setProcesso] = useState(null);
  const [erro, setErro] = useState('');

  const buscarProcesso = async () => {
    try {
      setErro('');
      const resp = await fetch(\`https://legaltech-backend-mock.onrender.com/processos/\${encodeURIComponent(numero)}\`, {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:senha123')
        }
      });
      if (!resp.ok) throw new Error(await resp.text());
      const json = await resp.json();
      setProcesso(json);
    } catch (err) {
      setErro(err.message);
      setProcesso(null);
    }
  };

  return (
    <div className="container">
      <aside className="menu">
        <h1>📁 Banca de Processos</h1>
        <input
          type="text"
          placeholder="Número do processo"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <button onClick={buscarProcesso}>Buscar</button>
        {erro && <p className="erro">Erro: {erro}</p>}
      </aside>

      <main className="conteudo">
        {processo ? <ProcessoDetalhes processo={processo} /> : <p className="placeholder">Digite um número de processo e clique em "Buscar".</p>}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
