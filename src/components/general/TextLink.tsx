import React, { PropsWithChildren } from "react";
import { Text, TextProps } from "@mantine/core";
import Link from "next/link";

interface ITextLinkProps extends PropsWithChildren<TextProps> {
    href: string;
}

const TextLink = ({ href, children, ...textProps }: ITextLinkProps) => {
    return (
        <Link href={href}>
            <Text {...textProps} className={`underline ${textProps.className}`}>
                {children}
            </Text>
        </Link>
    );
};

export default TextLink;
