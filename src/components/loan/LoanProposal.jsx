import React from "react";
import LoanCard from "./LoanCard";
import styles from "./LoanProposal.module.css";

const LoanProposal = () => {
  // Sample data for loan proposals
  const loanProposalsData = [
    {
      id: 1,
      farmerName: "John Doe",
      amount: 5000,
      creditScore: 750,
      details: "Expanding my farm to grow more crops",
    },
    {
      id: 2,
      farmerName: "Jane Smith",
      amount: 8000,
      creditScore: 720,
      details: "Investing in sustainable farming practices",
    },
    {
      id: 2,
      farmerName: "Jane Smith",
      amount: 8000,
      creditScore: 720,
      details: "Investing in sustainable farming practices",
    },
    {
      id: 2,
      farmerName: "Jane Smith",
      amount: 8000,
      creditScore: 720,
      details: "Investing in sustainable farming practices",
    },
    {
      id: 2,
      farmerName: "Jane Smith",
      amount: 8000,
      creditScore: 720,
      details: "Investing in sustainable farming practices",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">Loan Proposals</h1>
      <div className={styles.loanCards}>
        {loanProposalsData.map((proposal) => (
          <LoanCard key={proposal.id} {...proposal} />
        ))}
      </div>
    </div>
  );
};

export default LoanProposal;
