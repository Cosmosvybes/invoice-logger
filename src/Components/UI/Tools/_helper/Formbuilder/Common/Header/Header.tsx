import logo from "../../../../../../../assets/HatchfulExport-All(1) (2)/logo_transparent.png"
const Header = () => {
  return (
    <>
      <div className="relative h-auto max-sm:h-auto flex justify-start">
        <img src={logo} alt="image-logo" className="w-44 h-24 object-contain" />
      </div>
    </>
  );
};

export default Header;
