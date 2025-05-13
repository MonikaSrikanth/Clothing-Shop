const Hero = () => {
    return (
        <section id="hero"
            className="hero-section w-full h-screen bg-cover bg-center bg-no-repeat" 
            style={{ 
                backgroundImage: "url('bgimg2.jpg')", 
                backgroundSize: 'cover',  // Ensures the image covers the screen
                backgroundPosition: 'center center', // Center the image
            }}
        >
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Style that Defines You</h1>
                <p className="text-lg mb-6">Discover the latest trends in fashion.</p>
                <a href="#3"><button className="bg-white text-black px-6 py-3 text-lg font-semibold rounded-md hover:bg-gray-200 transition">
                    Explore Collection
                </button></a>
            </div>
        </section>
    );
};

export default Hero;
