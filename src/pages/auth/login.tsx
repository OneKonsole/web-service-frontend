import React from "react";
import {Link} from 'react-router-dom';
import FormContainer from "@components/form/FormContainer.tsx";
import InputField from "@components/inputs/InputField.tsx";
import Button from "@components/inputs/Button.tsx";
import VerticalPageLayout from "@components/layout/VerticalPageLayout.tsx";
import {InputType} from "@/type.ts";

/**
 * Login component is used to render the login page
 * @constructor React.FC
 */
const Login: React.FC = () => {
    const actionSection = (
        <React.Fragment>
            <div className="flex items-center justify-center">
                <Button content="Login" borderColor="border-blue" hoverColor="hover:border-blue-light"
                        to="/auth/login"/>
                <div className="text-gray-dark text-xl">|</div>
                <Button content="Register" borderColor="border-transparent" hoverColor="hover:border-transparent"
                        to="/auth/register"/>
            </div>
        </React.Fragment>
    );

    const formFields = (
        <React.Fragment>
            <InputField label="Username" id="username" type={InputType.text} placeholder="Username"/>
            <InputField label="Password" id="password" type={InputType.password} placeholder="******************"/>
            <div className="flex items-center justify-center">
                <Link to={"/auth/forgot-password"}
                      className="inline-block align-baselinetext-sm text-blue hover:text-blue-light mb-4">
                    Forgot Password?
                </Link>
            </div>
        </React.Fragment>
    );

    const formContent = (
        <FormContainer title="Login" actionSection={actionSection}>
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

export default Login;
