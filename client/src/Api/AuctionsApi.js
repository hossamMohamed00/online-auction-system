const url = 'http://localhost:8000/auctions'




export const getCurrentAuctions = async () => {
  const response = await fetch(`${url}?status=accepted&populate=true` );
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const getSingleAuction = async (auctionId) => {
  const response = await fetch(`${url}/${auctionId}?populate=true`);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}


