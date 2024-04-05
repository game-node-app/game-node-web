import React, { PropsWithChildren } from "react";
import { Title, TitleProps } from "@mantine/core";
import Link from "next/link";

interface ITitleLinkProps extends PropsWithChildren<TitleProps> {
    href: string;
}

const TitleLink = ({ href, children, ...titleProps }: ITitleLinkProps) => {
    return (
        <Link href={href}>
            <Title
                {...titleProps}
                className={`underline ${titleProps.className}`}
            >
                {children}
            </Title>
        </Link>
    );
};

export default TitleLink;
