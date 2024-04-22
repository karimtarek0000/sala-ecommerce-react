import { HStack, Image, ImageProps, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IImagePreview extends ImageProps {
  label: string;
  children: ReactNode;
  imgExist: boolean;
}

function ImagePreview(props: IImagePreview) {
  const { label, children, imgExist, ...rest } = props;

  return (
    imgExist && (
      <VStack overflow={"hidden"} boxSize="200px" mx={"auto"}>
        <HStack width={"100%"} justifyContent={"space-between"}>
          <Text>{label}</Text>
          {children}
        </HStack>
        <Image {...rest} />
      </VStack>
    )
  );
}

export default ImagePreview;
