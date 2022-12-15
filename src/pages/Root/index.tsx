import { RootRedirects } from "./RootRedirects";

import '../../css/root.css';

export const RootPage = () => {
    return (
        <div id="root_aghAnimationContainer">
            <div id="root_circle"/>
            <img id="root_aghLogo" src="Logo.png" alt="Logo AGH"/>
            <div id="root_topBar"/>
            <div id="root_centralWrapper"/>
            <RootRedirects/>
        </div>
    )
}