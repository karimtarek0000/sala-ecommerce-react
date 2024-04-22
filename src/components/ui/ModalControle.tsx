import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

const ModalControle = forwardRef(
  ({ title, whenClose, children }: IModalControle, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onCloseHandler = () => {
      if (whenClose) whenClose();
      onClose();
    };

    useImperativeHandle(ref, () => ({
      open: () => onOpen(),
      close: () => onCloseHandler(),
    }));

    return (
      <Modal
        onClose={onCloseHandler}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

export default ModalControle;
