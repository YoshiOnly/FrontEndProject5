class currencyDisplay {
    static currencyInEUR(value) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value/100);
    }
}