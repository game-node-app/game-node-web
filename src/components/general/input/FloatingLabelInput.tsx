import {
    ChangeEvent,
    ChangeEventHandler,
    ComponentProps,
    useState,
} from "react";
import { TextInput, createStyles, rem, clsx } from "@mantine/core";

const useStyles = createStyles(
    (theme, { floating }: { floating: boolean }) => ({
        root: {
            position: "relative",
        },

        label: {
            position: "absolute",
            zIndex: 2,
            top: rem(7),
            left: theme.spacing.sm,
            pointerEvents: "none",
            color: floating
                ? theme.colorScheme === "dark"
                    ? theme.white
                    : theme.black
                : theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[5],
            transition:
                "transform 150ms ease, color 150ms ease, font-size 150ms ease",
            transform: floating
                ? `translate(-${theme.spacing.sm}, ${rem(-28)})`
                : "none",
            fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
            fontWeight: floating ? 500 : 400,
        },

        input: {
            "&::placeholder": {
                transition: "color 150ms ease",
                color: !floating ? "transparent" : undefined,
            },
        },
    }),
);

export interface IFloatingLabelInputProps
    extends ComponentProps<typeof TextInput> {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function FloatingLabelInput({
    label,
    value,
    onChange,
    ...props
}: IFloatingLabelInputProps) {
    const [focused, setFocused] = useState(false);
    const { classes } = useStyles({
        floating: value.trim().length !== 0 || focused,
    });

    return (
        <TextInput
            {...props}
            label={label}
            classNames={{
                root: clsx(classes.root, props.classNames?.root),
                label: clsx(classes.label, props.classNames?.label),
                input: clsx(classes.input, props.classNames?.input),
            }}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );
}
