import {SET_PREVIEW_LIST} from '../actions/previewActions';

const initState = {
    ids:[],
    entities:{},
}

export default (state = initState, action) => {
    const {type, payload} = action;

    switch(type) {
        case SET_PREVIEW_LIST : {
            const ids = payload.map(entity => entity['id']);
            const entities = payload.reduce((finalEntities, entity) => ({
                ...finalEntities,
                [entity['id']]: entity,                
            }),{});
            return{...state, ids, entities}
        }
        default:
            return state;
    }
};

// 주로 API로 받아온 프리뷰 데이터를
// 효율적으로 조회/관리하기 위해
// id별로 분리해서 저장하는 패턴입니다