import { useEffect, useState } from "react";
import FormTransaction from "./FormTransaction";
import { getMovements, addMovement,deleteMovement } from "../services/api";

export default function Dashboard(){
  const [movements, setMovements] = useState([]);
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    try{
      const data = await getMovements();
      setMovements(data);
    }catch(err){
      console.error(err);
      alert("Erro ao carregar movimentações. Veja console.");
    }
  }

  useEffect(()=>{ load(); }, []);

  const handleNewTransaction = async () => {
    if(!amount) return alert("Preencha o valor");
    try{
      const newMov = await addMovement(type, Number(amount), description);
      setMovements(prev => [...prev, newMov]);
      setAmount(""); setDescription("");
    }catch(err){
      console.error(err);
      alert("Erro ao cadastrar.");
    }
  }

  const totalIn = movements.filter(m => m.type === 'deposit').reduce((s, m) => s + Number(m.amount), 0);
  const totalOut = movements.filter(m => m.type === 'withdraw').reduce((s, m) => s + Number(m.amount), 0);
  const balance = totalIn - totalOut;

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{display:'flex', gap:12, marginBottom:12}}>
        <div className="card" style={{flex:1}}>
          <h3>Saldo</h3>
          <p>R$ {balance.toFixed(2)}</p>
        </div>
        <div className="card" style={{width:200}}>
          <h4>Entradas</h4>
          <p>R$ {totalIn.toFixed(2)}</p>
        </div>
        <div className="card" style={{width:200}}>
          <h4>Saídas</h4>
          <p>R$ {totalOut.toFixed(2)}</p>
        </div>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <FormTransaction
          handleChangeTitle={setDescription}
          handleChangePrice={setAmount}
          handleChangeCategory={()=>{}}
          handleClickTransactionType={setType}
          transactionType={type}
          handleNewTransaction={handleNewTransaction}
          formTitle="Nova transação"
          buttonText="Adicionar"
          titleValue={description}
          priceValue={amount}
          categoryValue=""
        />
      </div>

      <div className="card">
        <h3>Transações</h3>
        <ul>
          {movements.map(m => (
            <li key={m.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
  <span>
    [{m.type}] {m.description} - R$ {Number(m.amount).toFixed(2)} 
    <small>({new Date(m.createdAt).toLocaleString()})</small>
  </span>
  <button 
    style={{color:'red', marginLeft:8}}
    onClick={async ()=>{
      if(!confirm("Deseja realmente excluir esta transação?")) return;
      try{
        await deleteMovement(m.id); // função do api.js
        setMovements(prev => prev.filter(x => x.id !== m.id)); // remove do estado
      }catch(err){
        console.error(err);
        alert("Erro ao deletar");
      }
    }}
  >
    X
  </button>
</li>

          ))}
        </ul>
      </div>
    </div>
  )
}
