import { Box, Heading, HStack, IconButton } from "@chakra-ui/react";
import {
  Image,
  Modal,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import React, { useState } from "react";

const ProductCart = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    if (!pid) return; // ✅ Prevents errors if `pid` is undefined
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (!pid) return; // ✅ Prevents errors if `pid` is undefined
    const { success, message } = await updateProduct(pid, updatedProduct);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
      }}
      bg={bg}
    >
      <Image
        src={product.image || "https://via.placeholder.com/300"} // ✅ Prevents crashes if image is missing
        alt={product.name || "No Name"}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name || "Unnamed Product"} {/* ✅ Prevents undefined name */}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price || "0.00"} {/* ✅ Prevents undefined price */}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number" // ✅ Ensures input is numeric
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: Number(e.target.value), // ✅ Converts to number
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button value="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCart;
