import React from 'react';
import './ExpenseForm.css';
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">지출 항목</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            value={charge}
            placeholder="예) 렌트비"
            onChange={handleCharge}></input>
        </div>
        <div className="form-group">
          <label htmlFor="amount"></label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            placeholder="예) 100"
            onChange={handleAmount}></input>
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? '수정' : '제출'}
        <MdSend className="btn-icon"></MdSend>
      </button>
    </form>
  );
};

export default ExpenseForm;
