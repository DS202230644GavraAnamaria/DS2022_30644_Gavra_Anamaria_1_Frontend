const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
const yValues = [55, 49, 44, 24, 15];
const barColors = ["red", "green", "blue", "orange", "brown"];

const riceData = {
    labels: xValues,
    datasets: [{
        backgroundColor: barColors,
        data: yValues
    }]
};

const rice = document.getElementById('myChart').getContext('2d');
new Chart(rice).Line(riceData);