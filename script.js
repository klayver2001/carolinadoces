document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#productTable tbody');
    const addProductBtn = document.getElementById('addProductBtn');
    const exportBtn = document.getElementById('exportBtn');

    addProductBtn.addEventListener('click', addProduct);
    exportBtn.addEventListener('click', exportResults);

    function addProduct() {
        const productName = prompt('Digite o nome do produto:');
        const productPrice = parseFloat(prompt('Digite o preço do produto:'));

        if (!productName || isNaN(productPrice)) {
            alert('Por favor, insira um nome e um preço válidos.');
            return;
        }

        const margin = productPrice * 0.22;
        const totalPrice = productPrice + margin;

        const row = tableBody.insertRow();
        row.insertCell(0).textContent = productName;
        row.insertCell(1).textContent = `$${productPrice.toFixed(2)}`;
        row.insertCell(2).textContent = `$${totalPrice.toFixed(2)}`;
        row.insertCell(3).innerHTML = '<i class="fas fa-trash-alt" onclick="deleteProduct(this)"></i>';
    }

    function deleteProduct(row) {
        const rowIndex = row.parentNode.parentNode.rowIndex;
        tableBody.deleteRow(rowIndex);
    }

    function exportResults() {
        const data = [['Produto', 'Preço', 'Margem']];
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowData = [cells[0].textContent, cells[1].textContent, cells[2].textContent];
            data.push(rowData);
        });

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Carolina_Doces');
        XLSX.writeFile(wb, 'Carolina_Doces.xlsx');
    }
});
