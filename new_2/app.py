from flask import Flask, render_template, send_from_directory
import folium
import json
import os

app = Flask(__name__)

# Center of the map
latitude = 26.1445
longitude = 91.7362

# Create a folium map centered on the given coordinates
m = folium.Map(location=[latitude, longitude], zoom_start=15)

# Load the GeoJSON file
geojson_path = "building_footprints.geojson"
with open(geojson_path) as f:
    geojson_data = json.load(f)

# Add GeoJSON data to the map
folium.GeoJson(
    geojson_data,
    name="Building Footprints",
    style_function=lambda feature: {
        'fillColor': 'blue',
        'color': 'blue',
        'weight': 1,
        'fillOpacity': 0.5,
    },
    tooltip=folium.features.GeoJsonTooltip(fields=['area', 'centroid'], aliases=['Area:', 'Centroid:'])
).add_to(m)

# Save the map as an HTML file
map_path = "templates/map.html"
m.save(map_path)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/map')
def map():
    return send_from_directory('templates', 'map.html')

if __name__ == '__main__':
    app.run(debug=True)
