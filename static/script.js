// DOM 요소
const searchInput = document.getElementById('searchInput');
const goodFoodList = document.getElementById('goodFoodList');
const badFoodList = document.getElementById('badFoodList');

// 카테고리 정렬 순서
const categoryOrder = [
    "곡류", "야채류", "육류", "생선류", "해조류", "패류", "연체동물",
    "건과류", "견과류", "과일류", "김치", "식용유", "음료", "차", "비선류"
];

// 카테고리 정렬 함수
function sortCategories(categories) {
    return Object.entries(categories).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a[0]);
        const indexB = categoryOrder.indexOf(b[0]);
        return indexA - indexB;
    });
}

// 초기 음식 목록 표시
function displayFoodList() {
    // 이로운 음식 표시
    let goodHtml = '';
    const sortedGoodCategories = sortCategories(foodData["이로운 것"]);
    
    for (const [category, foods] of sortedGoodCategories) {
        if (foods.length > 0) {
            goodHtml += `
                <div class="mb-4">
                    <h4 class="text-success mb-3">${category}</h4>
                    <div class="list-group">
                        ${foods.map(food => `
                            <div class="list-group-item">${food}</div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }
    goodFoodList.innerHTML = goodHtml;

    // 해로운 음식 표시
    let badHtml = '';
    const sortedBadCategories = sortCategories(foodData["해로운 것"]);
    
    for (const [category, foods] of sortedBadCategories) {
        if (foods.length > 0) {
            badHtml += `
                <div class="mb-4">
                    <h4 class="text-danger mb-3">${category}</h4>
                    <div class="list-group">
                        ${foods.map(food => `
                            <div class="list-group-item">${food}</div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }
    badFoodList.innerHTML = badHtml;
}

// 검색 기능
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 1) {
        displayFoodList();
        return;
    }

    try {
        // 이로운 음식 검색
        let goodHtml = '';
        const sortedGoodCategories = sortCategories(foodData["이로운 것"]);
        
        for (const [category, foods] of sortedGoodCategories) {
            const filteredFoods = foods.filter(food => 
                food.toLowerCase().includes(query)
            );
            
            if (filteredFoods.length > 0) {
                goodHtml += `
                    <div class="mb-4">
                        <h4 class="text-success mb-3">${category}</h4>
                        <div class="list-group">
                            ${filteredFoods.map(food => `
                                <div class="list-group-item">${food}</div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }
        goodFoodList.innerHTML = goodHtml || '<p class="text-center text-muted">검색 결과가 없습니다.</p>';

        // 해로운 음식 검색
        let badHtml = '';
        const sortedBadCategories = sortCategories(foodData["해로운 것"]);
        
        for (const [category, foods] of sortedBadCategories) {
            const filteredFoods = foods.filter(food => 
                food.toLowerCase().includes(query)
            );
            
            if (filteredFoods.length > 0) {
                badHtml += `
                    <div class="mb-4">
                        <h4 class="text-danger mb-3">${category}</h4>
                        <div class="list-group">
                            ${filteredFoods.map(food => `
                                <div class="list-group-item">${food}</div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }
        badFoodList.innerHTML = badHtml || '<p class="text-center text-muted">검색 결과가 없습니다.</p>';
    } catch (error) {
        console.error('검색 중 오류:', error);
        goodFoodList.innerHTML = '<p class="text-center text-muted">검색 중 일시적인 오류가 발생했습니다.</p>';
        badFoodList.innerHTML = '<p class="text-center text-muted">검색 중 일시적인 오류가 발생했습니다.</p>';
    }
});

// 초기 목록 표시
displayFoodList(); 