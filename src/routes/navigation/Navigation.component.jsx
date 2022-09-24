import { Outlet, Link } from "react-router-dom";

import { Fragment, useContext } from "react";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";
import { userContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles'

const Navigation = () => {
    const { currentUser } = useContext(userContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <Crwnlogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        )

                            : (<NavLink to="/auth">
                                SIGN IN
                            </NavLink>
                            )}
                    < CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropDown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;