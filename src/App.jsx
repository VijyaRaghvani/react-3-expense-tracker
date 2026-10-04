import { useState, useEffect } from 'react'
export default function App() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('exp') || '[]'))
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  useEffect(() => localStorage.setItem('exp', JSON.stringify(items)), [items])
  const add = () => {
    if (!title.trim() || !Number(amount)) return
    setItems([{ id: Date.now(), title, amount: Number(amount), type }, ...items]); setTitle(''); setAmount('')
  }
  const income = items.filter(i => i.type === 'income').reduce((a, i) => a + i.amount, 0)
  const expense = items.filter(i => i.type === 'expense').reduce((a, i) => a + i.amount, 0)
  return (
    <div className="box">
      <h1>Expense Tracker</h1>
      <h2>Balance: ₹{income - expense}</h2>
      <div className="sum"><span className="g">Income ₹{income}</span><span className="r">Expense ₹{expense}</span></div>
      <div className="row">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </div>
      <div className="row">
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="expense">Expense</option><option value="income">Income</option></select>
        <button onClick={add}>Add</button>
      </div>
      <ul>{items.map(i => (
        <li key={i.id} className={i.type}><span>{i.title}</span>
          <span>{i.type === 'income' ? '+' : '-'}₹{i.amount}
            <button onClick={() => setItems(items.filter(x => x.id !== i.id))}>✕</button></span></li>))}</ul>
    </div>
  )
}
