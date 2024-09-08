import { IKContext, IKUpload } from 'imagekitio-react';
import axios from "axios"
import { Paperclip } from 'lucide-react';
import { useRef } from 'react';





function Uploader({ setImg }) {
    const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT;
    const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
    const imgKitRef = useRef(null)

    const authenticator = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_IMGKIT_URL);


            const { signature, expire, token } = response.data;
            return { signature, expire, token };

        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };



    const onError = err => {
        setImg((prev) => ({ ...prev, isLoading: false }))
        console.log("Error", err);
    };


    const onSuccess = res => {
        setImg((prev) => ({ ...prev,src: res.url, isLoading: false }))
    };

    const onUploadProgress = progress => {
        // console.log("Progress", progress);
    };

    const onUploadStart = evt => {
        const file = evt.target.files[0]

        const reader = new FileReader();

        reader.onload = (e) => {
            // Set the result (image URL) to the state
            setImg({ src: e.target.result, isLoading: true })
        };

        // Read the file as a data URL (base64 string)
        reader.readAsDataURL(file);

        // console.log("Start", evt);
    };


    return (
        <div>
            <IKContext
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}
            >
                <IKUpload
                    fileName="test-upload.png"
                    onError={onError}
                    onSuccess={onSuccess}
                    useUniqueFileName={true}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    folder='/Nexus'
                    className='hidden'
                    ref={imgKitRef}
                    

                />

            </IKContext>

            <Paperclip onClick={() => imgKitRef.current.click()} className="cursor-pointer" />
        </div>
    );
}

export default Uploader;