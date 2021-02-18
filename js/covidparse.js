// global api
var api = "https://services7.arcgis.com/nuPvVz1HGGfa0Eh7/arcgis/rest/services/korona_tapauksia_ynteensa/FeatureServer/0/query?where=1%3D1&outFields=sairaanhoitopiiri,date,tapauksia_yhteensa,Vaesto,Ilmaantuvuus,testimaara_yhteensa,testimaara_suhde,tapauksia_suhde_testimaara,tapauksia_14vrk,ilmaantuvuus_14vrk,tapauksia_ed14vrk,ilmaantuvuus_ed14vrk,tapauksia&returnGeometry=false&outSR=4326&f=json"

function getJson(shp) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", api, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let list = JSON.parse(xmlhttp.responseText).features;
            //alert(xmlhttp.responseText);
            // Json
            let data = JSON.parse(xmlhttp.responseText).features[shp].attributes;
            //let data = xmlhttp.responseText;
            //console.log(data.sairaanhoitopiiri);
            showData(data, list, shp);
            
        }
        else {
            document.querySelector('#app').innerHTML = `Something went horribly wrong.`;
        }
    };
}

function showData(data, list, shp) {

    // Find id app from html
    var el = document.querySelector('#app');
    
    // Convert esriFieldTypeDate to UTC format
    let asd = data.date;
    let dl = JSON.parse(asd);
    date = new Date(dl).toUTCString();
    
    var html = `
    <div class="container">
        
    
    <table class="table table-bordered">
<thead class ="table-dark">
  <tr>
    <th colspan="3"><h1>${data.sairaanhoitopiiri}</h1></th>
  </tr>
</thead>
<tbody>
  
  <tr>
    <td>Väestö</td>
    <td>${data.Vaesto}</td>
    <td rowspan="11"><img src="images/img${shp}.png" alt="${data.sairaanhoitopiiri}"></td>
  </tr>
  <tr>
    <td>Ilmaantuvuus</td>
    <td>${data.Ilmaantuvuus}</td>
  </tr>
  <tr>
    <td>Tapauksia 14vrk</td>
    <td>${data.tapauksia_14vrk}</td>
  </tr>
  <tr>
    <td>Ilmaantuvuus 14vrk</td>
    <td>${data.ilmaantuvuus_14vrk}</td>
  </tr>
  <tr>
    <td>Tapaukset / edelliset 14vrk</td>
    <td>${data.tapauksia_ed14vrk}</td>
  </tr>
  <tr>
    <td>Ilmaantuvuus edelliset 14vrk</td>
    <td>${data.ilmaantuvuus_ed14vrk}</td>
  </tr>
  <tr>
    <td>Tapauksia Yhteensä</td>
    <td>${data.tapauksia_yhteensa}</td>  
  </tr>
  <tr>
    <td>Päivitetty</td>
    <td>${date}</td>
  </tr>
  <tr>
  <td colspan="3">
  <select onchange="getJson(value)" name="selector" id="selector">   
    
    <option value="" disabled selected> Valitse sairaanhoitopiiri </option>`
    for (var i = 0; i < list.length; i++) {
        html += `<option value="${i}">${list[i].attributes.sairaanhoitopiiri}</option>`
    }
    html += `</select><br>
  </td>
  </tr>
  
</tbody>
</table>
    </div>
    `;
    
    
    
    
        
    //tungetaan etusivuun
    el.innerHTML = html;
    
    /*
    //testitulostus
    console.log(api.toString());
    */

}
function getData() {
    let shp = document.querySelector("select").value;
    showData(shp);
}
//Haetaan tiedot, oletuksena 20 = kaikki sairaanhoitopiirit
getJson(20);

