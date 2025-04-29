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
export declare type CellGroupUpdateFormInputValues = {
    name?: string;
};
export declare type CellGroupUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CellGroupUpdateFormOverridesProps = {
    CellGroupUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CellGroupUpdateFormProps = React.PropsWithChildren<{
    overrides?: CellGroupUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    cellGroup?: any;
    onSubmit?: (fields: CellGroupUpdateFormInputValues) => CellGroupUpdateFormInputValues;
    onSuccess?: (fields: CellGroupUpdateFormInputValues) => void;
    onError?: (fields: CellGroupUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CellGroupUpdateFormInputValues) => CellGroupUpdateFormInputValues;
    onValidate?: CellGroupUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CellGroupUpdateForm(props: CellGroupUpdateFormProps): React.ReactElement;
