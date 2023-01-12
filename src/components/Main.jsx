import React from "react";
import "./../styles/css/reset.css"
import "./../styles/css/base.css"
import "./../styles/css/blocks/header.css"
import "./../styles/css/blocks/home.css"
import "./../styles/css/blocks/footer.css"
// import "./../js/script.js"
import background from "./../img/new-wallpaper.svg"
import { Link } from "react-router-dom";
import { useState } from "react";

const FIELDS = {
    NAME: "name",
    ROOM: "room",
}

const Main = () => {
    const { NAME, ROOM } = FIELDS 

    const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" })

    const handleChange = ({target: { value, name }}) => {
        setValues({ ...values, [name]: value })
    }

    const handleClick = (e) => {
        const isDisabled = Object.values(values).some(v => !v)

        if(isDisabled) e.preventDefault()
    }
    
    return ( 
        <div className="container1">
            <img className="Bg" src={background} alt="bg" />
            <header>
                <header className="Header">
                    <div className="Container">
                        <div className="Header-row">
                            <div className="Header-logo"><a href="./index.html" className="Logo"><strong>Не <p className="Logo-digit">500</p> злобных карт</strong></a></div>
                            {/* <div className="Account">
                                <button className="Sign-up">Регистрация</button>
                                <button className="Sign-in">Вход</button>
                            </div> */}
                        </div>
                    </div>
                </header>
            </header>

            <div className="Home-container">
                <div className="Start">
                    <h1 className="Room-h">Вход в комнату</h1>
                    <input 
                        className="Room-code"
                        name="room"
                        value={values[ROOM]}
                        maxLength="4"
                        placeholder="Код комнаты"
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="Nickname"
                        name="name"
                        value={values[NAME]}
                        maxLength="20"
                        type="text"
                        placeholder="Имя"
                        required
                        onChange={handleChange}
                    />
                    <div className="Text-field__counter"></div>
                    <Link 
                        onClick={handleClick}
                        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
                    >
                        <button className="Btn">Войти</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default Main;