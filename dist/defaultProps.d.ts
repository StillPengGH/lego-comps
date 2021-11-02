export interface CommonElementProps {
    actionType: string;
    url: string;
    height: string;
    width: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;
    borderStyle: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
    boxShadow: string;
    opacity: string;
    position: string;
    left: string;
    top: string;
    right: string;
}
export declare const commonDefaultProps: CommonElementProps;
export interface TextElementProps extends CommonElementProps {
    text: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    lineHeight: string;
    textAlign: string;
    color: string;
    backgroundColor: string;
}
export declare const textDefaultProps: TextElementProps;
export interface ImageElementProps extends CommonElementProps {
    src: string;
}
export declare const imageDefaultProps: ImageElementProps;
export declare const textStylePropsKeys: string[];
export declare const imageStylePropsKeys: string[];
export declare const isEditingProp: {
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const transformToComopnentProps: <T extends {}>(props: T) => { [P in keyof T]: {
    type: StringConstructor;
    default: T[keyof T];
}; } & {
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
};
