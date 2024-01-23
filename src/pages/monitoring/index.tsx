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
        if (!memoryData && memoryLoading) {
            getMemoryUsage().then(r => {
                    setMemoryData(r.data)
                    setMemoryLoading(false)
                }
            );
        }
        if (!cpuData && cpuLoading) {
            getCPUUsage().then(r => {
                    setCpuData(r.data)
                    setCpuLoading(false)
                }
            );
        }
    }, []);

    const graphClass = "w-full px-4 py-6 mb-4 h-[300px] bg-gray-light rounded-xl";
    const labelClass = "flex h-full font-bold text-gray-dark items-center text-center justify-center";

    return (
        <PanelLayout>
            <h1 className="text-2xl font-semibold text-gray-900 ml-4 my-4">Monitoring</h1>
            <div className="flex flex-wrap flex-col m-4">
                <div className={graphClass}>
                    {memoryLoading ? (
                        <label className={labelClass}>
                            Loading Memory Data...
                        </label>
                    ) : (
                        <MemoryUtilisationGraph key={JSON.stringify(memoryData)} data={memoryData}/>
                    )}
                </div>
                <div className={graphClass}>
                    {cpuLoading ? (
                        <label className={labelClass}>
                            Loading CPU Data...
                        </label>
                    ) : (
                        <CPUUtilisationGraph key={JSON.stringify(cpuData)} data={cpuData}/>
                    )}
                </div>
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