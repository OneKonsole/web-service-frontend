import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import {getCPUUsage, getMemoryUsage} from "@utils/monitoring.ts";
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const Index: React.FC = () => {

    const [cpuData, setCpuData] = React.useState(null);
    const [memoryData, setMemoryData] = React.useState(null);
    const [cpuLoading, setCpuLoading] = React.useState(true);
    const [memoryLoading, setMemoryLoading] = React.useState(true);

    React.useEffect(() => {
        getMemoryUsage().then(r => {
                setMemoryData(r.data)
                setMemoryLoading(false)
            }
        );
        getCPUUsage().then(r => {
            setCpuData(r.data);
            setCpuLoading(false);
        });

    }, []);

    return (
        <PanelLayout>
            <h1 className="text-2xl font-semibold text-gray-900 ml-4 my-4">Monitoring</h1>
            <div className="flex flex-wrap -mx-2">
                {memoryLoading ? (
                    <p>Loading Memory Data...</p>
                ) : (
                    <div className="w-1/2 px-4 mb-4 h-[200px]">
                        <MemoryUtilisationGraph key={JSON.stringify(memoryData)} data={memoryData}/>
                    </div>
                )}
                {cpuLoading ? (
                    <p>Loading CPU Data...</p>
                ) : (
                    <div className="w-1/2 px-2 mb-4 h-[200px]">
                        <CPUUtilisationGraph key={JSON.stringify(cpuData)} data={cpuData}/>
                    </div>
                )}
            </div>
        </PanelLayout>

    );
}

const MemoryUtilisationGraph = ({data}) => {
    // Prepare the datasets
    const datasets = data.result.map(item => {
        const label = item.metric.instance; // Using instance as the label
        const borderColor = getRandomColor(); // Function to generate a random color for each dataset
        const dataPoints = item.values.map(value => ({
            x: new Date(value[0] * 1000), // Convert Unix timestamp to JavaScript Date object
            y: parseFloat(value[1])        // Memory utilisation value
        }));

        return {
            label,
            data: dataPoints,
            borderColor,
            fill: false
        };
    });

    // Chart configuration
    const chartData = {
        datasets
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Memory Utilisation Ratio'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return <Line data={chartData} options={options}/>;
};

const CPUUtilisationGraph = ({data}) => {
    // Prepare the datasets
    const datasets = data.result.map(item => {
        const label = item.metric.instance; // Using instance as the label
        const borderColor = getRandomColor(); // Function to generate a random color for each dataset
        const dataPoints = item.values.map(value => ({
            x: new Date(value[0] * 1000), // Convert Unix timestamp to JavaScript Date object
            y: parseFloat(value[1])        // CPU utilisation value
        }));

        return {
            label,
            data: dataPoints,
            borderColor,
            fill: false
        };
    });

    // Chart configuration
    const chartData = {
        datasets
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CPU Utilisation Ratio'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return <Line data={chartData} options={options}/>;
};


const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export default Index;