
fetch('/site_items/nav/logolink.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_logolinkuh");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})