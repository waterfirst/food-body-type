from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# 체질별 음식 데이터
constitution_data = {
    "태양인": {
        "추천음식": [
            "쇠고기", "닭고기", "돼지고기", "달걀", "우유", "생선", "해조류", "견과류",
            "메밀", "옥수수", "감자", "고구마", "마늘", "생강", "파", "양파",
            "더운 성질의 음식", "육류", "어패류", "난류"
        ],
        "기피음식": [
            "찬 음식", "차가운 과일", "생냉이", "냉면", "빙과류",
            "찬 성질의 음식", "한약", "녹차", "쌀", "보리", "콩류",
            "오이", "무", "배추", "미역", "김"
        ]
    },
    "태음인": {
        "추천음식": [
            "채소류", "해조류", "두부", "생선", "과일", "곡류",
            "보리", "현미", "콩", "팥", "녹두", "미역", "다시마",
            "배추", "무", "오이", "가지", "버섯", "사과", "배",
            "귤", "수박", "참외"
        ],
        "기피음식": [
            "기름진 음식", "육류", "닭고기", "술", "매운 음식",
            "돼지고기", "닭고기", "기름진 육류", "자극적인 음식",
            "생강", "파", "마늘", "후추", "겨자", "계피"
        ]
    },
    "소양인": {
        "추천음식": [
            "보리", "감자", "무", "배추", "미역", "굴", "조개류",
            "시원한 성질의 음식", "보리밥", "녹두", "팥", "오이",
            "배추", "무", "미역", "김", "굴", "조개", "게",
            "오징어", "낙지", "문어"
        ],
        "기피음식": [
            "매운 음식", "자극적인 음식", "커피", "후추", "겨자",
            "따뜻한 성질의 음식", "쇠고기", "닭고기", "생강",
            "파", "마늘", "양파", "부추", "고추", "후추",
            "겨자", "계피", "술"
        ]
    },
    "소음인": {
        "추천음식": [
            "따뜻한 음식", "양고기", "닭고기", "생강", "파", "마늘",
            "따뜻한 성질의 음식", "쌀밥", "쇠고기", "돼지고기",
            "닭고기", "생강", "파", "마늘", "부추", "양파",
            "고추", "후추", "계피", "인삼", "대추"
        ],
        "기피음식": [
            "차가운 음식", "날 음식", "찬 과일", "해조류",
            "차가운 성질의 음식", "보리", "녹두", "팥",
            "오이", "무", "배추", "미역", "김",
            "굴", "조개", "게", "수박", "참외"
        ]
    }
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/constitution/<type>')
def get_constitution(type):
    if type in constitution_data:
        return jsonify(constitution_data[type])
    return jsonify({"error": "체질 정보를 찾을 수 없습니다."})

@app.route('/search')
def search():
    query = request.args.get('q', '').strip()
    results = {}
    
    if query:
        for constitution, data in constitution_data.items():
            for food_type, foods in data.items():
                if any(query in food for food in foods):
                    if constitution not in results:
                        results[constitution] = {}
                    results[constitution][food_type] = [
                        food for food in foods if query in food
                    ]
    
    return jsonify(results)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
