import attention from "../assets/attantion.svg"

const RemovePopUp = ({ onRemove }) => {


    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute bg-[#ebebeb] opacity-10 inset-0"></div>
            <div className="relative z-50 border p-6 bg-white rounded-[10px]">
                <div className="flex flex-col items-center">
                    <img src={attention} alt="attention icon" className="w-[50px] mb-3" />
                    <p className="mb-3 text-center text-[#6E6E6E] font-semibold max-w-[270px]">Are you sure you wan to delete this post</p>
                    <div className="flex items-center justify-between w-full px-2">
                        <button onClick={onRemove} className="bg-[#FDC6C6] text-[#C10606] px-4 py-[5px] rounded-[20px]">Cancel</button>
                        <button className="bg-[#85D466] text-white px-4 py-[5px] rounded-[25px]">Yes! Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemovePopUp