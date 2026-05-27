
export default async function carsData ({search}) {
const data = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/cars${search ? `?search=${search}` : ""}`,
);
  const car = await data.json()
  return car
}


export const carDetails = async ({id,token}) => {

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
  method: "GET",
  headers: {
    authorization: `Bearer ${token}`,
  },
});
  const car = await res.json()
  return car;
}
export const getBookings = async ({userId,token}) => {
const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/booking/${userId}`,
  {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
);
  const bookings = await res.json()
  return bookings;
}

export const getAddedCars = async ({userId}) => {
const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/added-cars/${userId}`,
);
  const cars = await res.json()
  return cars;
}
export const deleteCar = async ({_id,token}) => {
const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/added-cars/${_id}`,
  {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
);
  return res;
}
export const featureCar = async () =>  {
 
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-cars`);
  const cars = await res.json()
  return cars;
}



