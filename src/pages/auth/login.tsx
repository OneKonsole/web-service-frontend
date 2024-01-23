import React, {useState} from "react";
import {Link, redirect} from 'react-router-dom';
import FormContainer from "@components/form/FormContainer.tsx";
import InputField from "@components/inputs/InputField.tsx";
import Button from "@components/inputs/Button.tsx";
import VerticalPageLayout from "@components/layout/VerticalPageLayout.tsx";
import {InputType} from "@/type.ts";
import {login} from "@utils/auth.ts";
import {useAuth} from "@components/common/AuthContext.tsx";
import {stopAutoRefreshToken} from "@utils/runWorkers.ts";

/**
 * Login component is used to render the login page
 * @constructor React.FC
 */
const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {setToken, setRefreshToken} = useAuth();

    const handleLogin = async (event: {
        preventDefault: () => void;
    }) => {
        event.preventDefault();
        try {
            login({
                username,
                password
            }).then((r) => {
                if (r.code === 200) {
                    setToken(r.data.token);
                    setRefreshToken(r.data.refresh_token);
                    // Redirect to dashboard
                    redirect("/menus/monitor")
                } else {
                    setError(r.message);
                }
            });
        } catch (error) {
            setError("Failed to login");
        }
    };

    stopAutoRefreshToken();

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
            <InputField label="Username" id="username" type={InputType.text} placeholder="Username"
                        setValue={setUsername}/>
            <InputField label="Password" id="password" type={InputType.password} placeholder="******************"
                        setValue={setPassword}/>
            <div className="flex items-center justify-center">
                <p className="text-red text-xs italic">{error}</p>
            </div>
            <div className="flex items-center justify-center">
                <button type="submit" className="text-black py-2 px-4 rounded underline hover:no-underline">
                    Login
                </button>
            </div>
            <div className="flex items-center justify-center">
                <Link to="/auth/forgot-password"
                      className="inline-block align-baselinetext-sm text-blue hover:text-blue-light mb-4">
                    Forgot Password?
                </Link>
            </div>
        </React.Fragment>
    );

    const formContent = (
        <FormContainer title="Login" actionSection={actionSection}>
            <form onSubmit={handleLogin}>
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

    return <VerticalPageLayout leftComponent={formContent} rightComponent={rightSideContent}/>
};

export default Login;
