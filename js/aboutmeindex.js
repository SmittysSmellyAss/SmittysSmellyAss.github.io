fetch('site_items/indexpage/aboutme.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_imballen");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})