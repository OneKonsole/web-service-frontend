import React from "react";
import StatusComponent from "@components/specifics/clusters/StatusComponent.tsx";
import ControlPlaneComponent from "@components/specifics/clusters/ControlPlaneComponent.tsx";
import NodeComponent from "@components/specifics/clusters/NodeComponent.tsx";
import ClusterInfos from "@components/specifics/clusters/ClustersInfos.tsx";
import {Cluster} from "@/type.ts";
import CloseButton from "@components/specifics/clusters/CloseButton.tsx";

type Props = {
    cluster: Cluster;
}

/**
 * Component to display a cluster instance in the clusters page
 * @param cluster the cluster instance
 */
const ClusterInstance: React.FC<Props> = ({cluster}: Props) => {
    const [showDetails, setShowDetails] = React.useState(false);
    const handleDetailsClick = () => {
        setShowDetails(true);
    };
    const handleCloseDetails = () => {
        setShowDetails(false);
    };

    return (
        <div
            className="grid grid-cols-[1fr,auto] grid-rows-2 items-center gap-x-10 gap-y-2 px-6 py-4 rounded-xl shadow m-2">
            <StatusComponent status={cluster.status}/>
            <label className="text-xl px-10 text-center">
                {cluster.name}
            </label>
            <ClusterInfos cluster={cluster}/>
            <button
                className="flex items-center justify-center text-sm rounded-lg bg-gray-light p-1 hover:bg-gray cursor-pointer"
                onClick={handleDetailsClick}
            > details
            </button>

            {showDetails && (
                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-dark bg-opacity-50"
                    onClick={handleCloseDetails}>

                    <div className="flex flex-col relative bg-white p-4 items-center rounded-xl w-4/5"
                         onClick={e => e.stopPropagation()}>

                        <CloseButton onClick={handleCloseDetails}/>

                        <div
                            className="grid grid-cols-2 grid-auto-rows minmax(min-content, auto) p-4 items-center w-full">
                            <StatusComponent
                                status={cluster.status}
                            />
                            <label className="flex text-xl justify-center font-bold">
                                {cluster.name}
                            </label>
                            <ClusterInfos cluster={cluster}/>
                            <div/>

                            <label className="flex text-md justify-center italic font-bold mt-4">
                                Control Planes
                            </label>

                            <label className="flex text-md justify-center italic font-bold mt-4">
                                Nodes
                            </label>

                            <div className="flex flex-col text-start mt-5 pr-2 border-r-[1px] border-gray">
                                {cluster.controlPlaneElements.map((controlPlane, index) => {
                                    const isLast = index === cluster.controlPlaneElements.length - 1;
                                    return <ControlPlaneComponent key={index} controlPlane={controlPlane}
                                                                  isLast={isLast}/>
                                })}
                            </div>

                            <div className="flex flex-col mt-5 pl-2">
                                {cluster.nodes.map((node, index) => {
                                    const isLast = index === cluster.nodes.length - 1;
                                    return <NodeComponent key={index} node={node} isLast={isLast}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ClusterInstance;