from flask import Flask, render_template, jsonify
import csv
import geojson
from shapely import wkt

app = Flask(__name__)

def csv_to_geojson(csv_filepath):
    features = []
    with open(csv_filepath, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            geometry = wkt.loads(row['geometry'])
            feature = geojson.Feature(
                geometry=geometry,
                properties={
                    'latitude': float(row['latitude']),
                    'longitude': float(row['longitude']),
                    'area_in_meters': float(row['area_in_meters']),
                    'confidence': float(row['confidence']),
                    'full_plus_code': row['full_plus_code']
                }
            )
            features.append(feature)
    return geojson.FeatureCollection(features)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data/buildings.geojson')
def data():
    geojson_data = csv_to_geojson('data/buildings.csv')
    return jsonify(geojson_data)

if __name__ == '__main__':
    app.run(debug=True)
