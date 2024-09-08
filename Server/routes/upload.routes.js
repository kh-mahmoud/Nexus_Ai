import express from "express"
import ImageKit from "imagekit";



const router = express.Router()


router.get("/imgKit/auth", (req, res) => {

    const imagekit = new ImageKit({
        urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
    });



    const result = imagekit.getAuthenticationParameters();
     


    res.send(result);
})



export default router