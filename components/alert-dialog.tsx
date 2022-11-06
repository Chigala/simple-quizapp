import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

interface DialogProps {
  setShowSubmitModal: () => void;
  handleSubmit: () => void;
  showSubmitModal: boolean;
}

export const Dialog = (props: DialogProps) => {
  const { handleSubmit, setShowSubmitModal, showSubmitModal } = props;
  const cancelRef = React.useRef<any>();

  return (
    <>
      <AlertDialog
        size={"2xl"}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={setShowSubmitModal}
        isOpen={showSubmitModal}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            Are you sure you want to submit?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Submitting now will make further changes to be unavailable
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={setShowSubmitModal}>
              No
            </Button>
            <Button colorScheme="green" ml={3} onClick={handleSubmit}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
