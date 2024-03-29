import React from "react";
import FormContainer from "@components/form/FormContainer.tsx";
import InputField from "@components/inputs/InputField.tsx";
import Button from "@components/inputs/Button.tsx";
import VerticalPageLayout from "@components/layout/VerticalPageLayout.tsx";
import {InputType} from "@/type.ts";

/**
 * ForgotPassword component is used to render the forgot password page
 * @constructor React.FC
 */
const ForgotPassword: React.FC = () => {
    const actionSection = (
        <React.Fragment>
            <div className="flex items-center justify-center">
                <Button content="Login" borderColor="border-transparent" hoverColor="hover:border-transparent"
                        to="/auth/login"/>
                <div className="text-gray-dark text-xl">|</div>
                <Button content="Register" borderColor="border-transparent" hoverColor="hover:border-transparent"
                        to="/auth/register"/>
            </div>
        </React.Fragment>
    );

    const formFields = (
        <React.Fragment>
            <InputField label="Email" id="email" type={InputType.email} placeholder="Email"/>
            <div className="flex items-center justify-center mb-4">
                <Button content="Submit" borderColor="border-blue" hoverColor="hover:border-blue-light"
                        to="/auth/login"/>
            </div>
        </React.Fragment>
    );

    const formContent = (
        <FormContainer title="Forgot Password" actionSection={actionSection}>
            <form>
                {formFields}
            </form>
        </FormContainer>
    );

    const rightSideContent = (
        <div className="flex justify-center items-center h-full px-20">
            <h1 className="text-center text-3xl font-light italic text-white">
                “Beyond the Cloud, Into the Cosmos: Elevate Your Server Resources and Kubernetes Apps with OneKonsole”
            </h1>
        </div>
    );

    return <VerticalPageLayout leftComponent={formContent} rightComponent={rightSideContent}/>;
};

export default ForgotPassword;
