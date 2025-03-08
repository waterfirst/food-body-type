// DOM 요소
let searchInput;

// 카테고리 정렬 순서
const categoryOrder = [
    "곡류", "야채류", "육류", "생선류", "해조류/해물류", "패류/고동류", "과일류", "견과류", 
    "김치류", "젓갈", "차", "식용유", "운동", "목욕", "색", "보석", "죽", "기타"
];

// 카테고리 매핑 (탭 ID용)
const categoryMapping = {
    "곡류": "grain",
    "야채류": "vegetable",
    "육류": "meat",
    "생선류": "fish",
    "해조류/해물류": "seafood",
    "패류/고동류": "shellfish",
    "과일류": "fruit",
    "견과류": "nuts",
    "김치류": "kimchi",
    "젓갈": "jjot",
    "차": "drink",
    "식용유": "oil",
    "운동": "exercise",
    "목욕": "bath",
    "색": "color",
    "보석": "jewelry",
    "죽": "porridge",
    "기타": "etc",
    "음료": "drink"
};

// 카테고리 정렬 함수
function sortCategories(categories) {
    return Object.entries(categories).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a[0]);
        const indexB = categoryOrder.indexOf(b[0]);
        return indexA - indexB;
    });
}

// 음식 색상 결정 함수
function getFoodColorClass(food, index) {
    return index % 2 === 0 ? 'black-text' : 'blue-text';
}

// 카테고리별 음식 표시 함수
function displayFoodsByCategory(type, category) {
    try {
        const foods = foodData[type][category] || [];
        const tabId = categoryMapping[category];
        const containerId = `${type === "이로운 것" ? "good" : "bad"}Food${tabId}`;
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            return;
        }
        
        if (foods.length > 0) {
            const html = `
                <div class="list-group">
                    ${foods.map((food, index) => `
                        <div class="list-group-item ${getFoodColorClass(food, index)}">${food}</div>
                    `).join('')}
                </div>
            `;
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p class="text-center text-muted">해당 분류의 음식이 없습니다.</p>';
        }
    } catch (error) {
        console.error(`Error displaying foods for category ${category}:`, error);
    }
}

// 초기 음식 목록 표시
function displayFoodList() {
    try {
        if (!foodData) {
            console.error('foodData is not defined. Make sure data.js is loaded properly.');
            return;
        }

        // 이로운 음식 표시
        categoryOrder.forEach(category => {
            displayFoodsByCategory("이로운 것", category);
        });

        // 해로운 음식 표시 (운동, 목욕, 색, 보석 제외)
        const excludedCategories = ["운동", "목욕", "색", "보석", "죽", "김치류", "젓갈"];
        categoryOrder.forEach(category => {
            if (!excludedCategories.includes(category)) {
                displayFoodsByCategory("해로운 것", category);
            }
        });
    } catch (error) {
        console.error('Error displaying food list:', error);
    }
}

// 검색 기능 초기화
function initializeSearch() {
    searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        console.error('Search input element not found');
        return;
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length < 1) {
            displayFoodList();
            return;
        }

        try {
            // 이로운 음식 검색
            categoryOrder.forEach(category => {
                const foods = foodData["이로운 것"][category] || [];
                const filteredFoods = foods.filter(food => food.toLowerCase().includes(query));
                const tabId = categoryMapping[category];
                const containerId = `goodFood${tabId}`;
                const container = document.getElementById(containerId);
                
                if (container) {
                    if (filteredFoods.length > 0) {
                        const html = `
                            <div class="list-group">
                                ${filteredFoods.map((food, index) => `
                                    <div class="list-group-item ${getFoodColorClass(food, index)}">${food}</div>
                                `).join('')}
                            </div>
                        `;
                        container.innerHTML = html;
                    } else {
                        container.innerHTML = '<p class="text-center text-muted">검색 결과가 없습니다.</p>';
                    }
                }
            });

            // 해로운 음식 검색
            const excludedCategories = ["운동", "목욕", "색", "보석", "죽", "김치류", "젓갈"];
            categoryOrder.forEach(category => {
                if (!excludedCategories.includes(category)) {
                    const foods = foodData["해로운 것"][category] || [];
                    const filteredFoods = foods.filter(food => food.toLowerCase().includes(query));
                    const tabId = categoryMapping[category];
                    const containerId = `badFood${tabId}`;
                    const container = document.getElementById(containerId);
                    
                    if (container) {
                        if (filteredFoods.length > 0) {
                            const html = `
                                <div class="list-group">
                                    ${filteredFoods.map((food, index) => `
                                        <div class="list-group-item ${getFoodColorClass(food, index)}">${food}</div>
                                    `).join('')}
                                </div>
                            `;
                            container.innerHTML = html;
                        } else {
                            container.innerHTML = '<p class="text-center text-muted">검색 결과가 없습니다.</p>';
                        }
                    }
                }
            });

        } catch (error) {
            console.error('검색 중 오류:', error);
            categoryOrder.forEach(category => {
                const tabId = categoryMapping[category];
                const goodContainer = document.getElementById(`goodFood${tabId}`);
                const badContainer = document.getElementById(`badFood${tabId}`);
                
                if (goodContainer) {
                    goodContainer.innerHTML = '<p class="text-center text-muted">검색 중 일시적인 오류가 발생했습니다.</p>';
                }
                if (badContainer && !["운동", "목욕", "색", "보석", "죽", "김치류", "젓갈"].includes(category)) {
                    badContainer.innerHTML = '<p class="text-center text-muted">검색 중 일시적인 오류가 발생했습니다.</p>';
                }
            });
        }
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM loaded, initializing...');
        initializeSearch();
        displayFoodList();
    } catch (error) {
        console.error('Initialization error:', error);
    }
}); 