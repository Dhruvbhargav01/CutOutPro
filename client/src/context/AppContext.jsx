import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [credit, setCredit] = useState(5);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);


    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    // to get the credit data from the API
    const loadCreditsData = async () => {
        try {

            const token = await getToken();
            const { data } = await axios.get(
                backendUrl + '/api/user/credits',
                { headers: { token } }
            );

            if (data.success) {
                setCredit(data.credits);
                console.log(data.credits);
            }
        } catch (error) {
            console.log("Error in loadCreditsdata funcn of AppContext.jsx");
            toast.error(error.message);
        }
    }

    const removeBg = async (image) => {
        try {

            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(image);
            setResultImage(false);

            navigate('/result');

            const token = await getToken();

            //WHERE WE SEND OUR IMG TO BACKEND
            const formData = new FormData();
            image && formData.append('image', image);

            const { data } = await axios.post(
                backendUrl + '/api/image/remove-bg',
                formData,
                {
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    //     "Content-Type": "multipart/form-data"
                    // }
                    headers: { token }
                }
            )
            //call the image API

            if (data.success) {
                setResultImage(data.resultImage);
                data.creditBalance && setCredit(data.creditBalance)
            } else {
                toast.error(data.message);
                data.creditBalance && setCredit(data.creditBalance);
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }

        } catch (error) {
            console.log("Error in removeBg function of AppContext.jsx");
            toast.error(error.message);
        }
    }

    const value = {
        credit, setCredit, loadCreditsData, backendUrl,
        image, setImage,
        removeBg,
        resultImage, setResultImage,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;