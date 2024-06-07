import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Import the plugin

const ChartComponent = ({ symbol, strikePrice, expiryDate }) => {
  console.log(symbol, strikePrice, expiryDate);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(symbol, strikePrice, expiryDate);
        const url = `${process.env.REACT_APP_API_URL}/api/option-data?symbol=${symbol}&strikeprice=${strikePrice}&expiryDate=${expiryDate}`;
        const response = await axios.get(url);
        const data = response.data;
        console.log({ data });
        const chartdata = data.map(record => ({
          symbol: record.symbol,
          strikePrice: record.finaldata.map(record => record.strikePrice),
          CE: record.finaldata
            .map(record => record.CE)
            .filter(x => x !== undefined),
          PE: record.finaldata
            .map(record => record.PE)
            .filter(x => x !== undefined),
        }));
        console.log('chartdata', chartdata);

        setChartData(chartdata);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching option data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Update data every 2 minutes
    const intervalId = setInterval(fetchData, 2 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [symbol, strikePrice, expiryDate]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      chartData.forEach((record, index) => {
        const ctx = chartRefs.current[index].getContext('2d');

        // Destroy existing chart if it exists
        if (ctx.chart) {
          ctx.chart.destroy();
        }

        // Create new chart instance
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: record.strikePrice.map(strikePrice =>
              strikePrice.toString()
            ),
            datasets: [
              {
                label: 'CE',
                data: record.CE.map(ceItem => ceItem.openInterest),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'lightgreen',
                tension: 0.1,
              },
              {
                label: 'PE',
                data: record.PE.map(peItem => peItem.openInterest),
                fill: false,
                borderColor: 'rgb(192, 75, 192)',
                backgroundColor: 'rgba(192, 75, 75, 0.2)',
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                ticks: {
                  suggestedMax: 1000,
                  precision: 0,
                },
              },
            },
            plugins: {
              datalabels: {
                display: true,
                color: 'black',
                font: {
                  weight: 'bold',
                },
              },
            },
            responsive: true,
          },
        });
      });
    }
  }, [chartData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!chartData) {
    return (
      <div className="text-white">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mb-4 text-opacity-30 text-white">
        Option Charts
      </h2>
      {chartData.map((record, index) => (
        <div key={index} className="mb-4">
          <canvas ref={el => (chartRefs.current[index] = el)}></canvas>
        </div>
      ))}
    </div>
  );
};

export default ChartComponent;
