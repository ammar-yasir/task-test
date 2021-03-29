import { FC, useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Calculator />
    </QueryClientProvider>
  );
}

const Calculator: FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [sum, setSum] = useState<number>();
  const mutation = useMutation(numbersData => axios.post('/add', numbersData))

  const { number1, number2 } = formData;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSum = (e: any) => {
    e.preventDefault();

    const additionData: any = {
      num1: number1,
      num2: number2,
    };

    mutation.mutate(additionData, {
      onSuccess: (data) => {
        setSum(data.data.sum)
      }
    })
  };

  return (
    <>
      <div className="head">
        <span className="head_text">Calculator</span>
      </div>
      <div className="loginBlock">
        <div className="loginBlock_heading">Enter the numbers</div>
        <form onSubmit={handleSum}>
          <div>
            <input
              type="number"
              className="loginBlock_input"
              name="number1"
              placeholder="number 1"
              value={number1}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              className="loginBlock_input"
              name="number2"
              placeholder="number 2"
              value={number2}
              onChange={handleChange}
              required
            />
          </div>
          <button className="loginBlock_sumBtn">
            <span className="loginBlock_sumBtn_text">Sum</span>
          </button>
        </form>
        <hr className="hr" />
        <div className="afterHr_text">
          <span>Results</span>
        </div>
        <div>
          <input
            className="loginBlock_input result_input"
            placeholder="1523"
            value={sum}
            readOnly
          />
        </div>
      </div>
    </>
  );
}
