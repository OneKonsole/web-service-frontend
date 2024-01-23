import React, {useState} from "react";

import FormContainer from "@components/form/FormContainer.tsx";
import InputField from "@components/inputs/InputField.tsx";
import Button from "@components/inputs/Button.tsx";
import VerticalPageLayout from "@components/layout/VerticalPageLayout.tsx";
import {InputType} from "@/type.ts";
import {register, updateUserInfo} from "@utils/auth.ts";

/**
 * Register component is used to render the register page
 * @constructor React.FC
 */
const Register: React.FC = () => {

    const [error, setError] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const verify = (): boolean => {
        let newError = false;
        // Check if value is empty
        [
            firstName,
            lastName,
            email,
            phone,
            company,
            role,
            country,
            password
        ].forEach(v => {
            if (v === null || v === undefined || v === '') {
                newError = true
            }
        })

        if (newError) {
            setError('All fields must be filled correctly')
            return false
        }

        if (password !== repeatPassword) {
            setError('Both password should be the same')
            return false
        }

        setError('')

        return true
    }

    const handleRegister = (event: { preventDefault: () => void; }): void => {
        event.preventDefault();
        if (verify()) {
            const userInfo = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                company: company,
                role: role,
                country: country,
                password: password,
                username: email
            }
            register(userInfo)
                .then((res) => {
                    console.log(res)
                })
                .catch((er) => {
                    console.log(er)
                })
        }
    };

    const actionSection = (
        <React.Fragment>
            <div className="flex items-center justify-center">
                <Button content="Login" borderColor="border-transparent" hoverColor="hover:border-transparent"
                        to="/auth/login"/>
                <div className="text-gray-dark text-xl">|</div>
                <Button content="Register" borderColor="border-blue" hoverColor="hover:border-blue-light"
                        to="/auth/register"/>
            </div>
        </React.Fragment>
    );

    // TODO: rework the UI, it's to heavy.
    const formFields = (
        <React.Fragment>
            <div className="flex">
                <InputField
                    label="Firstname"
                    id="firstname"
                    type={InputType.text}
                    placeholder="Firstname"
                    setValue={setFirstName}
                    value={firstName}
                />
                <InputField
                    label="Lastname"
                    id="lastname"
                    type={InputType.text}
                    placeholder="Lastname"
                    setValue={setLastName}
                    value={lastName}
                />
            </div>
            <InputField
                label="Email"
                id="email"
                type={InputType.email}
                placeholder="Email"
                setValue={setEmail}
                value={email}
            />
            <InputField
                label="Phone"
                id="phone"
                type={InputType.phone}
                placeholder="+33631253900"
                setValue={setPhone}
                value={phone}
            />
            <InputField
                label="Company"
                id="company"
                type={InputType.text}
                placeholder="Company"
                setValue={setCompany}
                value={company}
            />
            <div className="flex">
                <InputField
                    label="Role"
                    id="role"
                    type={InputType.text}
                    placeholder="Cloud Architect, Student..."
                    setValue={setRole}
                    value={role}
                />
                <InputField
                    label="Country"
                    id="country"
                    type={InputType.text}
                    placeholder="My country"
                    setValue={setCountry}
                    value={country}
                />
            </div>
            <InputField
                label="Password"
                id="password"
                type={InputType.password}
                placeholder="******************"
                setValue={setPassword}
                value={password}
            />
            <InputField
                label="Repeat Password"
                id="repeat-password"
                type={InputType.password}
                placeholder="******************"
                setValue={setRepeatPassword}
                value={repeatPassword}
            />
            <div className="flex items-center justify-center">
                <p className="text-red text-xs italic">{error}</p>
            </div>
            <div className="flex items-center justify-center">

                <button type="submit" className="text-black py-2 px-4 rounded underline hover:no-underline">
                    Register
                </button>
            </div>
        </React.Fragment>
    );

    const formContent = (
        <FormContainer title="Register" actionSection={actionSection}>
            <form onSubmit={handleRegister}>
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

export default Register;
