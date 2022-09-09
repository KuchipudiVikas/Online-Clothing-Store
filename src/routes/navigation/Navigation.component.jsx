import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";
import './navigation.styles.scss';
import { userContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(userContext);
    // console.log(currentUser);
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }
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
                            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                        )

                            : (<Link className="nav-link" to="/auth">
                                SIGN IN
                            </Link>
                            )}
                </div>

            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;