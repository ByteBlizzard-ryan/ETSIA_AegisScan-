#!/usr/bin/env python3
"""
Script Python pour créer les icônes PNG de l'extension AegisScan
Nécessite: pip install Pillow
"""

from PIL import Image, ImageDraw
import os

def create_icon(size):
    # Créer une image avec fond transparent
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Fond bleu
    draw.rectangle([0, 0, size, size], fill=(59, 130, 246, 255))
    
    # Bouclier blanc
    center_x, center_y = size // 2, size // 2
    shield_width = int(size * 0.4)
    shield_height = int(size * 0.5)
    
    # Points du bouclier
    points = [
        (center_x, center_y - shield_height//2),  # Top
        (center_x + shield_width//2, center_y - shield_height//3),  # Top right
        (center_x + shield_width//2, center_y + shield_height//4),  # Bottom right
        (center_x, center_y + shield_height//2),  # Bottom
        (center_x - shield_width//2, center_y + shield_height//4),  # Bottom left
        (center_x - shield_width//2, center_y - shield_height//3),  # Top left
    ]
    
    draw.polygon(points, fill=(255, 255, 255, 255))
    
    # Coche verte
    check_width = max(2, size // 20)
    check_points = [
        (center_x - shield_width//3, center_y),
        (center_x - shield_width//6, center_y + shield_height//6),
        (center_x + shield_width//3, center_y - shield_height//6)
    ]
    
    # Dessiner la coche avec des lignes
    draw.line([check_points[0], check_points[1]], fill=(16, 185, 129, 255), width=check_width)
    draw.line([check_points[1], check_points[2]], fill=(16, 185, 129, 255), width=check_width)
    
    return img

def main():
    # Créer le dossier icons s'il n'existe pas
    os.makedirs('link-guard/icons', exist_ok=True)
    
    # Générer les icônes
    sizes = [16, 48, 128]
    
    for size in sizes:
        img = create_icon(size)
        filename = f'link-guard/icons/icon{size}.png'
        img.save(filename, 'PNG')
        print(f'Icône {size}x{size} créée: {filename}')
    
    print('Toutes les icônes ont été générées avec succès!')

if __name__ == '__main__':
    main()