const xlables = [];
const ylabels= [];
chartIt();

async function chartIt() {
  await getData();

const ctx = document.getElementById("lineChart");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xlables,
    datasets: [
      {
        label: "Global Average Temperatures",
        data: ylabels,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  },
});
}

async function getData() {
  const response = await fetch("../js/kit/GlobalTemp.csv");
  const data = await response.text();

  const table = data.split("\n").slice(1);
  table.forEach((elt) => {
    const columns = elt.split(",");
    const year = columns[0];
    xlables.push(year);
    const temp = columns[1];
    ylabels.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
}