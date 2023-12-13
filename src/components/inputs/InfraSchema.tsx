import React from "react";
import apiIcon from "@assets/icons/api.svg";
import cmIcon from "@assets/icons/cm.svg";
import schedulerIcon from "@assets/icons/scheduler.svg";
import etcdIcon from "@assets/icons/etcd.svg";
import graphLokiIcon from "@assets/logos/graphana-loki-titled.svg";
import prometheusIcon from "@assets/logos/prometheus-titled.svg";
import prometheusAlertIcon from "@assets/logos/prometheus-titled-alert.svg";
import harborIcon from "@assets/logos/harbor.svg";
import dbIcon from "@assets/icons/database.svg";
import {SchemaIconType} from "@/type.ts";

type Icon = {
    iconType: SchemaIconType,
    instances: number,
    src?: string,
    description?: string,
    value?: string,
    textTop?: string,
}

interface InfraSchemaProps {
    kubeIcons: Icon[],
    externIcons: Icon[],
    toolsIcons?: Icon[],
    storageIcons?: Icon[],
}

/**
 * Return the icon src from the icon type
 * @param iconType the icon type
 */
const iconTypeToSrcMap: Record<SchemaIconType, string> = {
    [SchemaIconType.api]: apiIcon,
    [SchemaIconType.cm]: cmIcon,
    [SchemaIconType.scheduler]: schedulerIcon,
    [SchemaIconType.etcd]: etcdIcon,
    [SchemaIconType.graphLoki]: graphLokiIcon,
    [SchemaIconType.prometheus]: prometheusIcon,
    [SchemaIconType.prometheusAlert]: prometheusAlertIcon,
    [SchemaIconType.harbor]: harborIcon,
    [SchemaIconType.imgStorage]: dbIcon,
    [SchemaIconType.monitoringStorage]: dbIcon,

};

/**
 * Return the icon description from the icon type
 * @param iconType the icon type
 */
const iconTypeToDescriptionMap: Record<SchemaIconType, string> = {
    [SchemaIconType.api]: "API Server: Handles all requests to the cluster.",
    [SchemaIconType.cm]: "Controller Manager: Manages cluster controllers.",
    [SchemaIconType.scheduler]: "Scheduler: Assigns workloads to nodes.",
    [SchemaIconType.etcd]: "etcd: Key-value store for cluster data.",
    [SchemaIconType.graphLoki]: "Grafana Loki: Log aggregation system.",
    [SchemaIconType.prometheus]: "Prometheus: Monitoring toolkit.",
    [SchemaIconType.prometheusAlert]: "Prometheus: Monitoring and alerting toolkit.",
    [SchemaIconType.harbor]: "Harbor: Container image registry.",
    [SchemaIconType.imgStorage]: "Image Storage: Stores container images.",
    [SchemaIconType.monitoringStorage]: "Monitoring Storage: Stores monitoring data.",
}

/**
 * Associate the icon properties to the icon
 * @param icons the icons
 */
const associateIconProperties = (icons: Icon[]) => {
    return icons.map(icon => ({
        ...icon,
        src: iconTypeToSrcMap[icon.iconType],
        description: iconTypeToDescriptionMap[icon.iconType]
    }));
};

/**
 * InfraSchema component is used to render the infrastructure schema
 * @param kubeIcons the kube icons
 * @param toolsIcons the tools icons
 * @param externIcons the extern icons
 * @param storageIcons the storage icons
 * @constructor React.FC<InfraSchemaProps>
 */
const InfraSchema: React.FC<InfraSchemaProps> = (
    {
        kubeIcons,
        externIcons,
        toolsIcons,
        storageIcons,
    }) => {

    kubeIcons = associateIconProperties(kubeIcons);
    externIcons = associateIconProperties(externIcons);
    toolsIcons = toolsIcons ? associateIconProperties(toolsIcons) : undefined;

    if (storageIcons) {
        storageIcons = associateIconProperties(storageIcons);
        storageIcons[0].textTop = "images";
        storageIcons[1].textTop = "monitoring";
    }

    const renderImageWithTooltip = (icon: Icon) => {
        return Array.from({length: icon.instances}, (_, index) => (
            <div key={icon.iconType + index} className="group relative flex justify-center px-2">
                <img
                    src={icon.src}
                    alt={icon.iconType}
                    className="h-20"
                />
                {icon.textTop &&
                    <p className="absolute top-2 text-xs text-[7px] text-white font-bold">
                        {icon.textTop}
                    </p>
                }
                {icon.value &&
                    <p className="absolute top-9 text-lg text-white font-bold">
                        {icon.value}
                    </p>
                }
                <span
                    className="absolute w-60 top-24 scale-0 rounded bg-gray-light p-2 text-xs text-gray-dark group-hover:scale-100 transition duration-200 z-50 text-center">
                    {icon.description}
                </span>
            </div>
        ));
    };

    return (
        <div className="flex flex-col justify-center p-5">
            <label className="text-xl font-bold text-center py-5">
                Your Infrastructure
            </label>
            <div className="p-10">
                <div className="rounded-3xl text-center border-dark border-2 pt-2">

                    <p className="mb-2"> Your tenant </p>
                    <hr className="border-[1.5px]"/>

                    <div className="flex flex-wrap justify-center p-5">
                        {kubeIcons.flatMap(icon => renderImageWithTooltip(icon))}
                    </div>

                    {toolsIcons &&
                        <div className="flex flex-wrap justify-center px-5 py-3">
                            {toolsIcons.map((icon => renderImageWithTooltip(icon)))}
                        </div>
                    }
                    {storageIcons &&
                        <div className="flex flex-wrap justify-center px-5 py-3">
                            {storageIcons.map((icon => renderImageWithTooltip(icon)))}
                        </div>
                    }
                </div>

                <div className="flex justify-center mx-auto mt-10">
                    {externIcons.map((icon => renderImageWithTooltip(icon)))}
                </div>
            </div>
        </div>
    );
}
export default InfraSchema;