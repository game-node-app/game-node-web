import { Center, Title } from "@mantine/core";

interface Props {
    message: string;
}

const CenteredErrorMessage = ({ message }: Props) => {
    return (
        <Center className={"w-full h-full"}>
            <Title c={"red"} size={"h4"}>
                {message}
            </Title>
        </Center>
    );
};

export default CenteredErrorMessage;
