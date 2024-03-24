

const Circle = () => {
    return (
        <div className="hidden cursor-pointer shadow-[0_4px_4px_0_#dbdbdb] w-[50px] h-[50px] md:flex justify-center items-center rounded-full bg-[#FAD0B7]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={25}
                height={25}
                color={"#e06c2e"}
                fill={"none"}>
                <path
                    d="M4 12L20 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}

export default Circle