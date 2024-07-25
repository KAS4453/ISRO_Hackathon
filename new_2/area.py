import cv2
import numpy as np
import json

# Load the binary mask image
pred_mask = cv2.imread('22678915_15 (1).png', cv2.IMREAD_GRAYSCALE)

# Define the center coordinates of the image (lat, lon)
lat = 26.1445  # Replace with the actual latitude
lon = 91.7362  # Replace with the actual longitude
image_center = (pred_mask.shape[1] // 2, pred_mask.shape[0] // 2)

# Calculate connected components and stats
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(pred_mask, connectivity=8)

# Prepare a list to store the area of each patch and its coordinates
patch_areas = []

# Iterate through each component, ignoring the background (label 0)
for label in range(1, num_labels):
    area = int(stats[label, cv2.CC_STAT_AREA])
    
    # Extract the coordinates of the patch
    mask = np.zeros_like(labels, dtype=np.uint8)
    mask[labels == label] = 255
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        contour = contours[0]
        coords = contour.squeeze().tolist()
        coords = [[coord[0] - image_center[0] + lon, image_center[1] - coord[1] + lat] for coord in coords]  # Adjust coordinates to center
        patch_areas.append({'label': int(label), 'area': area, 'coords': coords})

# Save the area data to a JSON file
with open('static/patch_areas.json', 'w') as f:
    json.dump(patch_areas, f)

print(f"Patch areas and coordinates saved to static/patch_areas.json")
