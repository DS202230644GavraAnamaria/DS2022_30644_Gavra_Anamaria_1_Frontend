import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Modal, ModalBody, ModalHeader, Nav, Navbar,} from "reactstrap";
import l from "../../commons/images/icon1.png";
import i from "../../commons/images/insert.png";
import d from "../../commons/images/delete.png";
import u from "../../commons/images/update.png";
import m from "../../commons/images/mapping.png";
import AdminContainer from "./admin-container";
import {Tab, Tabs, Typography} from "@mui/material";
import PropTypes from "prop-types";
import CrudForm from "./crud-form";
import MappingForm from "./mapping-form";



const s1 = {
    height:70,
};

const s2 = {
    //height:70,
};
const s3 = {
    height:68,
    width:200,
    fontSize:20,
};
const listStyle = {
    height:90,
    fontSize:20,
    textAlign:'left',
    textDecoration:'bolt',
};



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function NavigationBar() {

    const [state, setState] = React.useState({
        left: false,
    });


    const toggleDrawer =
        ( open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    (event.key === 'Tab' ||
                event.key === 'Shift')
            ) {
                    return;
                }
                setState({ ...state, left: open });
            };

    const reload = () => {
        setState({
            isLoaded: false
        });
        toggleForm();
    }

    const [sel, setSel] = React.useState({
        insert: false,
        update: false,
        delete: false,
        mapping: false,
    });
    const toggleForm = (s:String)  =>{
        if(s==="insert")
            setSel({ ...sel, insert:!sel.insert });
        else if(s==="delete")
            setSel({ ...sel, delete:!sel.delete });
        else if(s==="update")
            setSel({ ...sel, update:!sel.update });
        else if(s==="mapping")
            setSel({ ...sel, mapping:!sel.mapping });
    }


    const list = () => (
        <Box
            sx={{ width : 250 }}
            role="presentation"
            onClick={toggleDrawer( false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                    <ListItem  key={'INSERT'} disablePadding>
                        <ListItemButton onClick={() =>toggleForm("insert")} style={listStyle}>
                            <ListItemIcon>
                                <img src={i} width={"25"}
                                     height={"20"} />
                            </ListItemIcon>
                            <ListItemText primary={'INSERT'} />
                        </ListItemButton>
                    </ListItem>
                <ListItem  key={'UPDATE'} textAlign={'left'} disablePadding>
                        <ListItemButton textAlign={'left'}  onClick={() =>toggleForm("update")}  style={listStyle}>
                            <ListItemIcon>
                                <img src={u} width={"30"}
                                     height={"25"} />
                            </ListItemIcon>
                            <ListItemText primary={'UPDATE'} />
                        </ListItemButton>
                    </ListItem>
                <ListItem  key={'DELETE'} disablePadding>
                        <ListItemButton  onClick={() =>toggleForm("delete")}  style={listStyle}>
                            <ListItemIcon>
                                <img src={d} width={"25"}
                                     height={"20"}/>
                            </ListItemIcon>
                            <ListItemText  primary={'DELETE'} />
                        </ListItemButton>
                    </ListItem>
                .
            </List>
            <Divider />

            <List>
                    <ListItem  key={'Create user-device mapping'} disablePadding>
                        <ListItemButton  onClick={() =>toggleForm("mapping")}  style={listStyle}>
                            <ListItemIcon>
                                <img src={m} width={"30"}
                                     height={"30"}/>
                            </ListItemIcon>
                            <ListItemText primary={'Create user-device mapping'} />
                        </ListItemButton>
                    </ListItem>
            </List>
        </Box>
    );


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div > <div >
                <Navbar style={s1} color="dark" light expand="md">
                    <Button onClick={toggleDrawer( true)}> <img src={l} width={"50"}
                                                                       height={"35"} /></Button>
                    <React.Fragment key={'left'}>
                            <SwipeableDrawer
                                anchor={'left'}
                                open={state['left']}
                                onClose={toggleDrawer( false)}
                                onOpen={toggleDrawer( true)}
                            >
                                {list()}
                            </SwipeableDrawer>
                        </React.Fragment>

                    <Nav style={s2} className="mr-auto" navbar>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1 }}>
                                <Tabs value={value} onChange={handleChange}   sx={{
                                    '& .MuiTabs-indicator': { backgroundColor: 'blue' },
                                    '& .MuiTab-root': { color: 'white' },
                                    '& .Mui-selected': { color: 'white' },
                                }}
                                      >
                                    <Tab style={s3} label="User" {...a11yProps(0)} />
                                    <Tab style={s3} label="DEVICE" {...a11yProps(1)} />
                                    <Tab style={s3} label="MAPPING" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                        </Box>
                    </Nav>
                </Navbar>
        </div>
            {value === 0 && <AdminContainer index={0}/>}
            {value === 1 && <AdminContainer index={1}/>}
            {value === 2 && <AdminContainer index={2}/>}

            <Modal isOpen={(sel.insert && value!==2)} toggle={() =>toggleForm("insert")}
                   size="lg">
                <ModalHeader toggle={() =>toggleForm("insert")}> Add: </ModalHeader>
                <ModalBody>
                    {value === 0 && <CrudForm tab={0} oper={0} reloadHandler={reload}/>}
                    {value === 1 && <CrudForm tab={1} oper={0} reloadHandler={reload}/>}
                </ModalBody>
            </Modal>

            <Modal isOpen={(sel.update && value!==2)} toggle={() =>toggleForm("update")} size="lg">
                <ModalHeader toggle={() =>toggleForm("update")}> Update: </ModalHeader>
                <ModalBody>
                    {value === 0 && <CrudForm oper={1} tab={0} reloadHandler={reload}/>}
                    {value === 1 && <CrudForm oper={1} tab={1} reloadHandler={reload}/>}
                </ModalBody>
            </Modal>

            <Modal isOpen={(sel.delete && value!==2)} toggle={() =>toggleForm("delete")} size="lg">
                <ModalHeader toggle={() =>toggleForm("delete")}>Delete: </ModalHeader>
                <ModalBody>
                    {value === 0 && <CrudForm tab={0} oper={2} reloadHandler={reload}/>}
                    {value === 1 && <CrudForm tab={1} oper={2} reloadHandler={reload}/>}
                </ModalBody>
            </Modal>

            <Modal isOpen={(sel.mapping && value===2)} toggle={() =>toggleForm("mapping")} size="lg">
                <ModalHeader toggle={() =>toggleForm("mapping")}>Mapping: </ModalHeader>
                <ModalBody>
                     <MappingForm tab={2} oper={3} reloadHandler={reload}/>
                </ModalBody>
            </Modal>


        </div>

    );
}