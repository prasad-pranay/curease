import google.generativeai as genai

# Configure with your API key
genai.configure(api_key="AIzaSyCnTnomYMw6eARRXQ0o-rMtuAi7W9ItO34")


# for m in genai.list_models():
#     print(m.name)
# Load a model (Gemini 1.5 or 1.0)
model = genai.GenerativeModel("gemini-2.5-flash",system_instruction=(
        "You are a medical expert providing concise, professional, and "
        "fact-based responses. Reply in a clinical and human tone. "
        "Do not include disclaimers or references to being an AI assistant. "
        "Focus only on the medical explanation or advice based on the input question."
        "if i ask your name then your name is Rica Ai"
    ),)


def getResponse(query,history):
    chat = model.start_chat(history=history)
    chat.send_message(query)
    return chat.last.text

# active = True

# while active:
#     query = input("Ask me anything : \n")
#     if(query=="exit"):
#         active = False
#     chat.send_message(query)
#     print(chat.last.text)


