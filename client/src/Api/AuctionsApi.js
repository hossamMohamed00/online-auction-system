const url = 'http://localhost:8000/auctions'


const getAuctions = async (url) => {
  const response = await fetch(url);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

// upgoing
// ongoing
// closed

export const getAllAuctions = async () => getAuctions(`${url}?populate=true`)
export const getUpgoingAuctions = async () => getAuctions(`${url}?status=upcoming&populate=true`)
export const getCurrentAuctions = async () => getAuctions(`${url}?status=ongoing&populate=true`)
export const getClosedAuctions = async () => getAuctions(`${url}?status=closed&populate=true`)
export const getSingleAuction = async (auctionId) => getAuctions(`${url}/${auctionId}?populate=true`)


