const dataToSocket = (image, product, price) => {
  const fileSubstring = image.lastIndexOf('\\');
  const pictureName = image.substring(fileSubstring + 1);
  return {
    product: product,
    price: +price,
    thumbnail: pictureName,
  };
};

const dataToDataBase = (image, product, price) => {
  const dataToPost = new FormData();
  dataToPost.append('image', image[0]);
  dataToPost.append('productName', product);
  dataToPost.append('price', price);
  return dataToPost;
};

const renderProductsOnTable = async (data, port) => {
  console.log(data);
  console.log(port);
  const response = await fetch(`http://localhost:${port}/mainApp/hbs/products.handlebars`);
  const template = await response.text();
  const dataCompile = Handlebars.compile(template);
  const result = dataCompile({
    data,
    isEmpty: data.length === 0 ? true : false,
  });
  return result;
};

export { dataToSocket, dataToDataBase, renderProductsOnTable };
