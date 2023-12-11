import React from "react";
import {Cluster} from "@/type.ts";

type Props = {
    cluster: Cluster;
}
/**
 * Component to display the kube version and the order ID of a cluster
 * @param cluster the cluster
 */
const ClusterInfos: React.FC<Props> = ({cluster}: Props) => {
    return (
        <div className="flex flex-col text-start">
            <label className="text-xs">
                Kube version: {cluster.kubeVersion}
            </label>
            <label className="text-xs">
                Order ID: {cluster.orderID}
            </label>
        </div>
    );
}
export default ClusterInfos;