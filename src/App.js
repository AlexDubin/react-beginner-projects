import React from "react";


import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("UAH");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [rates, setRates] = React.useState({});

const API_KEY = 'zNPLSi7oZJA0Hz2Ijz2B7N7FS4CvUvTn';

React.useEffect(() => {
  const requestOptions = {
    method: "GET",
    headers: {
      apikey: API_KEY,
    },
  };

  fetch(
    "https://api.apilayer.com/currency_data/change?start_date=start_date&end_date=end_date",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setRates(result);
      console.log(result);
    })
    .catch((error) => {
      console.warn(error);
      alert("Не удалось получить информацию!");
    });
}, []);
  


 const onChangeFromPrice = (value) => {
   if (!rates || typeof rates !== "object") {
     return;
   }

   const fromRate = rates[fromCurrency];
   const toRate = rates[toCurrency];

   if (!fromRate || !toRate) {
     return;
   }

   const price = value / fromRate;
   const result = price * toRate;
   setToPrice(result);
   setFromPrice(value);
 };

 const onChangeToPrice = (value) => {
   if (!rates || typeof rates !== "object") {
     return;
   }

   const fromRate = rates[fromCurrency];
   const toRate = rates[toCurrency];

   if (!fromRate || !toRate) {
     return;
   }

   const price = value / toRate;
   const result = price * fromRate;
   setFromPrice(result);
   setToPrice(value);
 };


  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
