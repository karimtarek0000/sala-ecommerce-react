import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";

const AlertModal = forwardRef((props: IAlertModal, ref: Ref<any>) => {
  const { title, subTitle, btnSubmitTitle, btnDenyTitle, isLoading, onSubmit } =
    props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => onOpen(),
    close: () => onClose(),
  }));

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{subTitle}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            {btnDenyTitle}
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={onSubmit}
            isLoading={isLoading}
          >
            {btnSubmitTitle}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default AlertModal;
