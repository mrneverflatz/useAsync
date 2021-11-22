import React from "react";
import { Link, useParams } from "react-router-dom";

import useAsync from "lib/hooks/useAsync";
import { fetch } from "lib/api/pokemon";

function Pokemon() {
  const params = useParams();

  const { isLoading, data, isError, isIdle, run } = useAsync();

  React.useEffect(() => {
    run(fetch(params.id ? `/${params.id}` : undefined));
  }, [run, params.id]);

  if (isIdle) return "idling...";

  if (isLoading) return <div className="mx-auto">Loading</div>;

  if (!data || isError)
    return (
      <div className="w-full h-[300px] flex justify-items-center items-center">
        <span>Something went wrong</span>
      </div>
    );

  return (
    <div>
      <h6>
        <Link to="/pokemon">{"<="} Back </Link>
      </h6>
      {JSON.stringify(data)}
    </div>
  );
}

export default Pokemon;
