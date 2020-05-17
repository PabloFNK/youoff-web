const errorHandler = async (response) => {
  if (!response.ok) {
    const { errorMessage } = await response.json();
    throw new Error(errorMessage);
  }
  return response;
};

export const get = (url, options) =>
  fetch(url, options).then((response) => errorHandler(response));
