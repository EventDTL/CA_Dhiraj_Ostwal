import './followus.css'
function FollowUs() {
    return (
        <>
            {/* Start our last post */}
            <section className="news-section">
        <div className="header">
            <h2 className="theme_color"><span >Fol</span>low Us</h2>
            <h3>Find here our latest Post.</h3>
        </div>
        <div className="auto-container">
            <div className="column">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcadhirajostwal%2F&tabs=timeline&width=520&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="80%" height="500"></iframe>
            </div>
            <div className="column">
                <iframe src="https://www.instagram.com/cadhirajostwal/embed/" width="100%" height="500"></iframe>
            </div>
        </div>
    </section>
            {/* end our last post */}</>
    )
}
export default FollowUs;