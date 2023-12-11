import {Cluster} from "@/type.ts";

/**
 * Get the list of clusters for a user
 * @param token user token
 * @param userId user id
 */
export const getClustersList = async (token: string, userId: string): Promise<Cluster[] | undefined> => {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    }
    const resp = await fetch('/clusters-api/' + userId, options);
    return new Promise((resolve) => {
        if (resp.status !== 200) {
            resolve([]);
        } else {
            const json = resp.json();
            resolve(json);
        }
    });
}

/**
 * Get the kube config file for a cluster
 * @param token user token
 * @param userId user id
 * @param clusterName cluster name
 */
export const getKubeConfig = async (token: string, userId: string, clusterName: string): Promise<string> => {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    }
    const resp = await fetch('/clusters-api/' + userId + '/' + clusterName + '/kubeconfig', options);
    const json = await resp.json();

    return new Promise((resolve) => {
        setTimeout(() => resolve(json), 500);
    });
}
