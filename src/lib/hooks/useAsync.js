import React from "react";

import useSafeDispatch from "./useSafeDispatch";

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer((s, a) => {
    return { ...s, ...a };
  }, initialStateRef.current);

  const safeSetState = useSafeDispatch(setState);
  // console.log(status, data, error);

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: "pending" });
      return promise
        .then((response) => {
          const ok = [200, 201, 204];

          if (!ok.includes(response?.status))
            throw new Error(
              JSON.stringify(response?.data) ?? "Something went wrong"
            );

          safeSetState({ data: response?.data, status: "resolved" });
          return response.data;
        })
        .catch((error) => {
          if (error === "cancel") return;

          safeSetState({
            status: "rejected",
            error: error.response
              ? error.response
              : typeof error.message === "object"
              ? JSON.parse(error.message)
              : error.message,
          });
          throw error;
        });
    },
    [safeSetState]
  );

  const setData = React.useCallback(
    (data) => safeSetState({ data }),
    [safeSetState]
  );
  const setError = React.useCallback(
    (error) => safeSetState({ error }),
    [safeSetState]
  );
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export default useAsync;
