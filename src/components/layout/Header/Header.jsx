import ProfileImg from "../../../assets/images/profile.png";
export default function Header() {
  return (
    <div className=" h-[90px] border-b border-[#B0B0B0]">
      <div className="flex justify-between items-center h-full">
        <p>Book World</p>
        <div className="flex items-center gap-2">
          <div className="size-[50px] bg-red-400 rounded-[10px] overflow-hidden">
            <img
              src={ProfileImg}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-2xl text-[#3E435D]">Jacob Jones</p>
        </div>
      </div>
    </div>
  );
}
