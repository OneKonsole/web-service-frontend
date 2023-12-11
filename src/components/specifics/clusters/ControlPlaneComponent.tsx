import React from "react";
import {ControlPlaneElement} from "@/type.ts";

type ControlPlaneComponentProps = {
    controlPlane: ControlPlaneElement;
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


    console.log("controlPlane", controlPlane)


    return (
        <div className={`flex flex-col text-start text-sm px-4 py-3 ${!isLast ? 'border-b-[1px] border-gray' : ''}`}>

            <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-between">
                    <label className="italic mr-1 font-bold">
                        {controlPlane.name}
                    </label>
                </div>
                <div className="flex flex-row items-center justify-end">
                    <label className="mr-1">
                        {controlPlane.readyNumber}/{controlPlane.desiredNumberScheduled}
                    </label>
                    <div
                        className={`rounded-full p-1 ${controlPlane.readyNumber == controlPlane.desiredNumberScheduled ? "bg-green" : "bg-yellow"}`}/>
                </div>
            </div>
        </div>
    );
}

export default ControlPlaneComponent;
