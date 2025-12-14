from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch

model_name = "eslamxm/vit-base-food101"

# load model & processor
processor = AutoImageProcessor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)


food_dict = {
    "apple_pie": {"calories": 300, "protein": 3, "fat": 15, "carbohydrates": 40, "fiber": 2, "sugar": 20},
    "baby_back_ribs": {"calories": 450, "protein": 25, "fat": 35, "carbohydrates": 5, "fiber": 0, "sugar": 2},
    "baklava": {"calories": 400, "protein": 5, "fat": 25, "carbohydrates": 35, "fiber": 1, "sugar": 20},
    "beef_carpaccio": {"calories": 200, "protein": 20, "fat": 12, "carbohydrates": 2, "fiber": 0, "sugar": 0},
    "beef_tartare": {"calories": 250, "protein": 22, "fat": 15, "carbohydrates": 3, "fiber": 0, "sugar": 0},
    "beet_salad": {"calories": 120, "protein": 3, "fat": 5, "carbohydrates": 15, "fiber": 4, "sugar": 7},
    "beignets": {"calories": 350, "protein": 5, "fat": 20, "carbohydrates": 40, "fiber": 2, "sugar": 15},
    "bibimbap": {"calories": 500, "protein": 20, "fat": 18, "carbohydrates": 65, "fiber": 5, "sugar": 7},
    "bread_pudding": {"calories": 350, "protein": 7, "fat": 15, "carbohydrates": 45, "fiber": 3, "sugar": 25},
    "breakfast_burrito": {"calories": 450, "protein": 20, "fat": 20, "carbohydrates": 40, "fiber": 5, "sugar": 4},
    "bruschetta": {"calories": 150, "protein": 5, "fat": 7, "carbohydrates": 18, "fiber": 2, "sugar": 2},
    "caesar_salad": {"calories": 250, "protein": 10, "fat": 20, "carbohydrates": 8, "fiber": 2, "sugar": 2},
    "cannoli": {"calories": 350, "protein": 6, "fat": 22, "carbohydrates": 35, "fiber": 1, "sugar": 18},
    "caprese_salad": {"calories": 220, "protein": 12, "fat": 18, "carbohydrates": 5, "fiber": 1, "sugar": 3},
    "carrot_cake": {"calories": 400, "protein": 5, "fat": 20, "carbohydrates": 50, "fiber": 2, "sugar": 30},
    "ceviche": {"calories": 200, "protein": 20, "fat": 5, "carbohydrates": 10, "fiber": 1, "sugar": 3},
    "cheesecake": {"calories": 450, "protein": 8, "fat": 30, "carbohydrates": 35, "fiber": 1, "sugar": 25},
    "cheese_plate": {"calories": 400, "protein": 20, "fat": 35, "carbohydrates": 5, "fiber": 0, "sugar": 1},
    "chicken_curry": {"calories": 350, "protein": 25, "fat": 18, "carbohydrates": 15, "fiber": 3, "sugar": 4},
    "chicken_quesadilla": {"calories": 400, "protein": 25, "fat": 20, "carbohydrates": 30, "fiber": 2, "sugar": 3},
    "chicken_wings": {"calories": 450, "protein": 30, "fat": 30, "carbohydrates": 5, "fiber": 0, "sugar": 1},
    "chocolate_cake": {"calories": 450, "protein": 6, "fat": 25, "carbohydrates": 50, "fiber": 2, "sugar": 35},
    "chocolate_mousse": {"calories": 350, "protein": 5, "fat": 25, "carbohydrates": 25, "fiber": 1, "sugar": 20},
    "churros": {"calories": 300, "protein": 4, "fat": 15, "carbohydrates": 40, "fiber": 2, "sugar": 15},
    "clam_chowder": {"calories": 250, "protein": 10, "fat": 15, "carbohydrates": 20, "fiber": 2, "sugar": 3},
    "club_sandwich": {"calories": 450, "protein": 25, "fat": 20, "carbohydrates": 40, "fiber": 4, "sugar": 4},
    "crab_cakes": {"calories": 300, "protein": 20, "fat": 15, "carbohydrates": 15, "fiber": 2, "sugar": 2},
    "creme_brulee": {"calories": 400, "protein": 6, "fat": 30, "carbohydrates": 30, "fiber": 0, "sugar": 25},
    "croque_madame": {"calories": 450, "protein": 25, "fat": 25, "carbohydrates": 35, "fiber": 2, "sugar": 3},
    "cup_cakes": {"calories": 350, "protein": 5, "fat": 20, "carbohydrates": 40, "fiber": 1, "sugar": 25},
    "deviled_eggs": {"calories": 150, "protein": 6, "fat": 12, "carbohydrates": 2, "fiber": 0, "sugar": 1},
    "donuts": {"calories": 300, "protein": 4, "fat": 18, "carbohydrates": 35, "fiber": 1, "sugar": 15},
    "dumplings": {"calories": 250, "protein": 10, "fat": 8, "carbohydrates": 35, "fiber": 2, "sugar": 2},
    "edamame": {"calories": 120, "protein": 11, "fat": 5, "carbohydrates": 10, "fiber": 4, "sugar": 2},
    "eggs_benedict": {"calories": 400, "protein": 20, "fat": 25, "carbohydrates": 20, "fiber": 1, "sugar": 3},
    "escargots": {"calories": 150, "protein": 15, "fat": 8, "carbohydrates": 2, "fiber": 0, "sugar": 0},
    "falafel": {"calories": 250, "protein": 12, "fat": 15, "carbohydrates": 20, "fiber": 5, "sugar": 2},
    "filet_mignon": {"calories": 400, "protein": 30, "fat": 28, "carbohydrates": 0, "fiber": 0, "sugar": 0},
    "fish_and_chips": {"calories": 600, "protein": 25, "fat": 35, "carbohydrates": 50, "fiber": 3, "sugar": 2},
    "foie_gras": {"calories": 450, "protein": 8, "fat": 40, "carbohydrates": 5, "fiber": 0, "sugar": 0},
    "french_fries": {"calories": 350, "protein": 4, "fat": 18, "carbohydrates": 45, "fiber": 4, "sugar": 0},
    "french_onion_soup": {"calories": 200, "protein": 8, "fat": 10, "carbohydrates": 20, "fiber": 2, "sugar": 4},
    "french_toast": {"calories": 300, "protein": 8, "fat": 12, "carbohydrates": 40, "fiber": 2, "sugar": 15},
    "fried_calamari": {"calories": 350, "protein": 18, "fat": 20, "carbohydrates": 15, "fiber": 1, "sugar": 1},
    "fried_rice": {"calories": 400, "protein": 10, "fat": 15, "carbohydrates": 60, "fiber": 3, "sugar": 3},
    "frozen_yogurt": {"calories": 150, "protein": 5, "fat": 2, "carbohydrates": 30, "fiber": 1, "sugar": 20},
    "garlic_bread": {"calories": 200, "protein": 5, "fat": 10, "carbohydrates": 25, "fiber": 2, "sugar": 2},
    "gnocchi": {"calories": 250, "protein": 6, "fat": 5, "carbohydrates": 45, "fiber": 3, "sugar": 2},
    "greek_salad": {"calories": 180, "protein": 6, "fat": 12, "carbohydrates": 10, "fiber": 2, "sugar": 3},
    "grilled_cheese_sandwich": {"calories": 400, "protein": 15, "fat": 25, "carbohydrates": 30, "fiber": 2, "sugar": 3},
    "grilled_salmon": {"calories": 350, "protein": 30, "fat": 20, "carbohydrates": 0, "fiber": 0, "sugar": 0},
    "guacamole": {"calories": 180, "protein": 2, "fat": 15, "carbohydrates": 10, "fiber": 7, "sugar": 1},
    "gyoza": {"calories": 200, "protein": 8, "fat": 5, "carbohydrates": 30, "fiber": 2, "sugar": 2},
    "hamburger": {"calories": 500, "protein": 25, "fat": 30, "carbohydrates": 35, "fiber": 3, "sugar": 5},
    "hot_and_sour_soup": {"calories": 120, "protein": 6, "fat": 3, "carbohydrates": 15, "fiber": 2, "sugar": 3},
    "hot_dog": {"calories": 350, "protein": 12, "fat": 28, "carbohydrates": 10, "fiber": 1, "sugar": 3},
    "huevos_rancheros": {"calories": 400, "protein": 20, "fat": 25, "carbohydrates": 25, "fiber": 3, "sugar": 3},
    "hummus": {"calories": 180, "protein": 6, "fat": 12, "carbohydrates": 15, "fiber": 4, "sugar": 1},
    "ice_cream": {"calories": 200, "protein": 4, "fat": 10, "carbohydrates": 25, "fiber": 0, "sugar": 20},
    "lasagna": {"calories": 450, "protein": 25, "fat": 25, "carbohydrates": 35, "fiber": 3, "sugar": 6},
    "lobster_bisque": {"calories": 250, "protein": 15, "fat": 18, "carbohydrates": 10, "fiber": 1, "sugar": 2},
    "lobster_roll_sandwich": {"calories": 400, "protein": 25, "fat": 20, "carbohydrates": 30, "fiber": 2, "sugar": 3},
    "macaroni_and_cheese": {"calories": 400, "protein": 15, "fat": 20, "carbohydrates": 45, "fiber": 3, "sugar": 5},
    "macarons": {"calories": 100, "protein": 2, "fat": 5, "carbohydrates": 15, "fiber": 0, "sugar": 12},
    "miso_soup": {"calories": 70, "protein": 5, "fat": 2, "carbohydrates": 8, "fiber": 1, "sugar": 2},
    "mussels": {"calories": 150, "protein": 20, "fat": 5, "carbohydrates": 5, "fiber": 1, "sugar": 1},
    "nachos": {"calories": 350, "protein": 10, "fat": 20, "carbohydrates": 35, "fiber": 3, "sugar": 2},
    "omelette": {"calories": 250, "protein": 15, "fat": 20, "carbohydrates": 5, "fiber": 1, "sugar": 1},
    "onion_rings": {"calories": 300, "protein": 3, "fat": 18, "carbohydrates": 35, "fiber": 2, "sugar": 3},
    "oysters": {"calories": 100, "protein": 12, "fat": 2, "carbohydrates": 4, "fiber": 0, "sugar": 0},
    "pad_thai": {"calories": 450, "protein": 20, "fat": 18, "carbohydrates": 55, "fiber": 4, "sugar": 8},
    "paella": {"calories": 400, "protein": 20, "fat": 15, "carbohydrates": 50, "fiber": 3, "sugar": 3},
    "pancakes": {"calories": 350, "protein": 8, "fat": 12, "carbohydrates": 50, "fiber": 2, "sugar": 15},
    "panna_cotta": {"calories": 300, "protein": 5, "fat": 20, "carbohydrates": 25, "fiber": 1, "sugar": 18},
    "peking_duck": {"calories": 450, "protein": 25, "fat": 30, "carbohydrates": 15, "fiber": 1, "sugar": 3},
    "pho": {"calories": 350, "protein": 20, "fat": 10, "carbohydrates": 45, "fiber": 3, "sugar": 2},
    "pizza": {"calories": 400, "protein": 18, "fat": 15, "carbohydrates": 50, "fiber": 3, "sugar": 5},
    "pork_chop": {"calories": 350, "protein": 30, "fat": 25, "carbohydrates": 0, "fiber": 0, "sugar": 0},
    "poutine": {"calories": 500, "protein": 15, "fat": 30, "carbohydrates": 45, "fiber": 4, "sugar": 2},
    "prime_rib": {"calories": 550, "protein": 40, "fat": 40, "carbohydrates": 2, "fiber": 0, "sugar": 0},
    "pulled_pork_sandwich": {"calories": 450, "protein": 25, "fat": 20, "carbohydrates": 40, "fiber": 3, "sugar": 5},
    "ramen": {"calories": 500, "protein": 20, "fat": 18, "carbohydrates": 60, "fiber": 4, "sugar": 5},
    "ravioli": {"calories": 350, "protein": 15, "fat": 12, "carbohydrates": 45, "fiber": 3, "sugar": 3},
    "red_velvet_cake": {"calories": 400, "protein": 5, "fat": 20, "carbohydrates": 50, "fiber": 2, "sugar": 30},
    "risotto": {"calories": 350, "protein": 8, "fat": 12, "carbohydrates": 55, "fiber": 3, "sugar": 4},
    "samosa": {"calories": 250, "protein": 5, "fat": 15, "carbohydrates": 25, "fiber": 2, "sugar": 2},
    "sashimi": {"calories": 150, "protein": 20, "fat": 5, "carbohydrates": 0, "fiber": 0, "sugar": 0},
    "scallops": {"calories": 120, "protein": 18, "fat": 2, "carbohydrates": 5, "fiber": 0, "sugar": 1},
    "seaweed_salad": {"calories": 100, "protein": 5, "fat": 2, "carbohydrates": 15, "fiber": 3, "sugar": 5},
    "shrimp_and_grits": {"calories": 400, "protein": 25, "fat": 15, "carbohydrates": 35, "fiber": 2, "sugar": 2},
    "spaghetti_bolognese": {"calories": 450, "protein": 20, "fat": 18, "carbohydrates": 55, "fiber": 4, "sugar": 5},
    "spaghetti_carbonara": {"calories": 500, "protein": 20, "fat": 25, "carbohydrates": 55, "fiber": 3, "sugar": 4},
    "spring_rolls": {"calories": 200, "protein": 5, "fat": 10, "carbohydrates": 25, "fiber": 2, "sugar": 3},
    "steak": {"calories": 500, "protein": 40, "fat": 35, "carbohydrates": 0, "fiber": 0, "sugar": 0},
    "strawberry_shortcake": {"calories": 350, "protein": 5, "fat": 18, "carbohydrates": 45, "fiber": 2, "sugar": 25},
    "sushi": {"calories": 300, "protein": 12, "fat": 5, "carbohydrates": 45, "fiber": 2, "sugar": 3},
    "tacos": {"calories": 350, "protein": 18, "fat": 15, "carbohydrates": 35, "fiber": 3, "sugar": 2},
    "takoyaki": {"calories": 300, "protein": 10, "fat": 15, "carbohydrates": 30, "fiber": 2, "sugar": 3},
    "tiramisu": {"calories": 400, "protein": 6, "fat": 25, "carbohydrates": 40, "fiber": 1, "sugar": 30},
    "tuna_tartare": {"calories": 200, "protein": 22, "fat": 12, "carbohydrates": 3, "fiber": 0, "sugar": 0},
    "waffles": {"calories": 350, "protein": 8, "fat": 15, "carbohydrates": 45, "fiber": 2, "sugar": 15},
}

def AnalyzeFood(imagePath):
    # load your image
    img = Image.open(imagePath).convert("RGB")

    # preprocess
    inputs = processor(img, return_tensors="pt")

    # inference
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits

    # get predicted class index
    predicted_idx = torch.argmax(logits, dim=-1).item()

    # get class names
    label_names = model.config.id2label
    predicted_label = label_names[predicted_idx]
    data = {
        "category": predicted_label,
    }
    for i in food_dict[predicted_label]:
        data[i] = food_dict[predicted_label][i]
    return data