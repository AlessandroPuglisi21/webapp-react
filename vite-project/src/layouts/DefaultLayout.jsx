import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "../components/Loader";
import { useContext } from "react";
import GlobalContext from "../../../context/globalContext";


function DefaultLayout() {

    const { isLoading } = useContext(GlobalContext);
    return <div>
        <Header />
        <main>
        <Outlet />  
        </main>
        <Footer />
        {isLoading && <Loader />}
    </div>
}

export default DefaultLayout