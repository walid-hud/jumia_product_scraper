function vaalidate_jumia_product(product: any): boolean {
    if (typeof product !== 'object' || product === null) {
        return false;
    }

    const requiredStringFields = ['name', 'price'];
    const optionalStringFields = ['url', 'image', 'brand', 'category'];

    for (const field of requiredStringFields) {
        if (typeof product[field] !== 'string') {
            return false;
        }
    }

    for (const field of optionalStringFields) {
        if (product[field] !== undefined && typeof product[field] !== 'string') {
            return false;
        }
    }

    return true;
}
export { vaalidate_jumia_product };