const url = 'http://localhost:8000/auctions'


export const getAllAuctions = async () => {
  const response = await fetch(url);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const getSingleAuction = async (auctionId) => {
  const response = await fetch(`${url}/${auctionId}`);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}


