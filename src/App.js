import React, { useEffect, useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Coin from "./components/Coin";
import axios from "axios";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  console.log(coins);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // filter coins
  const filterCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <div className="m-2">
      <h1 className="coin-text">Search a currency</h1>
      <form>
        <input
          className="coin-input form-control"
          type="text"
          onChange={handleChange}
          placeholder="Search"
        />
      </form>
      {filterCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
};

export default App;
