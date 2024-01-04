// Function to generate the WhatsApp message template in plain text
export const generateWhatsAppMessage = async (order) => {
    const customerName = order.customer?.name || '';
    // const date = new Date(order.createdAt).toLocaleDateString();
    const date = `${new Date(order.createdAt).getDay()}/${new Date(order.createdAt).getMonth()+1}/${new Date(order.createdAt).getFullYear()}`;
    const invoiceNo = order.invoiceNo || '';
    const finalPrice = order.orderPrice || 0;
    const note = order.note || '';

    // Create the plain text message template
    let messageTemplate = `Hello ${customerName},\n\tThank you for your order!\n\tDate : ${date}\n\tInvoice No : ${invoiceNo}\n\tFinal Price : ₹ ${finalPrice}\n\t`;

    if (note) {
        messageTemplate += `Note: ${note}\n\n\t`;
    }

    messageTemplate += 'Products:';

    // Add each product to the plain text message
    const productLines = order.products?.map((product, index) => {
        return `\n\t${index + 1}. ${product.productName} - Qty: ${product.quantity} - Price: Rs.${product.price}`;
    });

    const message = `${messageTemplate}${productLines.join('\n')}`;
    return encodeURIComponent(message);
};
