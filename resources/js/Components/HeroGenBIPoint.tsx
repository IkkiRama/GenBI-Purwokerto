const HeroGenBIPoint = () => (
    <div className="h-full lg:h-screen xl:h-full max-w-[1700px]">
        <div className="lg:mt-20 relative grid lg:grid-cols-2 pt-10 lg:px-10 px-5 lg:max-h-[700px] max-h-screen overflow-y-hidden after:absolute ">
            <div className="h-full flex-col justify-center items-center pt-20">
            <h4 className="text-2xl font-semibold text-blue-700 mb-5">
                GenBI Point
            </h4>
            <h1 className="font-semibold text-[#111] lg:text-5xl text-4xl lg:leading-[60px] mb-16 dark:text-gray-200">
                Bersama Membangun Komunitas yang Kuat<br />Memberdayakan Setiap Individu untuk<br />Meraih Tujuan dan Impian
            </h1>
            <a href="https://points.genbipurwokerto.com" target='_blank' className="bg-blue-700 px-10 py-5 rounded-full text-white">
                Jelajahi Sekarang
            </a>
            </div>
            <div className="grid grid-cols-2 gap-5 lg:rotate-3 lg:-mt-20 mt-20 overflow-hidden">
            <div className="grid grid-cols-1 gap-5 animate-scroll-to-t">
                <div className="row-span-2 h-[500px] rounded-md overflow-hidden">
                <img
                    src="./images/fajar.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="row-span-2 h-[500px] rounded-md overflow-hidden">
                <img
                    src="./images/nia.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="row-span-2 h-[500px] rounded-md overflow-hidden">
                <img
                    src="./images/stevani.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                </div>
            </div>
            {/*  */}
            <div className="animate-scroll-to-b">
                <div className="h-[240px] -mt-52 rounded-md overflow-hidden">
                <img
                    src="./images/fajar.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="h-[240px] mt-5 rounded-md overflow-hidden">
                <img
                    src="./images/nia.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="h-[240px] mt-5 rounded-md overflow-hidden">
                <img
                    src="./images/stevani.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="h-[240px] mt-5 rounded-md overflow-hidden">
                <img
                    src="./images/fajar.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                </div>
            </div>
            </div>
        </div>
    </div>

)

export default HeroGenBIPoint;
