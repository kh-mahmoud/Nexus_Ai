import { ArrowUp, CircleX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Uploader from "./upload/Uploader";
import { Spinner } from '@chakra-ui/react';
import { convertBlobToBase64, model } from "../lib/utils";

const CustomForm = ({ setMessages }) => {
    const endRef = useRef(null);
    const [Img, setImg] = useState();
    const [text, setText] = useState(null);
    const [history, setHistory] = useState([]);
    const [istyping, setisTyping] = useState(false)


    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const goBottom = () => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    };

    //ai text model
    const TextModel = async (message) => {
        setisTyping(true)

        const chat = model.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 800,
            },
        });

        let text = '';
        const result = await chat.sendMessageStream(message);

        let aiMessageId;

        setMessages((prev) => {
            const updatedMessages = [
                ...prev,
                { id: Date.now(), role: "model", type: "text", content: "" } // Placeholder for AI response
            ];
            aiMessageId = updatedMessages[updatedMessages.length - 1].id; // Store the id of the last message added to update later
            return updatedMessages;
        });


        for await (const chunk of result.stream) {
            const chunkText = await chunk.text();
            text += chunkText;

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiMessageId ? { ...msg, content: text } : msg  //update the last message with id to make it be streamed
                )
            );

            goBottom(); // Scroll to bottom after each chunk
        }

        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === aiMessageId ? { ...msg, content: text } : msg
            )
        );

        goBottom(); // Scroll to the bottom again once the streaming is done
        setisTyping(false)
        return text
    };

    //ai image model
    const ImageModel = async (prompt, base64Image, mimeType) => {

        setisTyping(true)

        try {
            const result = await model.generateContentStream([
                prompt,
                { inlineData: { data: base64Image, mimeType } },
            ]);

            let text = "";
            let aiMessageId;

            setMessages((prev) => {
                const updatedMessages = [
                    ...prev,
                    { id: Date.now(), role: "model", type: "text", content: "" } // Placeholder for AI response
                ];
                aiMessageId = updatedMessages[updatedMessages.length - 1].id; // Store the id to update later
                return updatedMessages;
            });

            for await (const chunk of result.stream) {
                const chunkText = await chunk.text();
                text += chunkText;

                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMessageId ? { ...msg, content: text } : msg
                    )
                );

                goBottom(); // Scroll to bottom after each chunk
            }

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiMessageId ? { ...msg, content: text } : msg
                )
            );

            goBottom(); // Scroll to the bottom again once streaming is done
            setisTyping(false)

            return text

        } catch (error) {
            console.error("Error processing the image with Gemini AI:", error);
            setisTyping(false)
            return "There was an issue processing the image.";
        }
    };

    //submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (istyping) return

        // get the input value
        const userMessage = e.target.prompt.value;

        if (Img) {
            // Convert image to base64 and get its MIME type
            const response = await fetch(Img.src);
            const blob = await response.blob();
            const base64Image = await convertBlobToBase64(blob);
            const mimeType = blob.type;

            // Update history with user message and image
            if (userMessage) {
                setHistory((prev) => [
                    ...prev,
                    {
                        role: "user",
                        parts: [{ text: userMessage }],
                    }
                ]);
            }

            // Add user message with image to state
            setMessages((prev) => [
                ...prev,
                { role: "user", type: "Image", content: userMessage, Image: Img.src },
            ]);

            // Clear input & image right after submitting
            setImg(null);
            setText(null);
            e.target.reset();
            goBottom();

            // Set AI messages 
            const aiResponse = await ImageModel(userMessage, base64Image, mimeType);


            // Update history with AI response
            if (aiResponse) {
                setHistory((prev) => [
                    ...prev,
                    { role: "model", parts: [{ text: aiResponse }] }
                ]);
            }

            goBottom();

        } else {
            // Update history with user message without image
            if (userMessage) {
                setHistory((prev) => [
                    ...prev,
                    { role: "user", parts: [{ text: userMessage }] }
                ]);
            }

            // Add user message without image to state
            setMessages((prev) => [
                ...prev,
                { role: "user", type: "text", content: userMessage },
            ]);

            // Clear input right after submitting
            setText(null);
            e.target.reset();
            goBottom();

            // Generate AI response and wait for it
            const aiResponse = await TextModel(userMessage);

            // Update history with AI response
            if (aiResponse) {
                setHistory((prev) => [
                    ...prev,
                    { role: "model", parts: [{ text: aiResponse }] }
                ]);
            }

            goBottom();
        }
    };


    return (
        <>
            {/*scroll point*/}
            <div ref={endRef} className="mb-2 opacity-0" />

            {/*check if bottom in view*/}
            <div ref={ref} className="opacity-0" />

            {/*go to bottom button*/}
            {!inView &&
                <div onClick={goBottom} className="to-bottom">
                    <img src="/arrow.png" alt="arrow" />
                </div>
            }

            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="form-container">

                    {/*disply uploaded image*/}
                    {Img &&
                        <div className="mb-2 mt-2">
                            <div
                                className={`image-container ${Img.isLoading && "opacity-55"}`}
                                style={{ backgroundImage: `url(${Img.src})` }}
                            >
                                {Img.isLoading && <Spinner className="absolute" />}
                                <CircleX onClick={() => setImg(null)} className="absolute close-icon -top-2 hidden -right-2" />
                            </div>
                        </div>
                    }

                    {/*form inputs*/}
                    <div className="flex justify-between items-center gap-2">
                        <Uploader setImg={setImg} />
                        <input onChange={(e) => setText(e.target.value)} name="prompt" placeholder="Tap message" className="custome-input" type="text" />
                        <button disabled={!text || istyping} type="submit" className="bg-[#605e68] p-1 rounded-full">
                            <ArrowUp className={`${text || istyping && "text-primary"}`} />
                        </button>
                    </div>

                </form>
                <p className="text-sm text-center text-gray-400">Nexus Ai can make errors Consider verifying important information.</p>
            </div>
        </>
    );
};

export default CustomForm;
