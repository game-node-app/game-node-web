import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import React from "react";
import ThirdPartyPasswordlessReact from "supertokens-auth-react/recipe/thirdpartypasswordless";
import SessionReact from "supertokens-auth-react/recipe/session";
import Router from "next/router";

export const frontendConfig = () => {
    return {
        appInfo: {
            appName: "GameNode",
            apiDomain: process.env.NEXT_PUBLIC_DOMAIN_SERVER as string,
            websiteDomain: process.env.NEXT_PUBLIC_DOMAIN_WEBSITE as string,
            apiBasePath: "/v1/auth",
            websiteBasePath: "/auth",
        },
        recipeList: [
            ThirdPartyPasswordlessReact.init({
                contactMethod: "EMAIL",
                signInUpFeature: {
                    providers: [
                        ThirdPartyPasswordlessReact.Google.init(),
                        ThirdPartyPasswordlessReact.Github.init(),
                        ThirdPartyPasswordlessReact.Apple.init(),
                    ],
                },
            }),
            SessionReact.init(),
        ],
        // this is so that the SDK uses the next router for navigation
        windowHandler: (oI: any) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: any) => {
                        Router.push(href);
                    },
                },
            };
        },
    };
};

if (typeof window !== "undefined") {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokensReact.init(frontendConfig());
}

const SuperTokensProvider = ({ children }: { children: React.ReactNode }) => {
    return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};

export default SuperTokensProvider;
