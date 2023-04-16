function inizializza(){
    for (const box of boxes){
        box.addEventListener('click', onClick);
    }

    vett_controllo[0]=0;
    vett_controllo[1]=0;
    vett_controllo[2]=0;
    
}

function onClick(event){

    const item = event.currentTarget; 
    seleziona(item);  

}

function seleziona(item){
    const checkbox = item.querySelector('.checkbox');
    checkbox.src = CHECKED_IMG;
    item.classList.remove('unsel');
    item.classList.add('sel');
    aggiorna_vettore_controllo(item);
    aggiorna_vettore_risposte(item);

    qid = item.dataset.questionId;
    cid = item.dataset.choiceId;

    for(const box of boxes){
        if (box.dataset.questionId===qid && box.dataset.choiceId !== cid){
            box.classList.remove('sel');
            box.classList.add('unsel');
            checkbox2 = box.querySelector('.checkbox');
            checkbox2.src = UNCHECKED_IMG;
        }
    }

    controllo_fine();
}

function aggiorna_vettore_risposte(item){
    
    if(item.dataset.questionId === "one")
        vett_risposte[0] = item.dataset.choiceId;
    if(item.dataset.questionId === "two")
        vett_risposte[1] = item.dataset.choiceId;
    if(item.dataset.questionId === "three")
        vett_risposte[2] = item.dataset.choiceId;

}

function aggiorna_vettore_controllo(item){

    if(item.dataset.questionId === "one")
        vett_controllo[0] = 1;
    if(item.dataset.questionId === "two")
        vett_controllo[1] = 1;
    if(item.dataset.questionId === "three")
        vett_controllo[2] = 1;
}
    

function controllo_fine(){
    if(vett_controllo[0] === 1 && vett_controllo[1] === 1 && vett_controllo[2] === 1)
    fine();
}

function fine(){
    for(const box of boxes){
        box.removeEventListener('click', onClick);
    }

    calcola_risultato();
  
}

function calcola_risultato(){
    let win;

    if(vett_risposte[0] !== vett_risposte[1] && vett_risposte[1] !== vett_risposte[2] && vett_risposte[0] != vett_risposte[2])
        win = vett_risposte[0];
    else
    if(vett_risposte[0] === vett_risposte[1]) win = vett_risposte[0];
    else
    if(vett_risposte[1] === vett_risposte[2]) win = vett_risposte[1];
    else
    if(vett_risposte[0] === vett_risposte[2]) win = vett_risposte[2];

    visualizza_risultato(win);
    
}

function visualizza_risultato(win){

    document.querySelector("#intest").textContent = RESULTS_MAP[win].title;
    document.querySelector("#descr").textContent = RESULTS_MAP[win].contents;

    document.querySelector("#partefinale").classList.remove("hidden");
    document.querySelector("#descr").classList.remove("hidden");
    document.querySelector("#intest").classList.remove("hidden");
    document.querySelector("#butt").classList.remove("hidden");


}

function reset(){

    for(const box of boxes){
        box.classList.remove('sel');
        box.classList.remove('unsel');
        box.querySelector(".checkbox").src=UNCHECKED_IMG;
        }

        document.querySelector("#partefinale").classList.add("hidden");
        document.querySelector("#descr").classList.add("hidden");
        document.querySelector("#intest").classList.add("hidden");
        document.querySelector("#butt").classList.add("hidden");

        document.querySelector("#intest").textContent = '';
        document.querySelector("#descr").textContent = '';

        document.querySelector("header").scrollIntoView();

        inizializza();

}

const CHECKED_IMG = "images/checked.png";
const UNCHECKED_IMG = "images/unchecked.png";

const boxes = document.querySelectorAll('.choice-grid div');

const vett_controllo = new Array();
const vett_risposte = new Array();

inizializza();

document.querySelector("#butt").addEventListener('click', reset);

