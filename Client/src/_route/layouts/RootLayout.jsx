import { Link, Outlet, useLocation } from "react-router-dom";
import { SignedIn, UserButton } from '@clerk/clerk-react'
import ChatList from "../../Components/ChatList";
import {useState } from "react";
import { FilePenLine, PanelLeftOpen} from "lucide-react";
import DrawerComponent from "../../Components/DrawerComponent";




const RootLayout = () => {

    const [open, setOpen] = useState(true)
    const location = useLocation()
  



    return (
        <div >
            <div className="flex">

                <ChatList open={open} setOpen={setOpen} />

                <div className="flex flex-col w-full">

                    <div className="h-[60px] w-full">

                        <header className={`header ${location.pathname !== "/" && 'bg-[#12101b]'} `}>
                             {
                                <DrawerComponent/>
                             }

                            <div className="flex gap-6">
                                {!open &&
                                    <div className="flex gap-2 max-md:hidden items-center">
                                        <div className="button-motion">
                                            <PanelLeftOpen onClick={() => setOpen(true)} />
                                        </div>

                                        <div className="button-motion">
                                            <FilePenLine className="cursor-pointer" />
                                        </div>
                                    </div>
                                }
                                <Link className="flex gap-2 items-center" to={"/"}>
                                    <img height={32} width={32} src="/logo.png" alt="logo" />
                                    <span>Nexus Ai</span>
                                </Link>
                            </div>

                            <div className="scale-125 flex-center">
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                        </header>

                    </div>

                    <main><Outlet /></main>

                </div>

            </div>


        </div>
    );
}

export default RootLayout;
