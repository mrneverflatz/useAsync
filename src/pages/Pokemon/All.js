import React from "react";
import { Link } from "react-router-dom";

import useAsync from "lib/hooks/useAsync";
import { fetch } from "lib/api/pokemon";

function Pokemon() {
  const { isLoading, data, isError, isIdle, run } = useAsync();

  React.useEffect(() => {
    run(fetch());
  }, [run]);

  if (isIdle) return "idling...";

  if (isError)
    return (
      <div className="w-full h-[300px] flex justify-items-center items-center">
        <span>Something went wrong!</span>
      </div>
    );

  if (isLoading) return <div className="mx-auto">Loading</div>;

  if (data.count === 0)
    return (
      <div className="w-full h-[300px] flex justify-items-center items-center">
        <span>Not enough mana!</span>
      </div>
    );

  return (
    <div className="Pokemon">
      {data.results?.map((item) => {
        return (
          <div key={item.name}>
            <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Pokemon;
