// DOM 요소
const searchInput = document.getElementById('searchInput');
const resultArea = document.getElementById('resultArea');
const constitutionTitle = document.querySelector('.constitution-title');
const recommendedList = document.querySelector('.recommended-list');
const avoidedList = document.querySelector('.avoided-list');

// 체질 정보 표시 함수
function showConstitution(type) {
    try {
        const data = constitutionData[type];
        
        if (!data) {
            alert("체질 정보를 찾을 수 없습니다.");
            return;
        }
        
        constitutionTitle.textContent = `${type} 음식 가이드`;
        
        // 추천 음식 목록
        recommendedList.innerHTML = data.추천음식
            .map(food => `<li class="list-group-item">${food}</li>`)
            .join('');
            
        // 기피 음식 목록
        avoidedList.innerHTML = data.기피음식
            .map(food => `<li class="list-group-item">${food}</li>`)
            .join('');
            
        resultArea.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
}

// 검색 기능
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = e.target.value.trim();
        
        if (query.length < 1) {
            resultArea.style.display = 'none';
            return;
        }
        
        try {
            const results = {};
            
            // 모든 체질 데이터에서 검색
            for (const [constitution, data] of Object.entries(constitutionData)) {
                for (const [foodType, foods] of Object.entries(data)) {
                    if (foods.some(food => food.includes(query))) {
                        if (!results[constitution]) {
                            results[constitution] = {};
                        }
                        results[constitution][foodType] = foods.filter(food => 
                            food.includes(query)
                        );
                    }
                }
            }
            
            if (Object.keys(results).length === 0) {
                constitutionTitle.textContent = '검색 결과';
                recommendedList.innerHTML = '<li class="list-group-item text-center">검색 결과가 없습니다.</li>';
                avoidedList.innerHTML = '';
            } else {
                constitutionTitle.textContent = '검색 결과';
                
                let recommendedHtml = '';
                let avoidedHtml = '';
                
                for (const [constitution, foods] of Object.entries(results)) {
                    if (foods.추천음식) {
                        foods.추천음식.forEach(food => {
                            recommendedHtml += `<li class="list-group-item">${food} (${constitution})</li>`;
                        });
                    }
                    if (foods.기피음식) {
                        foods.기피음식.forEach(food => {
                            avoidedHtml += `<li class="list-group-item">${food} (${constitution})</li>`;
                        });
                    }
                }
                
                recommendedList.innerHTML = recommendedHtml || '<li class="list-group-item text-center">해당하는 추천 음식이 없습니다.</li>';
                avoidedList.innerHTML = avoidedHtml || '<li class="list-group-item text-center">해당하는 기피 음식이 없습니다.</li>';
            }
            
            resultArea.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            alert('검색 중 오류가 발생했습니다.');
        }
    }, 300);
}); 