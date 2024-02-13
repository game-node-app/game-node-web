import React, { useState } from "react";
import useUserId from "@/components/auth/hooks/useUserId";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import {
    Box,
    Button,
    Group,
    Image,
    rem,
    Slider,
    Stack,
    Stepper,
    Text,
} from "@mantine/core";
import Cropper, { Area, Point } from "react-easy-crop";
import ImageDropzone from "@/components/general/ImageDropzone";
import { base64ToBlob, getCroppedImg } from "@/util/imageUtils";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "@/wrapper/server";

interface Props extends BaseModalChildrenProps {}

const PreferencesAvatarUploader = ({ onClose }: Props) => {
    const userId = useUserId();
    const profile = useUserProfile(userId);
    const [uploadedFileSrc, setUploadedFileSrc] = useState<string>();
    const [finalImageSrc, setFinalImageSrc] = useState<string>();
    const [dropZoneError, setDropZoneError] = useState<Error | undefined>(
        undefined,
    );

    /*
     * Cropper properties
     */
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState(1);
    /*
     * Stepper
     */
    const [currentStep, setCurrentStep] = useState<number>(0);

    const onCropComplete = async (_: Area, croppedAreaPixels: Area) => {
        const croppedImage = await getCroppedImg(
            uploadedFileSrc!,
            croppedAreaPixels,
        );
        setFinalImageSrc(croppedImage ?? undefined);
    };

    const handleStepClick = (step: number) => {
        const isOutOfBonds = step < 0 || step > 2;
        if (isOutOfBonds) return;
        if (step === 0) {
            setUploadedFileSrc(undefined);
            setFinalImageSrc(undefined);
        } else if (step === 1) {
            setFinalImageSrc(undefined);
        }

        setCurrentStep(step);
    };

    const profileAvatarMutation = useMutation({
        mutationFn: async () => {
            if (!finalImageSrc) {
                throw new Error("Invalid image source");
            }
            await ProfileService.profileControllerUpdate({
                avatar: await base64ToBlob(finalImageSrc!),
            });
        },
        onSuccess: () => {
            profile.invalidate();
            if (onClose) onClose();
        },
    });

    const handleImageUpload = () => {
        if (finalImageSrc == undefined) {
            handleStepClick(0);
            return;
        }
        profileAvatarMutation.mutate();
    };

    const renderBasedOnStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <ImageDropzone
                        maxFiles={1}
                        maxSize={2 * 1024 ** 2}
                        onDrop={(files) => {
                            const fileString = URL.createObjectURL(files[0]);
                            setUploadedFileSrc(fileString);
                            setCurrentStep(1);
                        }}
                    />
                );
            case 1:
                return (
                    <>
                        <Cropper
                            image={uploadedFileSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                        <Slider
                            mt={350}
                            min={1}
                            step={0.1}
                            max={2}
                            value={zoom}
                            onChange={setZoom}
                        />
                        <Group justify={"center"} mb={10}>
                            <Button
                                variant={"default"}
                                onClick={() => handleStepClick(0)}
                            >
                                Go back
                            </Button>
                            <Button onClick={() => handleStepClick(2)}>
                                Confirm
                            </Button>
                        </Group>
                    </>
                );
            case 2:
                return (
                    <>
                        <Image src={finalImageSrc} alt={"Your image result"} />
                        <Group justify={"center"} mb={10}>
                            <Button
                                variant={"default"}
                                onClick={() => handleStepClick(1)}
                            >
                                Go back
                            </Button>
                            <Button onClick={() => handleImageUpload()}>
                                Confirm
                            </Button>
                        </Group>
                    </>
                );
        }
    };

    return (
        <Stack className={"w-full"}>
            <Stepper
                active={currentStep}
                onStepClick={handleStepClick}
                allowNextStepsSelect={false}
                size={"sm"}
            >
                <Stepper.Step />
                <Stepper.Step />
                <Stepper.Step />
            </Stepper>
            {profileAvatarMutation.isError && (
                <Text c={"red"}>{profileAvatarMutation.error.message}</Text>
            )}
            <Stack className={"w-full h-full relative"}>
                {renderBasedOnStep()}
            </Stack>
        </Stack>
    );
};

export default PreferencesAvatarUploader;
