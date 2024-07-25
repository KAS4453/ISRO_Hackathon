document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([26.1445, 91.7362], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    fetch('/data/buildings.geojson')
        .then(response => response.json())
        .then(data => {
            const geojsonLayer = L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    layer.bindTooltip(`Area: ${feature.properties.area_in_meters} sq meters`);
                }
            }).addTo(map);
        });

    const searchBox = document.getElementById('search-box');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function () {
        const query = searchBox.value;
        L.Control.Geocoder.nominatim().geocode(query, function (results) {
            const bbox = results[0].bbox;
            const bounds = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
            map.fitBounds(bounds);
        });
    });
});
