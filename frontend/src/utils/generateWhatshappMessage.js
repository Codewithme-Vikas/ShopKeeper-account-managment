// Function to generate the WhatsApp message template in plain text
export const generateWhatsAppMessage = async (order) => {
    const customerName = order.customer?.name || '';
    const date = new Date(order.createdAt).toLocaleDateString();
    const invoiceNo = order.invoiceNo || '';
    const finalPrice = order.orderPrice || 0;

    // Create the plain text message template
    const messageTemplate = `
        Hello ${customerName},

        Thank you for your order!
        Date: ${date}
        Invoice No: ${invoiceNo}
        Final Price: Rs.${finalPrice}

        Products:
    `;

    // Add each product to the plain text message
    const productLines = order.products?.map((product, index) => {
        return `
            ${index + 1}. ${product.productName} - Qty: ${product.quantity} - Price: Rs.${product.price}
        `;
    });

    const message = `${messageTemplate}${productLines.join('\n')}`;
    return encodeURIComponent(message);
};
