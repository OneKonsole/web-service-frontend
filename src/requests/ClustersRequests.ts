import {Cluster} from "@/type.ts";


const clusters: Cluster[] = [
    {
        name: "Cluster 1",
        status: "Running",
        kubeVersion: "1.18.0",
        orderID: "123456789",
        controlPlaneElements: [
            {
                name: "etcd",
                status: "Running",
                replicas: 1,
                cpu: 200,
                memory: 300,
            },
            {
                name: "api",
                status: "Failed",
                replicas: 6,
                cpu: 500,
                memory: 400,
            },
            {
                name: "scheduler",
                status: "Pending",
                replicas: 7,
                cpu: 800,
                memory: 900,
            },
        ],
        nodes: [
            {
                name: "node1",
                isReady: true,
                role: "worker",
            },
            {
                name: "node2",
                isReady: false,
                role: "worker",
            },
            {
                name: "node3",
                isReady: true,
                role: "worker",
            },
        ],
    },
    {
        name: "Cluster 2",
        status: "Running",
        kubeVersion: "1.18.0",
        orderID: "123456789",
        controlPlaneElements: [
            {
                name: "etcd",
                status: "Running",
                replicas: 1,
                cpu: 200,
                memory: 300,
            },
            {
                name: "api",
                status: "Failed",
                replicas: 6,
                cpu: 500,
                memory: 400,
            },
            {
                name: "scheduler",
                status: "Pending",
                replicas: 7,
                cpu: 800,
                memory: 900,
            },
        ],
        nodes: [
            {
                name: "node1",
                isReady: true,
                role: "worker",
            },
            {
                name: "node2",
                isReady: false,
                role: "worker",
            },
            {
                name: "node3",
                isReady: true,
                role: "worker",
            },
        ],
    }
];


export const getClustersList = async (): Promise<Cluster[] | undefined> => {

    // TODO : get the clusters from the backend

    return new Promise((resolve) => {
        setTimeout(() => resolve(clusters), 500);
    });
}
