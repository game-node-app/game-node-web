import React from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import PreferencesScreen from "@/components/preferences/PreferencesScreen";

const Index = () => {
    return (
        <SessionAuth>
            <PreferencesScreen />
        </SessionAuth>
    );
};

export default Index;
