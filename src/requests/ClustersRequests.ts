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

export const getKubeConfig = async (clusterName: string): Promise<string> => {

    // TODO : get the kubeconfig from the backend
    const yamlContent = "apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: data\n    server: https://cluster-0.onekonsole.emetral.fr:32762\n  name: cluster-0\ncontexts:\n- context:\n    cluster: cluster-0\n    user: kubernetes-admin\n  name: kubernetes-admin@cluster-0\ncurrent-context: kubernetes-admin@cluster-0\nkind: Config\npreferences: {}\nusers:\n- name: kubernetes-admin\n  user:\n    client-certificate-data: data\n    client-key-data: data\n";
    // GET /{clientName}/{clusterName}/kubeconfig
    console.log("getKubeConfig", clusterName);

    return new Promise((resolve) => {
        setTimeout(() => resolve(yamlContent), 500);
    });
}
