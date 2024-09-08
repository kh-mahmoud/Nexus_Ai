import { FilePenLine, PanelRightOpen } from "lucide-react";
import { useLocation } from "react-router-dom";




const ChatList = ({ open, setOpen }) => {

    const location = useLocation()


    return (

        <div className={`sidebar ${!open ? "min-w-[0px] w-0" : "min-w-[250px] w-[250px]"}  ${location.pathname === "/" && 'hidden'}`}>

            <div className="sidebar-header">

                <div className="button-motion">
                    <PanelRightOpen onClick={() => setOpen(false)} />
                </div>

                <div className="button-motion">
                    <FilePenLine className="cursor-pointer" />
                </div>
            </div>

            <hr />

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

        </div>
    );
}

export default ChatList;
