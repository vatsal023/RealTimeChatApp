import {useAuth} from "../context/authContext"
import CustomerLogos from "../components/CustomerLogos";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LandingNav from "../components/LandingNav";
import Payments from "../components/Payment";

const Home = () =>{
    const {isAuthenticated} = useAuth();

    return (
        <div className="bg-dark">
            <LandingNav/>
            <Hero/>
            <Features/>
            <Payments/>
            <CustomerLogos/>
            <Footer/>
        </div>
    )
}

export default Home;