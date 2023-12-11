import React from "react";
import ControlPlaneStatus from "@components/specifics/clusters/StatusComponent.tsx";
import {ControlPlaneElement} from "@/type.ts";

type Props = {
    controlPlane: ControlPlaneElement;
    isLast: boolean;

}

/**
 * Component to display a control plane instance in the cluster details
 *
 * @param controlPlane the control plane instance
 * @param isLast if the control plane is the last one
 */
const ControlPlaneComponent: React.FC<Props> = ({controlPlane, isLast}: Props) => {
    return (
        <div className={`flex flex-col text-start text-sm px-4 py-3 ${!isLast ? 'border-b-[1px] border-gray' : ''}`}>

            <div className="flex flex-row items-center justify-between">
                <ControlPlaneStatus status={controlPlane.status}/>
                <label className="italic mr-1 font-bold">
                    {controlPlane.name}
                </label>
            </div>

            <div className="flex flex-row items-center justify-between">
                <label className="flex text-sm">
                    CPU: {controlPlane.cpu} m
                </label>
                <label>
                    Memory: {controlPlane.memory} Mi
                </label>
            </div>
            <label className='flex justify-end text-end'>
                Replicas : {controlPlane.replicas}
            </label>
        </div>
    );
}
export default ControlPlaneComponent;