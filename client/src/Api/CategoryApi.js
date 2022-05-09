const url = 'http://localhost:8000/categories'


export const getAllCategories = async () => {
  const response = await fetch(url);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const getCategoryAuctions = async (id) => {
  const response = await fetch(`${url}/${id}/auctions?populate=true`);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}


