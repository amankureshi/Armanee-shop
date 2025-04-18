// For add item to cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};
//Fot Delete item From Cart
export const delItem = (product) => {
  console.log(product);

  return {
    type: "DELITEM",
    payload: product,
  };
};
