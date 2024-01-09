import React from "react";
import {ClusterStatus} from "@/type.ts";

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
            case ClusterStatus.Ready:
                return "bg-green";

            case ClusterStatus.Migrating:
            case ClusterStatus.Upgrading:
            case ClusterStatus.Provisioning:
            case ClusterStatus.CertificateAuthorityRotating:
                return "bg-yellow";

            case ClusterStatus.NotReady:
                return "bg-red";

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