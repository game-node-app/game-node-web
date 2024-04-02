import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import React from "react";
import ThirdPartyPasswordlessReact, {
    GetRedirectionURLContext,
} from "supertokens-auth-react/recipe/thirdpartypasswordless";
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
        getRedirectionURL: async (context: any) => {
            if (context.action === "SUCCESS" && context.newSessionCreated) {
                if (context.redirectToPath !== undefined) {
                    // we are navigating back to where the user was before they authenticated
                    return context.redirectToPath;
                }
                if (context.createdNewUser) {
                    // user signed up
                    return "/wizard/init";
                } else {
                    // user signed in
                }
                return "/";
            }
            return undefined;
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
