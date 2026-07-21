from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/slack/events', methods=['POST'])
def slack_events():
    data = request.json

    if data and 'challenge' in data:
        return jsonify({'challenge': data['challenge']})
    
    print("Received Slack event:", data)
    return '', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)