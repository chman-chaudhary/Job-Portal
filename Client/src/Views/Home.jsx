import React from 'react'
import Navbar from "../Components/Navbar"
import HomePagePoster from '../Components/HomePagePoster'
import OpenRoles from '../Components/OpenRoles'
import PostJob from '../Components/PostJob'
import Footer from '../Components/Footer'
import HorizontalCard from "../Components/HorizontalCard"

const Home = () => {
    return (
        <div>
            <Navbar />
            <HomePagePoster />
            <HorizontalCard />
            <OpenRoles />
            <PostJob />
            <Footer />
        </div>
    )
}

export default Home
