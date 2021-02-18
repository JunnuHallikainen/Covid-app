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
            // Teksti -> Json
            let data = JSON.parse(xmlhttp.responseText).features[shp].attributes;
            //let data = xmlhttp.responseText;
            console.log(data.sairaanhoitopiiri);
            showData(data, list);
            
        }
    };
}

function showData(data, list) {

    // Etsitään app
    var el = document.querySelector('#app');
    
    //parsitaan esriFieldTypeDate luettavampaan muotoon :^)
    let asd = data.date;
    let dl = JSON.parse(asd);
    date = new Date(dl).toUTCString();
    
    var html = `
    <div id="container">
        
    
    <table class="tg">
<thead>
  <tr>
    <th class="tg-0lax" colspan="3">${data.sairaanhoitopiiri}</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax">Tapauksia Yhteensä</td>
    <td class="tg-0lax">${data.tapauksia_yhteensa}</td>
    <td class="tg-0lax" rowspan="11"></td>
  </tr>
  <tr>
    <td class="tg-0lax">Väestö</td>
    <td class="tg-0lax">${data.Vaesto}</td>
  </tr>
  <tr>
    <td class="tg-0lax">Ilmaantuvuus</td>
    <td class="tg-0lax">${data.Ilmaantuvuus}</td>
  </tr>
  <tr>
    <td class="tg-0lax">Tapauksia 14vrk</td>
    <td class="tg-0lax">${data.tapauksia_14vrk}</td>
  </tr>
  <tr>
    <td class="tg-0lax">Ilmaantuvuus 14vrk</td>
    <td class="tg-0lax">${data.ilmaantuvuus_14vrk}</td>
  </tr>
  <tr>
    <td class="tg-0lax">Tapaukset / edelliset 14vrk</td>
    <td class="tg-0lax">${data.tapauksia_ed14vrk}</td>
  </tr>
  <tr>
    <td class="tg-0lax">Ilmaantuvuus edelliset 14vrk</td>
    <td class="tg-0lax">${data.ilmaantuvuus_ed14vrk}</td>
  </tr>
  <tr>
    <td class="tg-0lax">Päivitetty</td>
    <td class="tg-0lax">${date}</td>
  </tr>
  <tr>
  <td class="tg-0pky" colspan="3">
  <select onchange="getJson(value)" name="selector" id="selector">   
    
    <option value="" disabled selected> Valitse sairaanhoitopiiri </option>`
    for (var i = 0; i < list.length; i++) {
        html += `<option value="${i}">${list[i].attributes.sairaanhoitopiiri}</option>`
    }
    html += `</select>
  </td>
  </tr>
  
</tbody>
</table>
    
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

