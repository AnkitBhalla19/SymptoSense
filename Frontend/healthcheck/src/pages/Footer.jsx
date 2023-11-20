import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return <footer>
        <p className="text-center p-4">
            Copyright © {currentYear}
        </p>
    </footer>
}

export default Footer;