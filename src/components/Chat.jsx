import React from "react";
import io from 'socket.io-client'
import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from "react";
import background from "./../img/new-wallpaper.svg"
import './../styles/css/blocks/chat.css'
import Messages from "./Messages";

const socket = io.connect('https://chat-online-zph6.onrender.com')

const Chat = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const [params, setParams] = useState({ room: '', user: ''})
    const [state, setState] = useState([])
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState(0)

    function lastMessageScroll() {
        let e = document.querySelector('.Hidden-box')
        if (!e) return
        e.scrollIntoView({
            behavior: 'auto',
            block: 'start',
        })
    }

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams)
        socket.emit('join', searchParams)
    }, [search])

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((_state) => ([ ..._state, data ]))
            lastMessageScroll()
        })
    }, [])

    useEffect(() => {
        socket.on('room', ({ data: { users } }) => {
            setUsers(users.length)
        })
    }, [])

    const leftRoom = () => {
        socket.emit('leftRoom', { params })
        navigate('/')
    }

    const handleChange = ({ target: {value} }) => setMessage(value)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message) return

        socket.emit('sendMessage', { message, params })

        setMessage('')
    }

    return ( 
        <div className="container1">
            <img className="Bg" src={background} alt="bg" />
            <header>
                <header className="Header">
                    <div className="Container">
                        <div className="Header-row">
                            <div className="Header-logo"><a href="./index.html" className="Logo"><strong>Не <p className="Logo-digit">500</p> злобных карт</strong></a></div>
                        </div>
                    </div>
                </header>
            </header>

            <div className="Chat-container">
                <div className="Window">
                    <div className="Header-mini">
                        <div className="Room">
                            { params.room }
                        </div>
                        <div className="Users">
                            Участников: { users }
                        </div>
                        <button className="Leaving" onClick={ leftRoom }>
                            Выйти
                        </button>
                    </div>

                    <Messages messages={state} name={params.name} />

                    <form className="Form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            placeholder="Your message"
                            value={message}
                            className="Mess-input"
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        ></input>
                        <div className="Sender">
                            <input 
                                type="submit"
                                onSubmit={handleSubmit}
                                className="Send"
                                value="Отправить сообщение"
                            >
                            </input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Chat;
