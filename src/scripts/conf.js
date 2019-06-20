

// var obrazek = "https://api.mapy.cz/img/api/marker/drop-red.png";
// // var obrazek = "../img/satellite-icon.png";

// // var m = new SMap(JAK.gel("m"));
// var m = new SMap(JAK.gel("mapa-cz"));
// // var m = new SMap(JAK.gel("mapa"));
// m.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
// m.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
// var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
// m.addControl(mouse); 

// var data = {
//     "Karlštejn": "49°56'21.57\"N,14°11'17.96\"E",
//     "Křivoklát": "50°2'16.36\"N,13°52'18.59\"E",
//     "Kost": "50°29'24.83\"N,15°8'6.38\"E",
//     "Fr": "49.3467257\"N,-1.3161141\"E"
// };
// var znacky = [];
// var souradnice = [];

// for (var name in data) { /* Vyrobit značky */
//     var c = SMap.Coords.fromWGS84(data[name]); /* Souřadnice značky, z textového formátu souřadnic */
    
//     var options = {
//         url:obrazek,
//         title:name,
//         anchor: {left:10, bottom: 1}  /* Ukotvení značky za bod uprostřed dole */
//     }
    
//     var znacka = new SMap.Marker(c, null, options);
//     souradnice.push(c);
//     znacky.push(znacka);
// }


// /* Křivoklát ukotvíme za střed značky, přestože neznáme její velikost */
// var options = {
//     anchor: {left:0.5, top:0.5}
// }
// znacky[1].decorate(SMap.Marker.Feature.RelativeAnchor, options);

// var vrstva = new SMap.Layer.Marker();     /* Vrstva se značkami */
// m.addLayer(vrstva);                          /* Přidat ji do mapy */
// vrstva.enable();                         /* A povolit */
// for (var i=0;i<znacky.length;i++) {
//     vrstva.addMarker(znacky[i]);
// }

// var cz = m.computeCenterZoom(souradnice); /* Spočítat pozici mapy tak, aby značky byly vidět */
// m.setCenterZoom(cz[0], cz[1]);        


// // export default Conf