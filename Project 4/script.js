function fetchExchangeRate(base, target) {
    return fetch(`https://api.polygon.io/v1/open-close/${base}/${target}/latest?apiKey=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { open, close } = data;
            return { base, target, exchangeRate: close }; // Assuming 'close' represents the current exchange rate
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            return null;
        });
}
