import PanelLayout from "@components/layout/PanelLayout.tsx";
import React, {useState} from "react";
import {getClustersList} from "@utils/requests/ClustersRequests.ts";
import Button from "@components/inputs/Button.tsx";
import {Cluster} from "@/type.ts";
import ClusterInstance from "@components/specifics/clusters/ClusterInstance.tsx";
import LoadingPage from "@components/common/LoadingPage.tsx";
import {useAuth} from "@components/common/AuthContext.tsx";
import {jwtDecode} from "jwt-decode";

/**
 * Component to display the clusters page with all the clusters deployed by the user
 * @constructor
 */
const ClustersPage: React.FC = () => {
    const [clusters, setClusters] = React.useState<Cluster[] | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    const [userId, setUserId] = useState<string>();
    const {token} = useAuth();
    if (!userId && token) {
        setUserId(jwtDecode(token).sub);
    }

    if (userId && token && clusters === undefined) {
        getClustersList(token, userId).then((resp) => {

            setClusters(resp);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    if (isLoading) {
        return <LoadingPage/>;
    }

    if (clusters && clusters.length > 0) {
        return (
            <PanelLayout>
                <div className="flex flex-row flex-wrap p-5">
                    {clusters.map((cluster, index) => {
                        return <ClusterInstance key={index} cluster={{...cluster}}/>
                    })}
                </div>
            </PanelLayout>
        );
    } else {
        return (
            <PanelLayout>

                <div className="flex flex-col h-screen items-center justify-center p-5">
                    <div className="flex flex-col items-center justify-center text-2xl text-gray-dark mb-10 font-bold">
                        <label>No clusters deployed</label>
                        <label>(┬┬﹏┬┬)</label>
                    </div>

                    <Button
                        to="/order"
                        content="Order now !"
                        customClass="text-3xl pointer-events-auto"
                    />
                </div>
            </PanelLayout>
        );
    }
}

export default ClustersPage;