import React from "react";

function Footer() {
    return (
        <footer className="info">
            <p>Click to edit a todo</p>
            <p>Created by <a href="https://d12n.me/">Ahmet Akdoğan</a></p>
        </footer>
    )
}

export default React.memo(Footer);