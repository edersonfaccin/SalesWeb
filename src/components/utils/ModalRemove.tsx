import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, 
    ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'

interface RemoveProps {
    visible?: boolean
    setVisible?: (val: boolean) => any
    onConfirmRemove?: any
}

const ModalRemove = (props: RemoveProps) => {

    const confirmRemove = () => {
        props.onConfirmRemove()
        props.setVisible(false)
    }
    
    return (
        <Modal isCentered isOpen={props.visible} onClose={() => props.setVisible(false)}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
                <ModalHeader>Confirmar remoção</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Confirma a remoção do registro, esta ação é irreversível</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => confirmRemove()}>
                        Sim
                    </Button>
                    <Button onClick={() => props.setVisible(false)}>Não</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalRemove