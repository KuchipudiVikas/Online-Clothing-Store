import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";
import './navigation.styles.scss';
import { userContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";


const Navigation = () => {
    const { currentUser } = useContext(userContext);
    const { isCartOpen } = useContext(CartContext);
    // console.log(currentUser);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <Crwnlogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                        )

                            : (<Link className="nav-link" to="/auth">
                                SIGN IN
                            </Link>
                            )}
                    < CartIcon />
                </div>
                {isCartOpen && <CartDropDown />}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;