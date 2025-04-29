/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MemberCreateFormInputValues = {
    name?: string;
    city?: string;
    mobile?: string;
    email?: string;
    visitDate?: string;
    guestOf?: string;
    ageGroup?: string;
    gender?: string;
    maritalStatus?: string;
    occupation?: string;
    decision?: string;
    comments?: string;
    joinFellowship?: boolean;
    fellowshipDetails?: string;
    interests?: string[];
    status?: string;
};
export declare type MemberCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    mobile?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    visitDate?: ValidationFunction<string>;
    guestOf?: ValidationFunction<string>;
    ageGroup?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    maritalStatus?: ValidationFunction<string>;
    occupation?: ValidationFunction<string>;
    decision?: ValidationFunction<string>;
    comments?: ValidationFunction<string>;
    joinFellowship?: ValidationFunction<boolean>;
    fellowshipDetails?: ValidationFunction<string>;
    interests?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MemberCreateFormOverridesProps = {
    MemberCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    mobile?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    visitDate?: PrimitiveOverrideProps<TextFieldProps>;
    guestOf?: PrimitiveOverrideProps<TextFieldProps>;
    ageGroup?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<SelectFieldProps>;
    maritalStatus?: PrimitiveOverrideProps<SelectFieldProps>;
    occupation?: PrimitiveOverrideProps<TextFieldProps>;
    decision?: PrimitiveOverrideProps<TextFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
    joinFellowship?: PrimitiveOverrideProps<SwitchFieldProps>;
    fellowshipDetails?: PrimitiveOverrideProps<TextFieldProps>;
    interests?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type MemberCreateFormProps = React.PropsWithChildren<{
    overrides?: MemberCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MemberCreateFormInputValues) => MemberCreateFormInputValues;
    onSuccess?: (fields: MemberCreateFormInputValues) => void;
    onError?: (fields: MemberCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MemberCreateFormInputValues) => MemberCreateFormInputValues;
    onValidate?: MemberCreateFormValidationValues;
} & React.CSSProperties>;
export default function MemberCreateForm(props: MemberCreateFormProps): React.ReactElement;
