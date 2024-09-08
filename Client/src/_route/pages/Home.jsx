import Lottie from "lottie-react";
import { useRef } from "react";
import { MouseParallax } from "react-just-parallax";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { animation } from "../../lib/Lotties";

const Home = () => {
    const parallaxRef = useRef(null);

    return (
        <div className="hero_section ">
            <img src="/orbital.png" alt="orbit" className="orbit" />
            <div className="fixed rotate-[30deg] translate-y-4 -translate-x-2 -z-10 -right-72 scale-75 max-lg:hidden" >
                <Lottie loop={true} animationData={animation} />
            </div>

            {/* left Side */}
            <div className="flex-col-center flex-1 relative text-center gap-3">
                <h1 style={{ backgroundClip: 'text' }} className="title">
                    Nexus Ai
                </h1>
                <h2 className="text-xl font-semibold">Supercharge your creativity and productivity</h2>

                <h3 className="max-w-[80%] font-normal h-auto">
                    <ReactTyped
                        strings={[
                            "Unlock the power of conversational AI for seamless brainstorming, instant responses,and endless creativity.",
                            "Elevate your ideas to new heights with AI-driven insights and innovation."
                        ]}
                        backSpeed={30}
                        typeSpeed={40}
                        loop
                        showCursor={false}
                    />
                </h3>
                <Link to={"/dashboard"} className="btn">Get Started</Link>
            </div>

            {/*right Side*/}

            <div ref={parallaxRef} className="flex-1 flex justify-center  relative  max-lg:hidden  h-full ">
                <div className="imgContainer" >
                    <div className="bgContainer" />
                    <img src="/bot.png" alt="bot" width={420} height={420} className="z-10" />

                    {/* Use parallaxContainerRef to limit the effect */}
                    <MouseParallax isAbsolutelyPositioned shouldResetPosition={true} parallaxContainerRef={parallaxRef}>
                        <div className="message bottom-4 -right-14">
                            <img src="/small-bot.png" alt="bot" width={32} height={32} className="rounded-full" />
                            <p>AI-powered assistance at your fingertips!</p>
                        </div>
                    </MouseParallax>

                    <MouseParallax isAbsolutelyPositioned parallaxContainerRef={parallaxRef}>
                        <div className="message top-10 -left-24">
                            <img src="/small-bot.png" alt="bot" width={32} height={32} className="rounded-full" />
                            <p>Let&apos;s make your ideas come to life!</p>
                        </div>
                    </MouseParallax>

                    <MouseParallax isAbsolutelyPositioned parallaxContainerRef={parallaxRef}>
                        <div className="message top-16 -right-24">
                            <img src="/small-bot.png" alt="bot" width={32} height={32} className="rounded-full" />
                            <p>ready for action!</p>
                        </div>
                    </MouseParallax>
                </div>
            </div>


        </div>
    );
};

export default Home;
