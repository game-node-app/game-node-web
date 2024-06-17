import { Report } from "@/wrapper/server";

export default function reportCategoryToString(category: string) {
    switch (category) {
        case Report.category.SPAM:
            return "Spam";
        default:
            return "Not available";
    }
}
