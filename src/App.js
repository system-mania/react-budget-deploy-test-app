import React, { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
const App = () => {
  const [charge, setCharge] = useState('');
  const [id, setId] = useState('');
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      charge: '렌트비',
      amount: 1600,
    },
    {
      id: 2,
      charge: '식비',
      amount: 4000,
    },
    {
      id: 3,
      charge: '커피값',
      amount: 2000,
    },
  ]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: 'danger', text: '항목이 삭제되었습니다.' });
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((expense) => {
          return expense.id === id ? { ...expense, charge, amount } : expense;
        });
        setExpenses(newExpenses);
        handleAlert({ type: 'success', text: '항목이 수정되었습니다.' });
        setEdit(false);
      } else {
        const newExpense = {
          id: crypto.randomUUID(),
          charge: charge,
          amount: amount,
        };
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type: 'success', text: '항목이 추가되었습니다.' });
      }
      setCharge('');
      setAmount(0);
    } else {
      console.log('error');
      handleAlert({
        type: 'danger',
        text: '지출 항목을 입력해주세요.',
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: '모든 항목이 삭제되었습니다.' });
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '1rem',
        }}>
        <ExpenseForm
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}></ExpenseForm>
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '1rem',
        }}>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총지출 :
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};

export default App;
