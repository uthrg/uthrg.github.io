import React, { useState} from 'react';
import { Modal, Button } from "react-bootstrap";

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


<DeleteConfirm 
showModal={show} 
handleClose = {handleClose} 
handleDelete = {props.handleDelete} 
dinosaur={props.dinosaur} 
/>