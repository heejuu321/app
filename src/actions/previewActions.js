export const SET_PREVIEW_LIST = 'search/SET_PREVIEW_LIST';

export function setPreviewList(previewResult) {
    return {
        type: SET_PREVIEW_LIST,
        payload: previewResult   //previews라는 데이터를 payload로 담아서 스토어에 전달합니다.
    }
}


// 이 함수 자체는 API 호출을 하지 않습니다.
// 보통은,
// API를 호출해서 데이터를 받아온 뒤
// 그 데이터를 이 함수에 넣어서
// Redux 스토어에 저장(업데이트)할 때 사용합니다.