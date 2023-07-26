module.exports = (temp, product) => {
    let output = temp.replaceAll("{%PRODUCTSNAME%}", product.productName)
        .replaceAll("{%IMAGE%}", product.image)
        .replaceAll("{%PRICE%}", product.price)
        .replaceAll("{%FROM%}", product.from)
        .replaceAll("{%NUTRIENTS%}", product.nutrients)
        .replaceAll("{%QUANTITY%}", product.quantity)
        .replaceAll("{%DESCRIPTION%}", product.description)
        .replaceAll("{%ID%}", product.id);
    if (!product.organic) {
        output = output.replaceAll("{%NOT_ORGANIC%}", 'not-organic');
    }
    return output;
}

