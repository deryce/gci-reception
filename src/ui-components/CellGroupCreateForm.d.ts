/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CellGroupCreateFormInputValues = {
    name?: string;
};
export declare type CellGroupCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CellGroupCreateFormOverridesProps = {
    CellGroupCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CellGroupCreateFormProps = React.PropsWithChildren<{
    overrides?: CellGroupCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CellGroupCreateFormInputValues) => CellGroupCreateFormInputValues;
    onSuccess?: (fields: CellGroupCreateFormInputValues) => void;
    onError?: (fields: CellGroupCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CellGroupCreateFormInputValues) => CellGroupCreateFormInputValues;
    onValidate?: CellGroupCreateFormValidationValues;
} & React.CSSProperties>;
export default function CellGroupCreateForm(props: CellGroupCreateFormProps): React.ReactElement;
