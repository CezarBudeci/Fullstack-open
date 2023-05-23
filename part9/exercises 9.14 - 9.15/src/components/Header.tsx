import { HeaderProps } from "../types/HeaderTypes";

const Header = ({ courseName } : HeaderProps) => {
    return (
        <h1>{courseName}</h1>
    )
}

export default Header;