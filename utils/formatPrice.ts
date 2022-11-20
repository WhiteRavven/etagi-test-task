export default function formatPrice(price:number) {
    let formatCurrency = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    });
    return formatCurrency.format(price);
}