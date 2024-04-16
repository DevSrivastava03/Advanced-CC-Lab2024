document.addEventListener("DOMContentLoaded", function() {
  calculate(); 
});

function calculate() {
const incomeInput = document.getElementById('income');
const income = parseFloat(incomeInput.value);

if (isNaN(income) || income <= 0) {
  incomeInput.classList.add('error');
  incomeInput.nextElementSibling.innerText = 'Please enter a valid income amount.';
  return;
}

incomeInput.classList.remove('error');
incomeInput.nextElementSibling.innerText = '';

const savings = income * 0.4;
const expenses = income * 0.6;

const resultDiv = document.getElementById('savings');
resultDiv.innerHTML = `
  <h2>Financial Overview:</h2>
  <p>Based on your income of $${income.toFixed(2)}, you should save $${savings.toFixed(2)} (40%) and spend $${expenses.toFixed(2)} (60%) on expenses.</p>
`;

updateChart(document.getElementById('incomeChart'), income, 0, 'rgba(75, 192, 192, 0.8)', 'rgba(255, 255, 255, 0.1)');
updateChart(document.getElementById('savingsChart'), savings, 0, 'rgba(255, 99, 132, 0.8)', 'rgba(255, 255, 255, 0.1)');
updateChart(document.getElementById('expensesChart'), expenses, 0, 'rgba(255, 206, 86, 0.8)', 'rgba(255, 255, 255, 0.1)');
}

function updateChart(chartContext, value1, value2, color1, color2) {
const chart = new Chart(chartContext, {
  type: 'doughnut',
  data: {
    labels: ['Value 1', 'Value 2'],
    datasets: [{
      label: 'Amount ($)',
      data: [value1, value2],
      backgroundColor: [
        color1,
        color2
      ],
      borderColor: 'rgba(255, 255, 255, 0)', // Transparent border
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: true
    },
    animation: {
      animateRotate: true,
      animateScale: true
    },
    elements: {
      arc: {
        borderColor: '#000000'
      }
    }
  }
});
}
