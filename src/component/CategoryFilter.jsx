import React, { useState } from 'react';

const categories = [
  { label: '전체', filter: '*' },
  { label: 'score 높은 순', filter: 'score-asc' },
  { label: 'score 낮은 순', filter: 'score-desc' },
  { label: '제품명 가나다 순', filter: 'name-asc' },
];

function CategoryFilter({onSortChange}) {
  const [active, setActive] = useState('*');

  return (
    <ul className="col container-filter categories-filter mb-0" id="filter">
      {/* 기존 카테고리 버튼 */}
      {categories.map(cat => (
        <li key={cat.filter}>
          <button
            className="categories"
            data-filter={cat.filter}
            onClick={() => onSortChange && onSortChange(cat.filter)}
          >
            {cat.label}
          </button>
        </li>
      ))}
      <li>
        {/* <button className="categories" onClick={() => onSortChange && onSortChange('name-asc')} > 이름 가나다순</button> */}
      </li>
    </ul>
  );
}

export default CategoryFilter;