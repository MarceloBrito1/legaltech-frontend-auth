
import React, { useEffect, useState } from "react";

function App() {
  const [processos, setProcessos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [selecionado, setSelecionado] = useState(null);
  const [dados, setDados] = useState({ andamentos: [], intimacoes: [], documentos: [] });

  useEffect(() => {
    fetch("https://legaltech-backend-mock.onrender.com/processos")
      .then(res => res.json())
      .then(data => setProcessos(data));
  }, []);

  const selecionarProcesso = (numero) => {
    setSelecionado(numero);
    fetch(\`https://legaltech-backend-mock.onrender.com/processos/\${encodeURIComponent(numero)}\`)
      .then(res => res.json())
      .then(data => setDados(data));
  };

  const peticionar = () => {
    alert("Funcionalidade de peticionamento será integrada em breve.");
  };

  const processosFiltrados = processos.filter(p =>
    p.numero.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>📂 Painel de Processos</h2>
      {selecionado ? (
        <div>
          <button onClick={() => setSelecionado(null)}>← Voltar</button>
          <h3>Processo: {dados.numero}</h3>

          <button onClick={peticionar}>📤 Peticionar</button>

          <h4>📩 Intimações</h4>
          <ul>
            {dados.intimacoes.map((i, idx) => (
              <li key={idx}>{i.data} — {i.descricao}</li>
            ))}
          </ul>

          <h4>📜 Andamentos</h4>
          <ul>
            {dados.andamentos.map((a, idx) => (
              <li key={idx}>{a.data} — {a.descricao}</li>
            ))}
          </ul>

          <h4>📎 Documentos</h4>
          <ul>
            {dados.documentos.map((d, idx) => (
              <li key={idx}>{d.nome}</li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <input
            placeholder="🔍 Filtrar por número"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{ marginBottom: 10, padding: 5 }}
          />
          <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Número</th>
                <th>Assunto</th>
                <th>Status</th>
                <th>Abrir</th>
              </tr>
            </thead>
            <tbody>
              {processosFiltrados.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.numero}</td>
                  <td>{p.assunto}</td>
                  <td>{p.status}</td>
                  <td><button onClick={() => selecionarProcesso(p.numero)}>Ver</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
