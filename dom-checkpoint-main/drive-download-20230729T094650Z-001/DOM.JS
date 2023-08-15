/**********************************************************************
 *  PREPARATION DE LA LISTE DES PRODUITS
 * ********************************************************************/
let products = [
  {
    id: 1,
    nom: "sweat shirt beige",
    image: "vet1.png",
    description: "couleur beige avec logo doggy",
    prix: 45,
    instock: 21,
  },
  {
    id: 2,
    nom: "t-shirt beige",
    image: "vet2.png",
    description: "couleur beige avec logo doggy",
    prix: 25,
    instock: 51,
  },
  {
    id: 3,
    nom: "bonet gris",
    image: "vet3.png",
    description: "couleur gris logo doggy.",
    prix: 30,
    instock: 93,
  },
];

// ======================================conact============================
/******************************************************
 *                  TRAITEMENT DU PANIER               *
 ******************************************************/

// SELECTION DES  ELEMENTS
const produits = document.querySelector(".produits");
const panierElements = document.querySelector(".panier-elements");
const subtotal = document.querySelector(".subtotal");
const totalElementsInPanier = document.querySelector(
  ".total-elements-in-panier"
);

//Fonction d'affichage des produits 1
function affichageProduits() {
  products.forEach((produit) => {
    produits.innerHTML += `
    <div class="card col-md-3 element" style="width: 21rem; display: flex; justify-content: space-around; margin: 80px; background-color: transparent; background-color: gray;">
   <img src="${produit.image}" class="card-img-top" alt="...">
     <div class="card-body element-container">
     <h3 class="card-title"> ${produit.nom}</h5>
     <p class='card-text'>"${produit.description}</p>
     <h4 class='card-text'>${produit.prix}  €</h4>
     <a   onclick="addToPanier(${produit.id})" class='btn btn-primary add-to-panier' id="${produit.id}" >Ajouter au panier</a>
     </div></div>
     `;
  });
}

affichageProduits();

//appelle de la focntion pour l'affichage

// Declaration du panier à vide ou récupération du contenu via le localStorage
let panier = [] || JSON.parse(localStorage.getItem("PANIER"));

//Mise à jour du panier
updatePanier();
//console.log(panier);

//Fonction d'ajout produit dans le panier
function addToPanier(id) {
  // verification si le produit n'existe pas dans le panier
  if (panier.some((element) => element.id === id)) {
    //on augmente juste la quantité si le produit existe dèjà dans le panier
    changeQuantity("plus", id);
  } else {
    const element = products.find((produit) => produit.id === id);
    panier.push({
      ...element,
      quantite: 1,
    });
  }
  //rappelle de la fonction de mise à jour pour actualiser
  updatePanier();
}

//Mise à jour des valeurs des elements du panier et sauvegarde dans le localStorage
function updatePanier() {
  affichageElementsPanier();
  affichageSubtotal();

  //sauvegarde des données du panier dans le local storage
  localStorage.setItem("PANIER", JSON.stringify(panier));
}

//Cacul et affichage du subtotal
function affichageSubtotal() {
  let totalPrix = 0,
    totalElements = 0;

  panier.forEach((element) => {
    totalPrix += element.prix * element.quantite;
    totalElements += element.quantite;
  });
  subtotal.innerHTML = `Subtotal (${totalElements} elements) : ${totalPrix.toFixed(
    2
  )} €)`;
  totalElementsInPanier.innerHTML = totalElements;
}

// Affichage des elements du panier
function affichageElementsPanier() {
  panierElements.innerHTML = ""; // vider le panier
  panier.forEach((element) => {
    panierElements.innerHTML += `
    <div class="panier-element" id="produit${element.id}">
    <div class="element-info" >
        <h4>${element.nom}</h4>
    </div>
    <div class="unit-prix">
    ${element.prix}<small> €</small>
    </div>
    <div class="units">
        <div class="btn minus" onclick="changeQuantity('minus', ${element.id})">-</div>
        <div class="number">${element.quantite}</div>
        <div class="btn plus" onclick="changeQuantity('plus', ${element.id})">+</div>           
    </div>
    <div><button class="btn btn-danger" id=${element.id} onclick="removeElementFromPanier(${element.id})" type="button">Supprimmer</button></div>
    </div>
     `;
  });
}

//Supprimer un element du apnier
function removeElementFromPanier(id) {
  // panier = panier.filter((element)=> element.id !== id);
  panier.splice(id, 1);
  console.log(id);
  $("#produit" + id).remove();
  //mise à jour du panier
  updatePanier();
}

//changement de la quantité
function changeQuantity(action, id) {
  panier = panier.map((element) => {
    let quantite = element.quantite;
    if (element.id === id) {
      if (action === "minus" && quantite > 1) {
        quantite--;
      } else if (action == "plus" && quantite < element.instock) {
        quantite++;
      }
    }
    return {
      ...element,
      quantite,
    };
  });
  updatePanier();
}
// ==================================================2==========================================
// article2===================
// let products2 = [
//   {
//     id2: 4,
//     nom2: "sweat shirt jaune graffity",
//     image2: "graf1.png",
//     description2: "couleur jaune avec style graffity",
//     prix2: 45,
//     instock2: 21,
//   },
//   {
//     id2: 5,
//     nom2: "sweat shirt beige",
//     image2: "vet1.png",
//     description2: "couleur beige avec logo doggy",
//     prix2: 45,
//     instock2: 21,
//   },
//   {
//     id2: 6,
//     nom2: "sweat shirt beige",
//     image2: "vet1.png",
//     description2: "couleur beige avec logo doggy",
//     prix2: 45,
//     instock2: 21,
//   },
// ];
// // SELECTION DES  ELEMENTS
// const produits2 = document.querySelector2(".produits");
// const panierElements2 = document.querySelector2(".panier-elements");
// const subtotal2 = document.querySelector2(".subtotal");
// const totalElementsInPanier2 = document.querySelector2(
//   ".total-elements-in-panier"
// );
// //Fonction d'affichage des produits 2
// function affichageProduits2() {
//   products2.forEach((produit2) => {
//     produits2.innerHTML += `
//     <div class="card col-md-3 element" style="width: 21rem; display: flex; justify-content: space-around; margin: 80px; background-color: transparent; background-color: gray;">
//    <img src="${produit2.image2}" class="card-img-top" alt="...">
//      <div class="card-body element-container">
//      <h3 class="card-title"> ${produit2.nom2}</h5>
//      <p class='card-text'>"${produit2.description2}</p>
//      <h4 class='card-text'>${produit2.prix2}  €</h4>
//      <a   onclick="addToPanier(${produit2.id2})" class='btn btn-primary add-to-panier' id="${produit2.id2}" >Ajouter au panier</a>
//      </div></div>
//      `;
//   });
// }
// //appelle de la focntion pour l'affichage
// affichageProduits2();

// // Declaration du panier à vide ou récupération du contenu via le localStorage
// let panier2 = [] || JSON.parse(localStorage.getItem("PANIER"));

// //Mise à jour du panier
// updatePanier2();
// //console.log(panier);

// //Fonction d'ajout produit dans le panier
// function addToPanier2(id2) {
//   // verification si le produit n'existe pas dans le panier
//   if (panier2.some((element2) => elemen2t.id2 === id2)) {
//     //on augmente juste la quantité si le produit existe dèjà dans le panier
//     changeQuantity2("plus", id2);
//   } else {
//     const element2 = products2.find((produit2) => produit2.id2 === id2);
//     panier2.push({
//       ...element2,
//       quantite2: 1,
//     });
//   }
//   //rappelle de la fonction de mise à jour pour actualiser
//   updatePanier2();
// }

// //Mise à jour des valeurs des elements du panier et sauvegarde dans le localStorage
// function updatePanier2() {
//   affichageElementsPanier2();
//   affichageSubtotal2();

//   //sauvegarde des données du panier dans le local storage
//   localStorage.setItem("PANIER", JSON.stringify(panier2));
// }

// //Cacul et affichage du subtotal
// function affichageSubtotal2() {
//   let totalPrix2 = 0,
//     totalElements2 = 0;

//   panier2.forEach((element2) => {
//     totalPrix2 += element.prix2 * element.quantite2;
//     totalElements2 += element2.quantite2;
//   });
//   subtotal2.innerHTML = `Subtotal (${totalElements2} elements) : ${totalPrix2.toFixed(
//     2
//   )} €)`;
//   totalElementsInPanier2.innerHTML = totalElements2;
// }

// // Affichage des elements du panier
// function affichageElementsPanier2() {
//   panierElements2.innerHTML = ""; // vider le panier
//   panier2.forEach((element2) => {
//     panierElements2.innerHTML += `
//     <div class="panier-element" id="produit${element2.id2}">
//     <div class="element-info" >
//         <h4>${element2.nom2}</h4>
//     </div>
//     <div class="unit-prix">
//     ${element2.prix2}<small> €</small>
//     </div>
//     <div class="units">
//         <div class="btn minus" onclick="changeQuantity('minus', ${element2.id2})">-</div>
//         <div class="number">${element2.quantite2}</div>
//         <div class="btn plus" onclick="changeQuantity('plus', ${element2.id2})">+</div>
//     </div>
//     <div><button class="btn btn-danger" id=${element2.id2} onclick="removeElementFromPanier(${element2.id2})" type="button">Supprimmer</button></div>
//     </div>
//      `;
//   });
// }

// //Supprimer un element du apnier
// function removeElementFromPanier2(id2) {
//   // panier = panier.filter((element)=> element.id !== id);
//   panier2.splice(id2, 1);
//   console.log(id2);
//   $("#produit" + id2).remove();
//   //mise à jour du panier
//   updatePanier2();
// }

// //changement de la quantité
// function changeQuantity2(action2, id2) {
//   panier2 = panier2.map((element2) => {
//     let quantite2 = element2.quantite2;
//     if (element2.id2 === id2) {
//       if (action2 === "minus" && quantite2 > 1) {
//         quantite2--;
//       } else if (action2 == "plus" && quantite2 < element2.instock2) {
//         quantite2++;
//       }
//     }
//     return {
//       ...element2,
//       quantite2,
//     };
//   });
//   updatePanier2();
// }
