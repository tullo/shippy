export async function signupUser(data) {
  const resource = `http://localhost:8080/shippy.service.user/userService/create`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
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
      return { code: error.Code, detail: error.Detail };
    });

  return response;
}

export async function loginUser(data) {
  const resource = `http://localhost:8080/shippy.service.user/userService/auth`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
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
