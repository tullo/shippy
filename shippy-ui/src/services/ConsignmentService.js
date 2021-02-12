export async function getConsignments(token) {
  const resource = `http://localhost:8080/shippy.service.consignment/shippingService/getConsignments`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  };

  const response = await fetch(resource, options)
    .then(async (res) => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .catch(async (res) => {
      const error = await res.json();
      return Promise.reject(error);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("error", error);
      return { code: error.Code, detail: error.Detail };
    });

  return response;
}

export async function createConsignment(token, data) {
  const resource = `http://localhost:8080/shippy.service.consignment/shippingService/createConsignment`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(resource, options)
    .then(async (res) => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .catch(async (res) => {
      const error = await res.json();
      // const error = await res.text().then(text => text)
      return Promise.reject(error);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { code: error.Code, detail: error.Detail };
    });

  return response;
}
