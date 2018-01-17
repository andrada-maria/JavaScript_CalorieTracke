var editareAliment_id = null;


window.onload = function () {

    // document.getElementById('buton-get').addEventListener("click", get_data);
    document.getElementById('butonAdaugareAliment').addEventListener("click", post_data);


    get_data();
};

function get_data(){
      document.getElementById('alimente').innerHTML = "";

    getAjax('http://localhost:3000/alimente', function(data){
        // console.table(data);
        for(var i=0; i<data.length; i++){
            createProdusElement(data[i]);
        }
    });


}
function post_data(){
    var mydata = {};
    mydata.nume = document.getElementById('numeInput').value;
    mydata.cantitate = document.getElementById('cantitateInput').value;
    mydata.calorii = document.getElementById('caloriiInput').value;
    //mydata.image = document.getElementById('imagineInput').value ? document.getElementById('imagineInput').value : "https://www.hsjaa.com/images/joomlart/demo/default.jpg";

    postAjax('http://localhost:3000/alimente', mydata, function(response){
        createProdusElement(response);

        document.getElementById('numeInput').value = "";
        document.getElementById('cantitateInput').value = "";
        document.getElementById('caloriiInput').value = "";
        //document.getElementById('imagineInput').value = "";
    });

}




function createProdusElement(data){
  editareAliment_id = data.id;

    var outer_div = document.createElement("div");
    outer_div.setAttribute("class", "produs-container");
    document.getElementById('alimente').appendChild(outer_div);


    // create image
    // var div1 = document.createElement("div");
    // div1.setAttribute('class', 'image');
    // outer_div.appendChild(div1);
    // var img = document.createElement("img");
    // img.setAttribute("src", data.image);
    // div1.appendChild(img);
    //

    // create name
    var div2 = document.createElement("div");
    div2.setAttribute('class', 'name');
    div2.innerHTML = "<strong>"+data.nume+"</strong>";

    outer_div.appendChild(div2);



    // create quatity
    var div3 = document.createElement("div");
    div3.setAttribute('class', 'cantitate');
    div3.innerHTML = data.cantitate + "g";

    outer_div.appendChild(div3);


    // create calories
    var div4 = document.createElement("div");
    div4.setAttribute('class', 'calorii');
    div4.innerHTML = data.calorii + 'kcal';
    outer_div.appendChild(div4);


    // stergereAliment button
    var rem_btn = document.createElement("button");
    rem_btn.setAttribute('class', 'stergereAliment');
    rem_btn.innerHTML = "x";
    rem_btn.addEventListener("click", function(){
        deleteAjax('http://localhost:3000/alimente/'+data.id, function(){});
        document.getElementById('alimente').removeChild(outer_div);
    });
    outer_div.appendChild(rem_btn);


    // editareAliment button
    var up_btn = document.createElement('button');
    up_btn.setAttribute('class', 'editareAliment');
    up_btn.innerHTML = 'o';
    up_btn.addEventListener('click', function () {
      document.getElementById('numeInput').value = div2.firstChild.innerHTML;
      document.getElementById('cantitateInput').value = div3.innerHTML.slice(0,-1);
      document.getElementById('caloriiInput').value = div4.innerHTML.slice(0, -4);
    //  document.getElementById('imagineInput').value = div1.firstChild.getAttribute('src');


      document.getElementById('butonAdaugareAliment').innerHTML = 'Modifica';
      document.getElementById('butonAdaugareAliment').removeEventListener('click', post_data);
      document.getElementById('butonAdaugareAliment').addEventListener('click', put_data);
    })
    outer_div.appendChild(up_btn);

}

function put_data() {
  var editareAliment_data = {};
  editareAliment_data.nume = document.getElementById('numeInput').value;
  editareAliment_data.cantitate = document.getElementById('cantitateInput').value;
  editareAliment_data.calorii = document.getElementById('caloriiInput').value;
  //editareAliment_data.image = document.getElementById('imagineInput').value;

  putAjax('http://localhost:3000/alimente/'+editareAliment_id, editareAliment_data, function(){
    get_data();

    document.getElementById('butonAdaugareAliment').innerHTML = 'Adauga';
    document.getElementById('butonAdaugareAliment').removeEventListener('click', put_data);
    document.getElementById('butonAdaugareAliment').addEventListener('click', post_data);

    document.getElementById('numeInput').value = "";
    document.getElementById('cantitateInput').value = "";
    document.getElementById('caloriiInput').value = "";
    //document.getElementById('imagineInput').value = "";
  })
}
