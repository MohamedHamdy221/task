

let clients = [];
        let filteredClients = [];

        fetch('/api/clients')
            .then(response => response.json())
            .then(data => {
                clients = data;
                filteredClients = clients;
                displayClients();
                drawChart();
            });

        function displayClients() {
            const tableBody = document.getElementById('clientsTableBody');
            tableBody.innerHTML = '';

            filteredClients.forEach(client => {
                client.transactions.forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td> ${client.name}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.date}</td>
                    `;
                    tableBody.appendChild(row);
                });
            });
        }

        function filterClients() {
            const clientFilter = document.getElementById('clientFilter').value.toLowerCase();
            const transactionFilter = parseFloat(document.getElementById('transactionFilter').value);

            filteredClients = clients.filter(client => {
                return client.name.toLowerCase().includes(clientFilter) && client.transactions.some(transaction => {
                    return isNaN(transactionFilter) || transaction.amount >= transactionFilter;
                });
            });

            displayClients();
            drawChart();
        }

        function drawChart() {
            const ctx = document.getElementById('transactionChart').getContext('2d');
            const clientNames = filteredClients.map(client => client.name);
            const transactionAmounts = filteredClients.map(client => client.transactions.reduce((sum, transaction) => sum + transaction.amount, 0));

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: clientNames,
                    datasets: [{
                        label: 'Total Transaction Amount',
                        data: transactionAmounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }


clients = [
    {"id": 1, "name": "Ahmed Ali", "transactions": [
        {"id": 1, "amount": 1000, "date": "2022-01-01",},
    ]},
    {"id": 2, "name": "Aya Elsayed", "transactions": [
        {"id": 1, "amount": 2000, "date": "2022-01-02",},
        
    ]},
    {"id": 3, "name": "Mina Adel", "transactions": [
        {"id": 2, "amount": 550, "date": "2022-01-01",},
        
    ]},
    {"id": 4, "name": "Sarah Reda", "transactions": [
        {"id": 3, "amount": 500, "date":"2022-01-01",},
        
    ]},
    {"id": 5, "name": "Mohamed Sayed", "transactions": [
        {"id": 2, "amount": 1300, "date": "2022-01-02",},
        
    ]},
    {"id": 6, "name": "Mohamed Hamdy", "transactions": [
        {"id": 4, "amount":750, "date": "2022-01-01",},
        
    ]},
    {"id": 7, "name": "Ahmed Mohamed", "transactions": [
        {"id": 3, "amount": 1250, "date": "2022-01-02",},
        
    ]},
    {"id": 8, "name": "Mostafa Rogdy", "transactions": [
        {"id": 5, "amount": 2500, "date": "2022-01-01",},
        
    ]},
    {"id": 9, "name": "Charlie", "transactions": [
        {"id": 5, "amount": 875, "date": "2022-01-02",},
        
    ]},
]



