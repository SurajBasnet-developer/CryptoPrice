import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";

const CoinList = () => {
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);

  const { isLoading, error, data } = useQuery(["coins", search], () =>
    fetch(`https://api.coincap.io/v2/assets?search=${search}`)
      .then((res) => res.json())
      .then((data) => data.data)
  );

  const {
    isLoading: isLoadingPrice,
    error: errorPrice,
    data: dataPrice,
  } = useQuery(
    ["price", selectedCoin],
    () =>
      fetch(`https://api.coincap.io/v2/assets/${selectedCoin}`)
        .then((res) => res.json())
        .then((data) => data.data.priceUsd),
    {
      enabled: !!selectedCoin,
    }
  );
  const handleSearch = () => {
    e.preventDefault();
    setSelectedCoin(data[0].id);
  };

  if (isLoading) return <p>Loading.... </p>;
  if (error) return <p>Error: {error.message} </p>;
  return (
    <Card direction={{ base: "column", sm: "row" }} overflow="visible">
      <CardBody>
        <div>
          <div>
            <form onSubmit={handleSearch}>
              <Input
                size="md"
                type="text"
                placeholder="Search Coin"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}

          {data && (
            <div>
              <ul>
                {data
                  .filter((coin) =>
                    coin.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((coin) => (
                    <li key={coin.id} onClick={() => setSelectedCoin(coin.id)}>
                      {coin.name} ({coin.symbol})
                    </li>
                  ))}
              </ul>
              {selectedCoin && (
                <>
                  <h2>Price of {selectedCoin}</h2>
                  {isLoadingPrice && <div>Loading....</div>}
                  {errorPrice && <div>Error: {errorPrice.message}</div>}
                  {dataPrice && <div>${dataPrice}</div>}
                </>
              )}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CoinList;
