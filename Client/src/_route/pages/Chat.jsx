import { useState } from "react";
import CustomForm from "../../Components/CustomForm";
import { useUser } from "@clerk/clerk-react";
import ReactMarkdown from 'react-markdown'
import { IKContext, IKImage } from "imagekitio-react";


const Chat = () => {

  const { user } = useUser()

  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT;

  const [messages, setMessages] = useState([])



  return (
    <div className="chat-screen">
      <div className="chat-wrapper">

        <div className="chat">
          {messages.map((msg, id) => (

            msg.role === "user" && msg.type === "Image" ?

            //display images with user message
              <div key={id} className="flex gap-3 justify-end  items-start">
                <div className="h-7 order-2 w-7 flex-center rounded-full overflow-hidden">
                  <img src={user.imageUrl} alt="me" />
                </div>

                <div className="flex flex-col relative">
                  <IKContext urlEndpoint={urlEndpoint}>
                    <IKImage
                      src={msg.Image}
                      width="300"
                      className="opacity-50"
                      loading="lazy"
                      lqip={{ active: true, quality: 5, blur: 10 }}
                    />
                  </IKContext>
                  <div className="chat-message user absolute -bottom-5 right-2"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                </div>
              </div>

              :
              //display user messages

              msg.role === "user" && msg.type === "text" ?
                <div key={id} className="flex gap-3 justify-end  items-start">
                  <div className="h-7 order-2 w-7 flex-center rounded-full overflow-hidden">
                    <img src={user.imageUrl} alt="me" />
                  </div>
                  <div className="chat-message user"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                </div>
                :

              //display ai response
                msg.content && <div key={id} className="flex">
                  <div>
                    <div className="h-7 w-7 bg-[url('/small-bot.png')] bg-center bg-no-repeat bg-contain" />
                  </div>
                  <div className={`chat-message`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>

          ))}

        </div>

        <CustomForm setMessages={setMessages} />
      </div>
    </div>
  );
}

export default Chat;
