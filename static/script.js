// DOM 요소
const searchInput = document.getElementById('searchInput');
const goodFoodList = document.getElementById('goodFoodList');
const badFoodList = document.getElementById('badFoodList');

// 초기 음식 목록 표시
function displayFoodList() {
    // 이로운 음식 표시
    let goodHtml = '';
    for (const [category, foods] of Object.entries(foodData["이로운 것"])) {
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
    goodFoodList.innerHTML = goodHtml;

    // 해로운 음식 표시
    let badHtml = '';
    for (const [category, foods] of Object.entries(foodData["해로운 것"])) {
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
    badFoodList.innerHTML = badHtml;
}

// 검색 기능
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 1) {
        displayFoodList();
        return;
    }

    // 이로운 음식 검색
    let goodHtml = '';
    for (const [category, foods] of Object.entries(foodData["이로운 것"])) {
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
    for (const [category, foods] of Object.entries(foodData["해로운 것"])) {
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
});

// 초기 목록 표시
displayFoodList(); 