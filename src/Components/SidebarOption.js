import React from 'react';
import "../Styles/SidebarOption.css";
import {useHistory} from "react-router-dom";
import db from '../Database/firebase';

function SidebarOption({Icon,title,onClick,id,addChannelOption}) {

    const history = useHistory();

    const selectChannel = () => {
        if (id) {
            history.push(`/room/${title}/${id}`);
        }
        else {
            history.push('title');
        }
    }

    const addChannel = () => {
        const channelName = prompt('Please enter the Channel Name');
        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
            });
        }
    }

    return (
        <div className="sidebarOption" onClick={id ? (addChannelOption ? addChannel : selectChannel) : onClick}>
            {Icon && <Icon className="sidebarOption__icon"/>}
            {Icon ? <h3>{title}</h3> : <h3 className="sidebarOption__channel"><span className="sidebarOption__hash">#</span> {title}</h3>}
        </div>
    );
}

export default SidebarOption;
