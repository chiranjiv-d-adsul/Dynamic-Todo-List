import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const PopupModal = ({ isOpen, onClose, onSave, task }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [newTask, setNewTask] = useState({
    title: task ? task.title : "",
    description: task ? task.description : "",
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset newTask state when modal is closed
      setNewTask({
        title: "",
        description: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(newTask);
  };

  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    initialFocusRef={initialRef}
    finalFocusRef={finalRef}
    closeOnOverlayClick={false}
  >
    <ModalOverlay />
    <div className="fixed inset-0 flex items-center justify-center ">
      <ModalContent className="w-[90%] max-w-[600px] sm:mx-auto mx-[10%]  sm:my-[15%] my-[30%] gap-8 p-6 border-2 bg-white rounded-lg">
        <ModalHeader className="flex justify-between font-bold">
          Edit your Task
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pb={6}>
          <FormControl className="gap-5 flex flex-col">
            <FormLabel>
              Kindly Enter the Title and Description of the Task
            </FormLabel>
            <Input
              ref={initialRef}
              className="h-[40px] w-full border-2 "
              name="title"
              value={newTask.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              ref={initialRef}
              className="h-[40px] w-full border-2 "
              name="description"
              value={newTask.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </FormControl>
          </ModalBody>
          <ModalFooter className="gap-4 text-white font-medium">
            <Button
              className=" px-4 bg-[#a1a1e4]  py-2 rounded-md hover:bg-[blue]"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#a1a1e4]  px-4 py-2 rounded-md hover:bg-[blue] "
              onClick={handleSave}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default PopupModal;
