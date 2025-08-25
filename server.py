from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend requests

# Load a small generative model (you can upgrade later)
chatbot = pipeline("text-generation", model="microsoft/DialoGPT-medium")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    # Generate bot reply
    response = chatbot(user_message, max_length=60, do_sample=True, top_k=50, temperature=0.7)
    bot_reply = response[0]['generated_text'].replace(user_message, "").strip()

    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)

