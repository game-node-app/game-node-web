import React, { useEffect, useState } from "react";
import { loadLocale } from "@/i18n/i18n-util.sync";
import { detectLocale } from "@/i18n/i18n-util";
import { navigatorDetector } from "typesafe-i18n/detectors";
import TypesafeI18n from "@/i18n/i18n-react";

const TypesafeI18NProvider = ({ children }: { children: React.ReactNode }) => {
    // Detect locale
    // (Use as advanaced locale detection strategy as you like.
    // More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
    const locale =
        typeof window != "undefined" ? detectLocale(navigatorDetector) : "en";

    // Load locales
    // (Use a data fetching solution that you prefer)
    const [localesLoaded, setLocalesLoaded] = useState(false);
    useEffect(() => {
        loadLocale(locale!);
        setLocalesLoaded(true);
    }, [locale]);

    if (!localesLoaded) {
        return null;
    }

    return <TypesafeI18n locale={locale!}>{children}</TypesafeI18n>;
};

export default TypesafeI18NProvider;
