import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { ColorContext } from '../../../context/ColorContext';
import { hexToRGB } from '../../../../utils/color/hexToRGB';
import { TEAM_INFO, TEAM_MODAL_INFO } from '../../../../constants/quiz';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FooterModal: FC<TProps> = ({ onClose, isOpen }) => {
  const { color } = useContext(ColorContext);

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        backgroundColor={`rgba(${hexToRGB(
          color,
          'values-only',
        ).toString()}, 1)`}
        color={'white'}
        borderRadius="15px">
        <ModalHeader>{TEAM_INFO}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text
            fontSize="lg"
            fontWeight="bold">
            {TEAM_MODAL_INFO}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
