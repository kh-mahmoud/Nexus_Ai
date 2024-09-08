import { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import { FilePenLine, PanelsLeftBottom } from "lucide-react";




const DrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()


  return (
    <>
      <div ref={btnRef} onClick={onOpen} className="sm:hidden">
        <div className="button-motion">
          <PanelsLeftBottom className="cursor-pointer" />
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="!bg-secondary">

          <DrawerHeader className="flex-between">
            <div className="button-motion">
              <PanelsLeftBottom onClick={() => onClose()} className="cursor-pointer" />
            </div>

            <div className="button-motion">
              <FilePenLine className="cursor-pointer" />
            </div>
          </DrawerHeader>
          <hr />

          <DrawerBody>
            <div className="sidebar-content flex-center h-[calc(100vh-60px)]">
              {/* <h6 className="text-[10px] font-semibold">RECENT CHATS</h6>

              <div className="mt-3">
                <p className="button-motion">New chat</p>
                <p className="button-motion">New chat</p>
                <p className="button-motion">New chat</p>
                <p className="button-motion">New chat</p>
                <p className="button-motion">New chat</p>
                <p className="button-motion">New chat</p>

              </div> */}
              <div className="button-motion">Update Coming Soon</div>

            </div>
          </DrawerBody>


        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerComponent;
