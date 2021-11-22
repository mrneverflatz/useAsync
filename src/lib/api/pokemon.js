import axios from "lib/configs/axios";

export const fetch = (params = "?limit=100&offset=200", headers = {}) =>
  axios({
    url: `/api/v2/pokemon${params}`,
    method: "GET",
    headers,
  });
