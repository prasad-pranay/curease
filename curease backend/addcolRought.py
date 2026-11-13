import pandas as pd
import random

# Load your CSV
df = pd.read_csv("data/Medicine_Details_With_ID_Old.csv")

# Add random 'instock' column (0–50)
df["instock"] = [random.randint(0, 20) for _ in range(len(df))]

# Save back to CSV
df.to_csv("data/Medicine_Details_With_ID.csv", index=False)

print("Column 'instock' added successfully!")
