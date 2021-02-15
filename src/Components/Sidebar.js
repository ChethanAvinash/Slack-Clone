import React,{useState,useEffect} from 'react'
import '../Styles/Sidebar.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import db from '../Database/firebase';
import {useStateValue} from '../Providers/StateProvider'


function Sidebar() {
    const [{user}] = useStateValue();

    const [showAll,setshowAll] = useState(true);
    const [showChannels,setshowChannels] = useState(false);
    const [channels,setChannels] = useState([]);

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot =>(
            setChannels(snapshot.docs.map(doc => ({
                            id: doc.id,
                            name: doc.data().name,
                        }
                    )
                )
            )
        ))
    }, [])

    const handleShow = () => setshowAll(!showAll);
    const handleChannelShow = () => setshowChannels(!showChannels);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>My Channel</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </div>
                <CreateIcon />
            </div>
            <div className="sidebar__body">
                <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
                <SidebarOption Icon={InboxIcon} title="Mentions and Reactions"/>
                
                {showAll ? 
                        (   <div>
                                <SidebarOption Icon={DraftsIcon} title="Saved items"/>
                                <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser"/>
                                <SidebarOption Icon={PeopleAltIcon} title="People and user groups"/>
                                <SidebarOption Icon={AppsIcon} title="Apps"/>
                                <SidebarOption Icon={FileCopyIcon} title="File browser"/>
                            </div>

                        ) : <div />}
                {showAll ? <SidebarOption Icon={ExpandLessIcon} title="Show less" onClick={handleShow}/> : <SidebarOption Icon={ExpandMoreIcon} title="Show more" onClick={handleShow}/>}
                <hr/>
                {showChannels ? 
                    (   
                        <div>
                            {channels.map(channel => (
                                <SidebarOption title={channel.name} id={channel.id} key={channel.id}/>
                            ))}
                        </div>

                    ) : <div />}
                {showChannels ? <SidebarOption Icon={ExpandLessIcon} title="Show less" onClick={handleChannelShow}/>:<SidebarOption Icon={ExpandMoreIcon} title="Channels" onClick={handleChannelShow}/>}
                <hr />
                <SidebarOption Icon={AddIcon} id addChannelOption addButton title="Add Channel"/>
            
            </div>
        </div>
    )
}

export default Sidebar;
