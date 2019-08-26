const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');


const renderCafe = (doc) => {
    let li = document.createElement("li");
    let name = document.createElement("span");
    let city = document.createElement("span");
    let cross = document.createElement('div');


    li.setAttribute("data-id", doc.id) //trae el id del doc en el que estamos y se lo agrega como id 
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = "x";

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);


    //deleteing data
    cross.addEventListener('click', (e => {
        e.stopPropagation(); //que hace?
        let idFirebase = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(idFirebase).delete();
    }));

}

// saving data 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value = '';
    form.city.value = '';
})


db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {

        if (change.type == 'added') {
            renderCafe(change.doc);

        } else if (change.type == 'removed') {
            li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);;
        }
    }); //this saves changes
})

// 1*  db.collection('').doc() ecuentra un elemento.
/* 1.1
    /*  no real time database
    // getting data 
    db.collection('cafes').get()
    .then((snapshot) => {
                //use PARAMETRO.docs.forEach
                snapshot.docs.forEach(doc => {

                    renderCafe(doc);
                })


            });
         */

/* 2
//at line 33-40
//using where
db.collection('cafes').where("city", "==", "Manchester").get()
    .then((snapshot) => {
        //use PARAMETRO.docs.forEach
        snapshot.docs.forEach(doc => {

            renderCafe(doc);
        })


    }); */


/*  3
//at line 33-40


    // orderBy 
db.collection('cafes').orderBy('name').get()
.then((snapshot) => {
    //use PARAMETRO.docs.forEach
    snapshot.docs.forEach(doc => {

        renderCafe(doc);
    })


}); */

/* 4
//at line 33-40
//using where y order by. Necesitas hacer indexes para que esto funcione
db.collection('cafes').where("city", "==", "Manchester").orderBy('name').get()
    .then((snapshot) => {
        //use PARAMETRO.docs.forEach
        snapshot.docs.forEach(doc => {

            renderCafe(doc);
        })


    }); */


// 5 set will delete the whole document. update will only update what you pass in the object.