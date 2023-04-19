import { FC, useContext } from 'react';
import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColorContext } from '../../context/ColorContext';
import { hexToRGB } from '../../../utils/color/hexToRGB';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  BASE_LINK,
  EMAIL,
  motionDefaults,
  PHONE_NUMBER,
  TEAM_INFO,
} from '../../../constants/quiz';
import { AnimatePresence, motion } from 'framer-motion';
import { FooterModal } from './Modal/FooterModal';

const ChakraFlex = motion(Flex);

export const Footer: FC = () => {
  const { color } = useContext(ColorContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AnimatePresence>
      <ChakraFlex
        key={color}
        {...motionDefaults}
        py={4}
        px={{ base: 2, sm: 8 }}
        justifyContent="space-between"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={100}
        backgroundColor={`rgba(${hexToRGB(
          color,
          'values-only',
        ).toString()}, 0.8)`}
        color="white">
        <FooterModal
          isOpen={isOpen}
          onClose={onClose}
        />
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center">
          <Image
            boxSize="40px"
            src={`${BASE_LINK}/images/Team_logo.png`}
            alt="Logo"
          />

          <Button
            fontSize={{ base: 'xs', sm: 'sm' }}
            textAlign={{ base: 'center', sm: 'left' }}
            fontWeight="bold"
            onClick={onOpen}
            backgroundColor="transparent"
            _hover={{ backgroundColor: 'transparent' }}>
            {TEAM_INFO}
          </Button>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent={{ base: 'space-evenly', md: 'space-between' }}
          fontWeight="bold">
          <Link
            href={`tel:${PHONE_NUMBER}`}
            style={{ textDecoration: 'none' }}
            fontSize={{ base: 'xs', sm: 'sm' }}>
            <PhoneIcon
              w={6}
              h={6}
              mr={2}
            />
            <Text display={{ base: 'none', md: 'inline' }}>{PHONE_NUMBER}</Text>
          </Link>
          <Link
            href={`mailto:${EMAIL}`}
            style={{ textDecoration: 'none' }}
            fontSize={{ base: 'xs', sm: 'sm' }}
            ml={13}>
            <EmailIcon
              w={6}
              h={6}
              mr={2}
            />
            <Text display={{ base: 'none', md: 'inline' }}>{EMAIL}</Text>
          </Link>
        </Flex>
      </ChakraFlex>
    </AnimatePresence>
  );
};
