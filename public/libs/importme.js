// importme.js by Oles Odynets. May 2019

window.importJS = u => {
    const c = a => console.error(a);

    if(!u || typeof u !== "string" || !u.replace(/\s|\n/g, "").length) {
        return c("[IMPORTME] File path is invalid!");
    }

    const i = document.createElement('script');
    i.src = u;
    i.type = "text/javascript";
    i.addEventListener('error', () => {
        c(`File "${ u }" is not available!`);
    });
    document.head.appendChild(i);

    return;
}