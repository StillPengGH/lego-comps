declare const useComponentCommon: (props: any, picks: string[]) => {
    styleProps: import("vue").ComputedRef<Pick<any, string>>;
    handleClick: () => void;
};
export default useComponentCommon;
