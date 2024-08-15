import { Link } from "react-router-dom";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () =>Promise<void>;

}
const NavLink = (props: Props) => {
    console.log("props in line 12 navlink", props)
  return <Link
  onClick={props.onClick}
            className="nav-link" 
            to = {props.to} 
            style={{background: props.bg, color: props.textColor}}>
            {props.text}
          </Link>
}

export default NavLink
