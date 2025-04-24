import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    const newExpense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <form onSubmit={handleAddExpense} className="mb-6">
          <input
            type="text"
            placeholder="Expense name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mr-2 w-1/2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded mr-2 w-1/4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Expense</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td className="border p-2">{exp.name}</td>
                <td className="border p-2 text-right">
                  Ksh {exp.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;