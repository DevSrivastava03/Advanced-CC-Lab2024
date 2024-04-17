document.addEventListener("DOMContentLoaded", function() {
  const calculateButton = document.getElementById('calculateButton');
  calculateButton.addEventListener('click', calculate);
});

function calculate() {
  const incomeInput = document.getElementById('income');
  const income = parseFloat(incomeInput.value);

  if (isNaN(income) || income <= 0) {
    document.getElementById('incomeError').innerText = 'Please enter a valid income amount.';
    return;
  }

  document.getElementById('incomeError').innerText = '';

  const savings = income * 0.4;
  const expenses = income * 0.6;

  const resultDiv = document.getElementById('savings');
  resultDiv.innerHTML = `
    <h2>Financial Overview:</h2>
    <p>Based on your income of $${income.toFixed(2)}, you should save $${savings.toFixed(2)} (40%) and spend $${expenses.toFixed(2)} (60%) on expenses.</p>
  `;

  updateChart(document.getElementById('incomeChart'), savings, expenses);
  updateChart(document.getElementById('savingsChart'), savings, 0);
  updateChart(document.getElementById('expensesChart'), expenses, 0);

  // Show the chart containers after updating the charts
  document.querySelectorAll('.chart-container').forEach(container => {
    container.style.display = 'block';
  });
}

function updateChart(chartContext, value1, value2) {
  const chart = new Chart(chartContext, {
    type: 'doughnut',
    data: {
      labels: ['Savings', 'Expenses'],
      datasets: [{
        label: 'Amount ($)',
        data: [value1, value2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)'
        ],
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5, // Adjust the aspect ratio according to your preference
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
