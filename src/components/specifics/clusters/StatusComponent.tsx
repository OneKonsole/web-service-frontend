import {ControlPlaneStatus} from "@/type.ts";
import React from "react";

type Props = {
    status: string,
}

/**
 * Component to display the status of the control plane
 *
 * @param status the status of the control plane
 */
const StatusComponent: React.FC<Props> = ({status}: Props) => {
    /**
     * Return the class to apply to the status
     */
    const renderStatusClass = () => {
        switch (status) {
            case ControlPlaneStatus.Succeeded:
            case ControlPlaneStatus.Running:
                return "bg-green";

            case ControlPlaneStatus.Pending:
            case ControlPlaneStatus.Terminating:
            case ControlPlaneStatus.ContainerCreating:
                return "bg-yellow";

            case ControlPlaneStatus.Failed:
            case ControlPlaneStatus.Error:
                return "bg-red";

            case ControlPlaneStatus.Unknown:
            default:
                return "bg-gray";
        }
    }
    return (
        <div className="flex items-center justify-start">
            <div className={`rounded-full p-1 mr-2 ${renderStatusClass()}`}/>
            <label className="text-md">
                {status}
            </label>
        </div>
    );
}
export default StatusComponent;