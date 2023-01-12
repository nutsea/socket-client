import React from "react";
import './../styles/css/blocks/chat.css'

const Messages = ({ messages, name }) => {
    return (
        <div className="Messages">
            <div className="Scroller">
                { messages.map(({ user, message }, i) => {
                    const itsMe = user.name.toLowerCase() === name.toLowerCase()
                    const className = itsMe ? "Me" : "User"

                    return (
                        <div key={i} className={`${message} ${className}`}>
                            <div className="OneMessage">
                                <span className="User">
                                    {user.name}
                                </span>

                                <div className="Text">
                                    {message}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="Hidden-box"></div>
            </div>
        </div>
    )
}

export default Messages