import React from 'react'
import './button.css'

export function Button1({ text = "Button" }) {
    return (
        <button className="custom-fonts text-white py-5 px-6 min-h-16 min-w-60 rounded-full bg-[#353DFF] border-none signup-shadow font-semibold">
            {text}
        </button>
    )
}

export function Button2({ text = "Button" }) {
    return (
        <button className="custom-fonts bg-[#F6F6F6] text-[#303030] py-5 px-6 min-h-16 min-w-60 rounded-full border-none learn-btn-shadow font-semibold">
            {text}
        </button>
    )
}

export function Button2Sm({ text = "Button" }) {
    return (
        <button className="rounded-full min-w-28 min-h-9 px-6 py-3 bg-[#F6F6F6] text-[#303030] overflow-hidden inline-block relative learn-btn-shadow text-[14px] align-middle font-bold">{text}</button>
    );
}

export function Button3({ text = "Button" }) {
    return (
        <button className="btn-3 custom-fonts mt-10 font-bold mb-8 text-xl w-60 h-14">
            {text}
        </button>
    )
}

export function Button3Sm({ text = "Button" }) {
    return (
        <button className="btn-3 custom-fonts w-64 h-14 ml-5 font-bold">
            {text}
        </button>
    );
}
