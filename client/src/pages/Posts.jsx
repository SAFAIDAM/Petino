import Footer from "../components/Footer"
import Space from "../components/Space"
import Navbar from "../components/Navbar"
import RenderPosts from "../components/RenderPosts"
import "../components/style.css"


const Posts = () => {
    return (
        <>
            <Navbar />
            <Space />
            <RenderPosts />
            <Footer />
        </>
    )
}

export default Posts
