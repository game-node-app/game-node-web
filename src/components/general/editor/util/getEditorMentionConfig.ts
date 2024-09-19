import { Mention } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import EditorMentionList, {
    MentionSuggestion,
    SuggestionListRef,
} from "@/components/general/editor/EditorMentionList";
import tippy, { type Instance as TippyInstance } from "tippy.js";
import { SearchService } from "@/wrapper/search";
import { Profile, ProfileService } from "@/wrapper/server";

export default function getEditorMentionConfig() {
    // Poor man's cache
    let profiles: Profile[] | undefined = undefined;

    return Mention.configure({
        HTMLAttributes: {
            class: "mention",
        },
        suggestion: {
            items: async ({ query }): Promise<MentionSuggestion[]> => {
                try {
                    if (profiles == undefined) {
                        profiles =
                            await ProfileService.profileControllerFindAll();
                    }

                    return profiles
                        .map((profile) => ({
                            id: profile.userId,
                            label: profile.username,
                        }))
                        .filter((item) => {
                            return item.label
                                .toLowerCase()
                                .startsWith(query.toLowerCase());
                        })
                        .slice(0, 5);
                } catch (err) {
                    console.error(err);
                }

                return [];
            },
            render: () => {
                let component: ReactRenderer<SuggestionListRef> | undefined =
                    undefined;
                let popup: TippyInstance | undefined;

                return {
                    onStart: (props) => {
                        component = new ReactRenderer(EditorMentionList, {
                            props,
                            editor: props.editor,
                        });

                        if (!props.clientRect) {
                            return;
                        }

                        popup = tippy("body", {
                            getReferenceClientRect:
                                props.clientRect as () => DOMRect,
                            appendTo: () => document.body,
                            content: component.element,
                            showOnCreate: true,
                            interactive: true,
                            trigger: "manual",
                            placement: "bottom-start",
                        })[0];
                    },

                    onUpdate(props) {
                        component?.updateProps(props);

                        if (!props.clientRect) {
                            return;
                        }

                        popup?.setProps({
                            getReferenceClientRect:
                                props.clientRect as () => DOMRect,
                        });
                    },

                    onKeyDown(props) {
                        if (props.event.key === "Escape") {
                            popup?.hide();

                            return true;
                        }
                        if (component?.ref?.onKeyDown == undefined) {
                            return false;
                        }

                        return component?.ref?.onKeyDown(props);
                    },

                    onExit() {
                        popup?.destroy();
                        component?.destroy();

                        // Remove references to the old popup and component upon destruction/exit.
                        // (This should prevent redundant calls to `popup.destroy()`, which Tippy
                        // warns in the console is a sign of a memory leak, as the `suggestion`
                        // plugin seems to call `onExit` both when a suggestion menu is closed after
                        // a user chooses an option, *and* when the editor itself is destroyed.)
                        popup = undefined;
                        component = undefined;
                    },
                };
            },
        },
    });
}
