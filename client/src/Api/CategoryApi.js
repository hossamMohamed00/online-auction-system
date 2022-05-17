const url = 'http://localhost:8000/categories'

const getCategories = async (url) => {
	const response = await fetch(url);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const getAllCategories = async () => getCategories(`${url}`)
export const getCategoryAuctions = async (id) => getCategories(`${url}/${id}/auctions?populate=true`)


