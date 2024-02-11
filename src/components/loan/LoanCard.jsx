import React from "react";
import styles from "./LoanCard.module.css";

const LoanCard = ({ farmerName, amount, creditScore, details }) => {
  return (
    <div className={styles.loanCard}>
      <div className={styles.inner}>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{farmerName}</h2>
          <p className={styles.amt}>${amount}</p>
        </div>
        <p className={styles.score}>{creditScore}</p>
      </div>
      <p className={styles.detail}>{details}</p>
      <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md">
        View Proposal
      </button>
      <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md ml-4">
        Reject Proposal
      </button>
    </div>
  );
};

export default LoanCard;
