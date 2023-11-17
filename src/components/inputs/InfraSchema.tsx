import React from "react";
import apiIcon from "@assets/icons/api.svg";
import cmIcon from "@assets/icons/cm.svg";
import schedulerIcon from "@assets/icons/scheduler.svg";
import etcdIcon from "@assets/icons/etcd.svg";
import graphLokiIcon from "@assets/logos/graphana-loki.svg";
import prometheusIcon from "@assets/logos/prometheus.svg";
import {SchemaIconType} from "@/type.ts";

type Icon = {
    iconType: SchemaIconType,
    instances: number
    src?: string,
}

interface InfraSchemaProps {
    kubeIcons: Icon[],
    toolsIcons: Icon[],
    externIcons: Icon[],
}

// The icon class
const iconClass = "h-20 w-20";

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
};

/**
 * InfraSchema component is used to render the infrastructure schema
 * @param kubeIcons the kube icons
 * @param toolsIcons the tools icons
 * @param externIcons the extern icons
 * @constructor React.FC<InfraSchemaProps>
 */
const InfraSchema: React.FC<InfraSchemaProps> = (
    {
        kubeIcons,
        toolsIcons,
        externIcons,
    }) => {

    // associate the icon type with the icon in the Icon src
    kubeIcons.forEach(icon => icon.src = iconTypeToSrcMap[icon.iconType]);
    toolsIcons.forEach(icon => icon.src = iconTypeToSrcMap[icon.iconType]);
    externIcons.forEach(icon => icon.src = iconTypeToSrcMap[icon.iconType]);

    return (
        <div className="flex flex-col justify-center p-5">
            <label className="text-xl font-bold text-center py-5">
                Your Infrastructure
            </label>
            <div className="p-10">
                <div className="rounded-3xl text-center border-dark border-2 pt-2">
                    <p className="mb-2">Your tenant</p>
                    <hr/>
                    <div className="flex justify-center flex-wrap p-5">
                        {kubeIcons.map(icon => (
                            [...Array(icon.instances)].map((_, i) => (
                                <img key={icon.iconType + i} src={icon.src} alt={icon.iconType} className={iconClass}/>
                            ))
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center p-5">
                        {toolsIcons.map(icon => (
                            [...Array(icon.instances)].map((_, i) => (
                                <img key={icon.iconType + i} src={icon.src} alt={icon.iconType} className={iconClass}/>
                            ))
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mx-auto mt-10">
                    {externIcons.map(icon => (
                        [...Array(icon.instances)].map((_, i) => (
                            <img key={icon.iconType + i} src={icon.src} alt={icon.iconType} className={iconClass}/>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}
export default InfraSchema;