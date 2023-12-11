import React from "react";
import {NodeElement} from "@/type.ts";

type Props = {
    node: NodeElement;
    isLast: boolean;
}

/**
 * Component to display a node instance in the cluster details
 * @param node the node instance
 * @param isLast if the node is the last one
 */
const NodeComponent: React.FC<Props> = ({node, isLast}: Props) => {
    return (
        <div className={`flex flex-col text-start text-sm px-4 py-3 ${!isLast ? 'border-b-[1px] border-gray' : ''}`}>

            <label className="italic mr-1 font-bold">
                {node.name}
            </label>
            <div className="flex flex-row items-center justify-between">


                <label>
                    Role : {node.role}
                </label>
                <label>
                    {node.isReady ? 'Ready' : 'Not Ready'}
                </label>
            </div>
        </div>
    );
}
export default NodeComponent;