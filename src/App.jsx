import { useState } from "react";
import "./App.css";
import calc from "./assets/images/Vector.svg";

export default function App() {
  const [inputs, setInputs] = useState({
    value: 0,
    yers: 0,
    persent: 0,
    type: "repayment",
  });
  const [sum, setSum] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? e.target.id : value;

    setInputs((prev) => ({
      ...prev,
      [name || "type"]: newValue,
    }));
  };

  const calculate = () => {
    const { value, yers, persent } = inputs;

    if (value > 0 && yers > 0 && persent > 0) {
      const principal = parseFloat(value);
      const annualRate = parseFloat(persent) / 100;
      const time = parseFloat(yers);

      const monthlyRate = annualRate / 12;
      const totalMonths = time * 12;

      const monthlyRepayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

      const totalRepayment = monthlyRepayment * totalMonths;

      setSum(monthlyRepayment.toFixed(2));
      setTotalAmount(totalRepayment.toFixed(2));
    } else {
      alert("Barcha maydonlarni toldirilishi kerak");
    }
  };

  return (
    <>
      <div className="bg-white flex items-center rounded-3xl w-[1100px] mx-auto my-[10%] ">
        <form className="w-[50%] p-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-bold text-[#133041] text-xl">
              Mortage Calculator
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault();
                setInputs({ value: 0, yers: 0, persent: 0 });
                setSum(0);
                setTotalAmount(0);
              }}
              className="text-[#4E6E7E] underline font-medium text-base">
              Clear All
            </button>
          </div>
          <h3 className="mb-3 text-[#4E6E7E] font-medium text-base">
            Mortgage Amount
          </h3>
          <div className="flex items-center border-solid border-[1px] border-[#6B94A8]  rounded-[4px] ">
            <h2 className="px-4 py-[12.5px] h-full rounded rounded-e-none bg-[#E4F4FD] text-xl font-bold text-[#4E6E7E]">
              £
            </h2>
            <input
              name="value"
              value={inputs.value}
              onChange={handleChange}
              type="number"
              className="outline-0 p-4 h-full rounded-md w-[90%]"
              placeholder="Summani kiriting:"
            />
          </div>

          {/* 
          
          
          
          */}

          <div className="flex items-center mt-6 gap-6">
            <div className="w-[48%]">
              <h2 className="mb-3 text-[#4E6E7E] font-medium text-[16px]">
                Mortage Term
              </h2>
              <div className="flex items-center border-solid border-[1px]  border-[#6B94A8]  rounded-[4px] ">
                <input
                  name="yers"
                  value={inputs.yers}
                  onChange={handleChange}
                  type="number"
                  className="outline-0 p-4 h-full rounded-md w-[90%]"
                  placeholder="Yilni kiriting:"
                />

                <h2 className="px-4 py-[12.5px] h-full rounded rounded-s-none bg-[#E4F4FD] text-xl font-bold text-[#4E6E7E]">
                  years
                </h2>
              </div>
            </div>

            {/* 



*/}
            <div className="w-[48%] ">
              <h2 className="mb-3 text-[#4E6E7E] font-medium text-[16px]">
                Interest Rate
              </h2>
              <div className="flex items-center border-solid border-[1px]  border-[#6B94A8]  rounded-[4px] ">
                <input
                  name="persent"
                  value={inputs.persent}
                  onChange={handleChange}
                  type="number"
                  className="outline-0 p-4 h-full w-[90%]"
                  placeholder="Foizni kiriting:"
                />
                <h2 className="px-4 py-[12.5px] h-full rounded rounded-s-none bg-[#E4F4FD] text-xl font-bold text-[#4E6E7E]">
                  %
                </h2>
              </div>
            </div>
          </div>
          <div>
            <h2 className="my-4">Mortgage Type</h2>
            <div className="flex items-center gap-3 mb-3 border-[1px] rounded p-2 bg-[#D8DB2F26]">
              <input type="radio" id="repayment" />
              <label htmlFor="repayment">Repayment</label>
            </div>
            <div className="flex items-center gap-3 border-[1px] rounded p-2">
              <input type="radio" id="interest-only" />
              <label htmlFor="interest-only">Interest Only</label>
            </div>
          </div>

          <button
            onClick={calculate}
            className="btn flex items-center rounded-3xl px-4 justify-center w-[80%] gap-4 bg-[#D8DB2F] p-3 mt-9 text-[#133041] font-bold">
            <img src={calc} alt="calculate img" />
            Calculate Repayments
          </button>
        </form>

        {/* 
        
        
        */}

        <div className="w-[50%] rounded-r-xl rounded-bl-3xl bg-[#133041] pb-[116px] p-5 ">
          <h2 className="text-white font-bold mb-3">Your results</h2>
          <p className="font-medium text-[#9ABED5] w-[95%] mb-8 text-[18px]">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className="bg-[#0E2431] border-4 border-b-0 border-x-0 border-t-[#D8DB2F] p-6 rounded-[2px] w-[95%]">
            <p className="font-medium text-[#9abed5]">
              Your monthly repayments
            </p>
            <h2 className="font-bold text-[#d8db2f] text-[56px]">£ {sum}</h2>
            <div className="border-solid border-[1px] w-full my-6 opacity-25"></div>

            <h4 className="font-medium text-[#9abed5] text-[14px]">
              Total you'll repay over the term
            </h4>
            <h3 className="text-white font-bold text-[22px]">
              £ {totalAmount}
            </h3>
          </div>
        </div>

        {/* 
        
        
        
        */}
      </div>
    </>
  );
}
