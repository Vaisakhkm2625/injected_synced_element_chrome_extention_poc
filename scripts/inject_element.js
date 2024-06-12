document.body.insertAdjacentHTML('afterbegin', '<div id="my-extension-root"></div>');
document.body.insertAdjacentHTML('afterbegin', '<input id="untrustedinp"></input>');


const updateElement = (value) => {
    let wrapper = document.getElementById('my-extension-root');
    wrapper.innerHTML = `<div>
        <h1>${value}</h1>
    </div>`;

}

let inp = document.getElementById('untrustedinp');
inp.addEventListener('input', (e) => {
    console.log("trying to set to " + e.target.value);
    chrome.storage.local.set({ number: e.target.value }, () => {
        console.log("number set to " + e.target.value);
    });
});
updateElement(1);

document.body.style.border = "1px solid red";



chrome.storage.onChanged.addListener((changes, area) => {
    console.log("changed")
    chrome.storage.local.get('number', (data) => {
        updateElement(data.number);
    });
})

