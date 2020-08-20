import React from 'react'
import Nav from "../components/Nav"

export default function BasicLayout(props) {
    return (
        <>
            <Nav />
            {props.children}
        </>
    )
}