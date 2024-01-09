import React from "react";
import {ControlPlane, ControlPlaneElement} from "@/type.ts";

type ControlPlaneComponentProps = {
    controlPlane: ControlPlane;
    isLast: boolean;

}
/**
 * Component to display a control plane instance in the cluster details
 *
 * @param controlPlane the control plane instance
 * @param isLast if the control plane is the last one
 */
const ControlPlaneComponent: React.FC<ControlPlaneComponentProps> = ({
                                                                         controlPlane,
                                                                         isLast
                                                                     }: ControlPlaneComponentProps) => {
    return (
        <div className={`flex flex-col text-start text-sm px-4 py-3 ${!isLast ? 'border-b-[1px] border-gray' : ''}`}>

            <ControlPlaneInstance ctrlPlaneElement={controlPlane.Connectivity}/>
            <ControlPlaneInstance ctrlPlaneElement={controlPlane.KubeControllerManager}/>
            <ControlPlaneInstance ctrlPlaneElement={controlPlane.KubeApiServer}/>
            <ControlPlaneInstance ctrlPlaneElement={controlPlane.KubeScheduler}/>
        </div>
    );
}

type ControlPlaneInstanceProps = {
    ctrlPlaneElement: ControlPlaneElement;
}

/**
 * Component to display a control plane instance in the cluster details
 *
 * @param ctrlPlaneElement the control plane instance
 */
const ControlPlaneInstance = ({ctrlPlaneElement}: ControlPlaneInstanceProps) => {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-between">
                <label className="italic mr-1 font-bold">
                    {ctrlPlaneElement.name}
                </label>
            </div>
            <div className="flex flex-row items-center justify-end">
                <label className="mr-1">
                    {ctrlPlaneElement.readyNb}/{ctrlPlaneElement.DesiredNumberScheduled}
                </label>
                <div
                    className={`rounded-full p-1 ${ctrlPlaneElement.readyNb == ctrlPlaneElement.DesiredNumberScheduled ? "bg-green" : "bg-yellow"}`}/>
            </div>
        </div>
    );
}

export default ControlPlaneComponent;
