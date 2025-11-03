const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function getMovements(){
  const res = await fetch(`${API_BASE}/mov`);
  if(!res.ok) throw new Error("Erro ao buscar movimentações");
  return res.json();
}

export async function addMovement(type, amount, description){
  const res = await fetch(`${API_BASE}/mov`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ type, amount, description })
  });
  if(!res.ok) {
    const text = await res.text().catch(()=>null);
    throw new Error("Erro ao adicionar movimentação: " + (text || res.status));
  }
  return res.json();
}

export async function deleteMovement(id) {
  const res = await fetch(`${API_BASE}/mov/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar movimentação");
  return res.json();
}


export default { getMovements, addMovement, deleteMovement };
