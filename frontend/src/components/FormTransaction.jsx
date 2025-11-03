import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";

export default function FormTransaction({
  handleChangeCategory,
  handleChangePrice,
  handleChangeTitle,
  handleClickTransactionType,
  transactionType,
  handleNewTransaction,

  formTitle = "Cadastrar transação",
  buttonText = "Cadastrar",

  titleValue = "",
  priceValue = "",
  categoryValue = "",
}) {
  return (
    <div>
      <h2>{formTitle}</h2>
      <div style={{display:'grid', gap:8}}>
        <input placeholder="Descrição" value={titleValue} onChange={(e)=>handleChangeTitle(e.target.value)} />
        <input placeholder="Preço" value={priceValue} onChange={(e)=>handleChangePrice(e.target.value)} type="number" step="0.01" />
        <div style={{display:'flex', gap:8}}>
          <button type="button" onClick={()=>handleClickTransactionType('deposit')} className={transactionType==='deposit'?'btn-emerald':''}>
            <ArrowCircleUp size={18}/> Entrada
          </button>
          <button type="button" onClick={()=>handleClickTransactionType('withdraw')} className={transactionType==='withdraw'?'btn-emerald':''}>
            <ArrowCircleDown size={18}/> Saída
          </button>
        </div>
        <input placeholder="Categoria" value={categoryValue} onChange={(e)=>handleChangeCategory(e.target.value)} />
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <button onClick={handleNewTransaction} className="btn-emerald">{buttonText}</button>
        </div>
      </div>
    </div>
  );
}
