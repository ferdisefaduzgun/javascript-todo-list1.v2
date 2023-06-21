const inputDom = document.getElementById('yaz');
const ekleButton = document.getElementById("ekle");
const ulListe = document.querySelector("#ul-ekle");
const btnClear = document.querySelector('#btnClear');
const clearButton = document.querySelector('.clearButton');

class Storage{
    static addTodoStorage(ekleneceklerArrayi){
        let storage = localStorage.setItem("todo", JSON.stringify(ekleneceklerArrayi)); // arrayin içindekileri storageye ekler /EKLEME İŞLEMİ
        return storage;
    }

    static getStorage(){
        let storage = localStorage.getItem("todo") === null
        ? [] 
        : JSON.parse(localStorage.getItem("todo"));
        return storage
    }
}

let ekleneceklerArrayi = Storage.getStorage();


ekleButton.addEventListener("click", function (e) {
        e.preventDefault();
        let sira = ekleneceklerArrayi.length +1;
        let veri = inputDom.value;
        const todo = new Todo(sira,veri)
        ekleneceklerArrayi.push(todo);
        ekleneceklerArrayi.reverse();
        UI.eklemeAlert('Eklendi')
        UI.clearInput(); //1- boyle kullanılır.
        UI.displayTodos();
        // locale ekle
        Storage.addTodoStorage(ekleneceklerArrayi);
} )

class Todo{
    constructor(sira, veri){
        this.sira = sira;
        this.veri = veri;
    }
}

class UI { //classların baş harfi buyuk olr

    static displayTodos(){
        let result = "";
        if (ekleneceklerArrayi.length === 0) {
            ulListe.innerHTML = "liste boş!"
        } else {          
            ekleneceklerArrayi.forEach((item) => { //foreach herdöndüğünde demek.
                result += `                  
                <li>
                <span id="ul-ekle">${item.veri}</span>
                <button data-sira="${item.sira}" class="remove">Sil</button>
                </li>
                `
            })   
            ulListe.innerHTML = result; //burda ekliyoruz
        } 
    }


    static clearInput(){  //1-bir daha buna değişken oluşturmadan, başına static ekleyerek direkt istediğimiz yerde kullanabiliriz.
        inputDom.value = "";
    }


    static eklemeAlert(text){
        window.alert(text);
    }

    static removeTodo(){
        ulListe.addEventListener("click", function(e){
            if (e.target.classList.contains("remove")) {
                e.target.parentElement.remove(); //kapsayıcısını sil
                let btnId = e.target.dataset.sira;
                UI.removeArrayTodo(btnId);
                
            }
        })
    }

    static removeArrayTodo(sira){
        ekleneceklerArrayi = ekleneceklerArrayi.filter((item) => item.sira !== +sira);
        Storage.addTodoStorage(ekleneceklerArrayi);
        UI.eklemeAlert("todo silindi")
        UI.displayTodos()
    }

    static clearTodos(){
        clearButton.addEventListener("click", function(){
            ekleneceklerArrayi = [];
            Storage.addTodoStorage(ekleneceklerArrayi);
            UI.displayTodos();
            UI.eklemeAlert("Tüm liste silindi")
        })
    }

}



window.addEventListener("DOMContentLoaded", function () { //sayfa ilk yüklendiğinde çağrılacaklar
    UI.removeTodo();
    UI.displayTodos();
    UI.clearTodos();
})






        //old project
/* inputDom.addEventListener("change", function (event) {
    textInputValue = event.target.value
})


ekleButton.addEventListener("click", tiklama)
function tiklama(e) {
    e.preventDefault();
    eklenecekler.push({ id: eklenecekler.length + 1, baslik: textInputValue });

    inputDom.value = "";
    displayTodos();
}


function displayTodos() {
    if (eklenecekler.length === 0) {
        ulListe.innerHTML = "liste boş!"
    } else {
        let result = "";
        eklenecekler.forEach((item) => {
            result += `                  
            <li>
            <span id="ul-ekle">${item.baslik}</span>
            <button onclick="deleteListe(${item.id})" >Sil</button>
            </li>
            `
        })

        ulListe.innerHTML = result;
    }
}

function deleteListe(id) {
    let deletedId;

    for (let index in eklenecekler) {
        if (eklenecekler[index].id == id) {
            deletedId = index;
        }

        eklenecekler.splice(deletedId, 1)
        displayTodos();
    }
}

function clearTodos() {
    eklenecekler.splice(0, eklenecekler.length);
    displayTodos();
}

displayTodos()
 */

