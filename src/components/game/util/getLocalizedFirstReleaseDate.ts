export function getLocalizedFirstReleaseDate(
    date: string,
    locale: string = "en-US",
) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        return null;
    }

    return dateObj.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
