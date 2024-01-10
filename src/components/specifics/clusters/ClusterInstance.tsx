import React, {useEffect} from "react";
import StatusComponent from "@components/specifics/clusters/StatusComponent.tsx";
import ControlPlaneComponent from "@components/specifics/clusters/ControlPlaneComponent.tsx";
import NodeComponent from "@components/specifics/clusters/NodeComponent.tsx";
import ClusterInfos from "@components/specifics/clusters/ClustersInfos.tsx";
import {Cluster} from "@/type.ts";
import CloseButton from "@components/specifics/clusters/CloseButton.tsx";
import {getKubeConfig} from "@/requests/ClustersRequests.ts";
import DownloadIcon from "@assets/icons/download.svg";
import ClipBoardIcon from "@assets/icons/clipboard.svg";
import CheckIcon from "@assets/icons/check.svg";

type Props = {
    cluster: Cluster;
}

/**
 * Component to display a cluster instance in the clusters page
 * @param cluster the cluster instance
 */
const ClusterInstance: React.FC<Props> = ({cluster}: Props) => {
    const [showDetails, setShowDetails] = React.useState(false);
    const [showHelper, setShowHelper] = React.useState(false);
    const commandToCopy = `kubeadm token create --print-join-command --config=${cluster.name}_kubeConfig.yaml`;
    const [isCommandCopied, setIsCommandCopied] = React.useState(false);

    const handleDetailsClick = () => {
        setShowDetails(true);
    };
    const handleCloseDetails = () => {
        setShowDetails(false);
        handleCloseHelper();
    };
    const handleCloseHelper = () => {
        setShowHelper(false);
    }
    const handleCopyCommand = () => {
        navigator.clipboard.writeText(commandToCopy).then(() =>
            setIsCommandCopied(true)
        );
    };

    useEffect(() => {
        if (isCommandCopied) {
            setTimeout(() => {
                setIsCommandCopied(false);
            }, 2000);
        }
    }, [isCommandCopied]);

    /**
     * Function to download the corresponding yaml file
     */
    const downloadYaml = () => {
        const fileName = `${cluster.name}_kubeConfig.yaml`;
        getKubeConfig(cluster.name).then((resp) => {
            if (resp) {
                const blob = new Blob([resp], {type: 'text/yaml'});
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
        setShowHelper(true);
        handleCopyCommand();
    }


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

                            <button
                                // bg not larger than content, fit content
                                className="flex items-center justify-center text-sm rounded-lg bg-gray-light p-1 hover:bg-gray cursor-pointer mx-auto px-4 py-1"
                                onClick={downloadYaml}
                            > Download Kube Config
                                <img src={DownloadIcon} alt="download" className="w-5 h-5 ml-2"/>
                            </button>

                            <label className="flex text-md justify-center italic font-bold mt-4">
                                Control Planes
                            </label>

                            <label className="flex text-md justify-center italic font-bold mt-4">
                                Nodes
                            </label>

                            <div className="flex flex-col text-start mt-5 pr-2 border-r-[1px] border-gray">
                                <label className="text-xs font-bold text-end pr-4"> Ready </label>
                                {cluster.controlPlanes.map((controlPlane, index) => {
                                    const isLast = index === cluster.controlPlanes.length - 1;
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
            {showHelper && (
                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-dark bg-opacity-70"
                    onClick={handleCloseHelper}>
                    <div className="flex flex-col relative bg-white p-4 items-center rounded-xl w-fit"
                         onClick={e => e.stopPropagation()}>

                        <CloseButton onClick={handleCloseHelper}/>
                        <div className="flex flex-col p-4">
                            <label className="text text-start mb-4">Run on your node server these commands : </label>

                            <div className="flex flex-row space-x-2 bg-gray-light py-1 px-2 rounded-lg">
                                <label className="text text-start mr-4">
                                    {commandToCopy}
                                </label>
                                <button onClick={handleCopyCommand}>
                                    <img
                                        src={isCommandCopied ? CheckIcon : ClipBoardIcon}
                                        alt={isCommandCopied ? "check" : "copy"}
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>

                            <label className="text text-start mt-4">
                                It will generate a token to join the cluster.
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ClusterInstance;