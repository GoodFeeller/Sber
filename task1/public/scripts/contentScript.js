document.querySelectorAll(".table-label").forEach((elem) => {
    elem.addEventListener('click', (e) => {
        let id = e.target.id
        let label = e.target.value
        let level = e.target.parentNode.parentNode.id
        let data = JSON.stringify({id: id, level: level})
        let request = new XMLHttpRequest();
        request.open("POST", "/add", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", () => {
            let answer = JSON.parse(request.response)
            e.target.value = label + ' | ' + answer.label;
            let lvl = parseInt(level.split('_')[1]) + 1
            e.target.parentNode.parentNode.id = level.split('_')[0] + '_' + lvl
            if (answer.ifLeaf === false) e.target.setAttribute('disabled', 'disabled');
        })
        request.send(data)
    })
})
document.querySelectorAll(".delete-btn").forEach( delete_element)
document.getElementById("add_tb2_submit").addEventListener("click", add_element)
document.querySelectorAll(".change-btn").forEach(change_element)

function add_element(e) {
    let addForm = document.forms['add_tb2'];
    let info = addForm.elements["info"].value;
    let data = JSON.stringify({info: info})
    let request = new XMLHttpRequest();
    request.open("POST", "/add_tb2", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", () => {
        let answer = JSON.parse(request.response)
        let tr = document.createElement("tr")
        let td_id =document.createElement("td")
        let td_info = document.createElement('td')
        let td_change = document.createElement('td')
        let td_delete = document.createElement('td')
        let btn_delete = document.createElement('button')
        let btn_change = document.createElement('button')
        td_change.className = "btn-td"
        td_delete.className = "btn-td"
        btn_change.className = "change-btn"
        btn_change.textContent = "Изменить"
        btn_delete.className = "delete-btn"
        btn_delete.textContent = "Удалить"
        td_delete.append(btn_delete)
        td_change.append(btn_change)
        td_info.textContent = answer.info
        td_id.textContent = answer.id
        tr.append(td_id, td_info, td_change, td_delete)
        tr.id = "tb2|" + answer.id;
        document.getElementById("tb2").append(tr)
    })
    request.send(data)
}
function change_element(elem) {
    elem.addEventListener('click', (e) => {
        let id = e.target.parentNode.parentNode.id.split('|')[1];
        let tr_table = e.target.parentNode.parentNode
        let info = tr_table.querySelectorAll('td')[1].textContent
        tr_table.removeChild(tr_table.querySelectorAll('td')[1])
        tr_table.removeChild(tr_table.querySelectorAll('td')[1])
        tr_table.removeChild(tr_table.querySelectorAll('td')[1])
        let td_input = document.createElement("td")
        let inputInfo = document.createElement('input')
        inputInfo.value = info
        inputInfo.className = "info-input"
        inputInfo.id = "inputInfo"
        td_input.append(inputInfo)
        let td_sub = document.createElement('td')
        let btnSub = document.createElement('button')
        td_sub.append(btnSub);
        btnSub.textContent = "Сохранить"
        btnSub.onclick = () => {
            info = inputInfo.value;
            console.log(info)
            let data = JSON.stringify({id: id, info: info})
            let request = new XMLHttpRequest();
            request.open("POST", "/change_tb2", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", () => {
                if(request.status != 400) {
                    let td_info = document.createElement('td')
                    let td_change = document.createElement('td')
                    let td_delete = document.createElement('td')
                    let btn_delete = document.createElement('button')
                    let btn_change = document.createElement('button')
                    tr_table.removeChild(tr_table.querySelectorAll('td')[1])
                    tr_table.removeChild(tr_table.querySelectorAll('td')[1])
                    delete_element(btn_delete)
                    change_element(btn_change)
                    btn_change.className = "change-btn"
                    btn_change.textContent = "Изменить"
                    btn_delete.className = "delete-btn"
                    btn_delete.textContent = "Удалить"
                    td_delete.className = "btn-td"
                    td_change.className = "btn-td"
                    td_delete.append(btn_delete)
                    td_change.append(btn_change)
                    td_info.textContent = info
                    tr_table.append(td_info, td_change, td_delete)
                }
            })
            request.send(data)
        }
        tr_table.append(td_input, td_sub)
        console.log(info)
    })
}
function delete_element(elem) {
    elem.addEventListener('click', (e) => {
        let id = e.target.parentNode.parentNode.id.split('|')[1];
        let data = JSON.stringify({id: id})
        let request = new XMLHttpRequest();
        request.open("POST", "/delete_tb2", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", () => {
            if (request.status !== 400) {
                e.target.parentNode.parentNode.remove();
            }
        })
        request.send(data)
    })
}