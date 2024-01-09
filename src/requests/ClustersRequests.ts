import {Cluster, ClusterStatus} from "@/type.ts";


const clusters: Cluster[] = [
    {
        name: "Cluster 1",
        status: ClusterStatus.Ready,
        kubeVersion: "1.18.0",
        orderID: "123456789",
        controlPlanes: [
            {
                Connectivity: {
                    name: "Connectivity",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeScheduler: {
                    name: "KubeScheduler",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
                KubeApiServer: {
                    name: "KubeApiServer",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeControllerManager: {
                    name: "KubeControllerManager",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
            },
            {
                Connectivity: {
                    name: "Connectivity",
                    readyNb: 10,
                    DesiredNumberScheduled: 0,
                },
                KubeScheduler: {
                    name: "KubeScheduler",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
                KubeApiServer: {
                    name: "KubeApiServer",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeControllerManager: {
                    name: "KubeControllerManager",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
            }
        ],
        nodes: [
            {
                name: "node1",
                isReady: true,
                role: ["worker"],
            },
            {
                name: "node2",
                isReady: false,
                role: ["worker"],
            },
            {
                name: "node3",
                isReady: true,
                role: ["worker"],
            },
        ],
    },
    {
        name: "Cluster 2",
        status: ClusterStatus.NotReady,
        kubeVersion: "1.18.0",
        orderID: "123456789",
        controlPlanes: [
            {
                Connectivity: {
                    name: "Connectivity",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeScheduler: {
                    name: "KubeScheduler",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
                KubeApiServer: {
                    name: "KubeApiServer",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeControllerManager: {
                    name: "KubeControllerManager",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
            },
            {
                Connectivity: {
                    name: "Connectivity",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeScheduler: {
                    name: "KubeScheduler",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
                KubeApiServer: {
                    name: "KubeApiServer",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeControllerManager: {
                    name: "KubeControllerManager",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
            },
            {
                Connectivity: {
                    name: "Connectivity",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeScheduler: {
                    name: "KubeScheduler",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
                KubeApiServer: {
                    name: "KubeApiServer",
                    readyNb: 1,
                    DesiredNumberScheduled: 0,
                },
                KubeControllerManager: {
                    name: "KubeControllerManager",
                    readyNb: 1,
                    DesiredNumberScheduled: 1,
                },
            }
        ],
        nodes: [
            {
                name: "node1",
                isReady: true,
                role: ["worker"],
            },
            {
                name: "node2",
                isReady: false,
                role: ["worker"],
            },
            {
                name: "node3",
                isReady: true,
                role: ["worker"],
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
