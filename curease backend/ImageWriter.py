from PIL import Image, ImageDraw, ImageFont
import textwrap
from datetime import datetime
from decimal import Decimal, ROUND_HALF_UP
from time import time
# ---------- CONFIG ----------
PAGE_WIDTH = 1654   # A4 scaled down (use 1654x2339 for A4 ratio)
PAGE_HEIGHT = 2339
MARGIN = 100
LINE_SPACING = 12

# Paths to fonts
FONT_REGULAR = "font/DancingScript-VariableFont_wght.ttf"
FONT_BOLD = "font/DancingScript-SemiBold.ttf"
# FONT_BOLD = "font/StackSansText-Bold.ttf"
FONT_HANDWRITING = "font/HomemadeApple-Regular.ttf"
STAMP_IMAGE = "stamp.png"  # transparent PNG for clinic stamp

# ---------- HELPERS ----------
def money(value):
    q = Decimal(value).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return f"₹{q}"

def draw_text_wrap(draw, text, font, x, y, max_width, fill=(0, 0, 0)):
    words = text.split()
    line = ""
    for w in words:
        test_line = (line + " " + w).strip()
        if draw.textlength(test_line, font=font) <= max_width:
            line = test_line
        else:
            draw.text((x, y), line, font=font, fill=fill)
            y += font.size + LINE_SPACING
            line = w
    if line:
        draw.text((x, y), line, font=font, fill=fill)
        y += font.size + LINE_SPACING
    return y

# ---------- MAIN FUNCTION ----------
def generate_receipt(output_path, clinic_info, patient_info, items, doctor_info, notes=""):
    im = Image.new("RGB", (PAGE_WIDTH, PAGE_HEIGHT), "white")
    draw = ImageDraw.Draw(im)

    # Load fonts
    font_h1 = ImageFont.truetype(FONT_BOLD, 64)
    font_h2 = ImageFont.truetype(FONT_BOLD, 48)
    font_regular = ImageFont.truetype(FONT_REGULAR, 36)
    font_small = ImageFont.truetype(FONT_REGULAR, 30)
    font_hand = ImageFont.truetype(FONT_HANDWRITING, 60)

    x = MARGIN
    y = MARGIN

    # Clinic Header
    draw.text((x, y), clinic_info.get("name", "Clinic Name"), font=font_h1, fill=(10, 10, 10))
    y += font_h1.size + 30
    draw.text((x, y), clinic_info.get("address", ""), font=font_regular, fill=(30, 30, 30))
    y += font_regular.size + 30
    draw.text((x, y), f"Phone: {clinic_info.get('phone', '-')}", font=font_regular, fill=(30, 30, 30))

    # Date on top-right
    date_str = datetime.now().strftime("%d %b %Y, %I:%M %p")
    draw.text(
        (PAGE_WIDTH - MARGIN - draw.textlength(date_str, font=font_regular), MARGIN),
        date_str,
        font=font_regular,
        fill=(60, 60, 60),
    )

    y += font_regular.size + 50
    draw.line((MARGIN, y, PAGE_WIDTH - MARGIN, y), fill=(200, 200, 200), width=3)
    y += 50

    # Patient Info
    draw.text((x, y), f"Patient: {patient_info.get('name', '-')}", font=font_h2, fill=(0, 0, 0))
    draw.text((PAGE_WIDTH // 2, y), f"Patient ID: {patient_info.get('patient_id', '-')}", font=font_regular, fill=(0, 0, 0))
    y += font_h2.size + 10
    draw.text((x, y), f"Age / Gender: {patient_info.get('age', '-')} / {patient_info.get('gender', '-')}", font=font_regular, fill=(0, 0, 0))
    draw.text((PAGE_WIDTH // 2, y), f"Doctor: Dr. {doctor_info.get('name', '-')}", font=font_regular, fill=(0, 0, 0))
    y += font_regular.size + 50

    # Receipt Title
    draw.text((x, y), "PHARMACY RECEIPT", font=font_h2, fill=(0, 0, 0))
    y += font_h2.size + 12
    draw.line((MARGIN, y, PAGE_WIDTH - MARGIN, y), fill=(220, 220, 220), width=2)
    y += 20

    # Table Header
    headers = ["Description", "Qty", "Rate", "Amount"]
    col_widths = [800, 120, 220, 220]
    col_x = [x + sum(col_widths[:i]) for i in range(len(headers))]
    for i, h in enumerate(headers):
        draw.text((col_x[i], y), h, font=font_regular, fill=(0, 0, 0))
    y += font_regular.size + 12
    draw.line((MARGIN, y, PAGE_WIDTH - MARGIN, y), fill=(210, 210, 210), width=2)
    y += 10

    # Table Rows
    subtotal = Decimal("0.00")
    for item in items:
        name = item["Medicine Name"]
        qty = item["qty"]
        rate = Decimal(str(item["price"]))
        amount = (rate * qty).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        subtotal += amount

        # Description wrapping
        draw_text_wrap(draw, name, font_small, col_x[0], y, col_widths[0] - 20)
        draw.text((col_x[1], y), str(qty), font=font_small, fill=(0, 0, 0))
        draw.text((col_x[2], y), money(rate), font=font_small, fill=(0, 0, 0))
        draw.text((col_x[3], y), money(amount), font=font_small, fill=(0, 0, 0))
        y += font_small.size + 20

    # Totals
    y += 20
    tax_rate = Decimal("0.05")
    tax_val = (subtotal * tax_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    grand_total = (subtotal + tax_val).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

    total_x = PAGE_WIDTH - MARGIN - 350
    draw.text((total_x, y), f"Subtotal: {money(subtotal)}", font=font_regular, fill=(0, 0, 0))
    y += font_regular.size + 10
    draw.text((total_x, y), f"Tax (5%): {money(tax_val)}", font=font_regular, fill=(0, 0, 0))
    y += font_regular.size + 10
    draw.text((total_x, y), f"Total: {money(grand_total)}", font=font_h2, fill=(0, 0, 0))
    y += font_h2.size + 80

    # Notes Section
    draw.text((x, y), "Notes / Instructions:", font=font_regular, fill=(0, 0, 0))
    y += font_regular.size + 8
    if notes:
        y = draw_text_wrap(draw, notes, font_small, x, y, PAGE_WIDTH - 2 * MARGIN)
    y += 40

    # Signature
    sign_x = PAGE_WIDTH - MARGIN - 400
    sign_y = PAGE_HEIGHT - MARGIN - 250
    draw.line((sign_x, sign_y, sign_x + 300, sign_y), fill=(180, 180, 180), width=2)
    draw.text((sign_x, sign_y + 10), f"Dr. {doctor_info.get('name', '-')}", font=font_regular, fill=(0, 0, 0))
    draw.text((sign_x + 10, sign_y + 60), doctor_info.get("signature_text", doctor_info.get("name", "")), font=font_hand, fill=(20, 20, 20))
    draw.text((sign_x, sign_y + 130), f"Reg: {doctor_info.get('reg_no', '-')}", font=font_small, fill=(60, 60, 60))

    # Stamp (bottom-right)
    try:
        stamp = Image.open(STAMP_IMAGE).convert("RGBA")
        stamp = stamp.resize((300, 300))
        im.paste(stamp, (PAGE_WIDTH - 350, PAGE_HEIGHT - 380), stamp)
    except Exception as e:
        print("Stamp image not found or failed to load:", e)

    # Footer
    footer_y = PAGE_HEIGHT - MARGIN - 50
    draw.line((MARGIN, footer_y - 10, PAGE_WIDTH - MARGIN, footer_y - 10), fill=(230, 230, 230), width=2)
    draw.text((MARGIN, footer_y), clinic_info.get("footer", "Thank you for visiting. Get well soon!"), font=font_small, fill=(100, 100, 100))

    im.save("recipts/"+output_path)
    print(f"✅ Receipt saved as: {output_path}")

# ---------- SAMPLE DATA ----------
# if __name__ == "__main__":

def GenerateWriter(name,age,gender,id,items,docName,docId,notes):
    clinic_info = {
        "name": "Curease : ",
        "address": "12A Pluto Road - 660660",
        "phone": "+91-6203241318",
        "footer": "Recipt generated by Curease."
    }

    patient_info = {
        "name": name,
        "age": age,
        "gender": gender,
        "patient_id": f"P-{id}"
    }
    # [
    #     {"name": "Paracetamol 500mg - Tablet (10x1)", "qty": 2, "unit_price": 35.00},
    #     {"name": "Azithromycin 500mg - Tablet (3x1)", "qty": 1, "unit_price": 120.00},
    #     {"name": "Cough Syrup 100ml", "qty": 1, "unit_price": 95.50},
    #     {"name": "Medical Consultation (In-person)", "qty": 1, "unit_price": 300.00},
    # ]

    doctor_info = {
        "name": docName,
        "reg_no": f"MBBS/{docId}",
        "signature_text": docName
    }

    # notes = "Take Paracetamol every 6 hours if fever persists. Complete antibiotic course. Avoid cold drinks."

    imgName = str(time())+".png"
    generate_receipt(imgName, clinic_info, patient_info, items, doctor_info, notes)
    return imgName
