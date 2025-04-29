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
export declare type MemberUpdateFormInputValues = {
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
export declare type MemberUpdateFormValidationValues = {
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
export declare type MemberUpdateFormOverridesProps = {
    MemberUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type MemberUpdateFormProps = React.PropsWithChildren<{
    overrides?: MemberUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    member?: any;
    onSubmit?: (fields: MemberUpdateFormInputValues) => MemberUpdateFormInputValues;
    onSuccess?: (fields: MemberUpdateFormInputValues) => void;
    onError?: (fields: MemberUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MemberUpdateFormInputValues) => MemberUpdateFormInputValues;
    onValidate?: MemberUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MemberUpdateForm(props: MemberUpdateFormProps): React.ReactElement;
