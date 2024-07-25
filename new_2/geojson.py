import cv2
import numpy as np
from shapely.geometry import Polygon, mapping
import geopandas as gpd
import json

# Load the image
image_path = "22678915_15 (1).png"
image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

# Threshold the image to binary
_, binary = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)

# Find contours
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Function to calculate centroid
def calculate_centroid(polygon):
    M = cv2.moments(polygon)
    if M["m00"] != 0:
        cX = int(M["m10"] / M["m00"])
        cY = int(M["m01"] / M["m00"])
    else:
        cX, cY = 0, 0
    return (cX, cY)

# Center coordinate of the image (latitude, longitude)
latitude = 26.1445
longitude = 91.7362

# Assuming each pixel represents 1 meter (change if needed)
pixel_size = 1  # meters

# Convert pixel coordinates to geographical coordinates
def pixel_to_geo(pixel_coords, center_lat, center_lon, image_shape, pixel_size):
    height, width = image_shape
    origin_x = center_lon - (width / 2.0 * pixel_size / 111320.0)  # longitude adjustment
    origin_y = center_lat + (height / 2.0 * pixel_size / 110540.0)  # latitude adjustment
    
    geo_coords = []
    for x, y in pixel_coords:
        lon = origin_x + (x * pixel_size / 111320.0)
        lat = origin_y - (y * pixel_size / 110540.0)
        geo_coords.append((lon, lat))
    return geo_coords

# Prepare data for GeoJSON
features = []
for contour in contours:
    if len(contour) < 4:
        continue  # Skip contours that can't form a valid polygon
    
    # Create a polygon from contour
    polygon = Polygon([tuple(point[0]) for point in contour])
    
    # Calculate centroid and area
    centroid = calculate_centroid(contour)
    area = polygon.area
    
    # Convert pixel coordinates to geographical coordinates
    polygon_coords = pixel_to_geo(polygon.exterior.coords, latitude, longitude, binary.shape, pixel_size)
    centroid_geo = pixel_to_geo([centroid], latitude, longitude, binary.shape, pixel_size)[0]
    
    # Create a feature
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [polygon_coords]
        },
        "properties": {
            "area": area,
            "centroid": centroid_geo
        }
    }
    features.append(feature)

# Create GeoJSON structure
geojson = {
    "type": "FeatureCollection",
    "features": features
}

# Save GeoJSON to file
geojson_path = "building_footprints.geojson"
with open(geojson_path, "w") as f:
    json.dump(geojson, f)

print(f"GeoJSON file saved to {geojson_path}")
