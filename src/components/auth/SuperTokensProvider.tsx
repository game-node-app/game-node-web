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
                        // TODO: Enable once it's approved
                        // ThirdPartyPasswordlessReact.Google.init(),
                        ThirdPartyPasswordlessReact.Discord.init(),
                    ],
                },
                onHandleEvent: (context) => {
                    // Sends user to /wizard/init on sign-up
                    if (context.action === "SUCCESS") {
                        if (
                            context.isNewRecipeUser &&
                            context.user.loginMethods.length === 1
                        ) {
                            Router.push("/wizard/init");
                        }
                    }
                },
            }),
            SessionReact.init(),
        ],
        windowHandler: (oI: any) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: string) => {
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
