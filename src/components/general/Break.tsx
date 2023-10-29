import React, { ComponentPropsWithoutRef } from "react";

interface IBreakProps extends ComponentPropsWithoutRef<"div"> {}

const Break = ({ ...props }: IBreakProps) => {
    return <div className="w-full h-0" {...props}></div>;
};

export default Break;
