



const Footer = () => {
    return (
        <footer className="hidden md:block bg-white h-[90px] border border-t-[#CCCCCC]">
            <div className="flex justify-between items-center md:px-8 max-w-[1200px] mx-auto mt-5">
                <p className="md:w-[450px] lg:w-auto">Copyright @{new Date().getFullYear()} All rights reserver | this project was made with ❤️ <a href="/" className="text-[#E06C2E] underline underline-offset-2">Terms & services</a></p>
                <div className="flex items-center">
                    <a href="https://twitter.com/" target="_blank">
                        {/* twiiter */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#9B460A"} fill={"none"}>
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        {/* instagram icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#9B460A"} fill={"none"}>
                            <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="https://www.pinterest.com" target="_blank">
                        {/* pinterest icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#9B460A"} fill={"none"}>
                            <path d="M12 11L8 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.97368 16.5724C10.5931 16.8473 11.2787 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.9108 7.24367 13.7646 7.66921 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer