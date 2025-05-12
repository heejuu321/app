import {connect} from 'react-redux';
import '../page/ImagePreviewPage';
import {setPreviewList} from '../actions/previewActions';



const mapStateToProps = state => {
    const {ids, entities} = state.transaction;
    const transactions = ids.map(id => entities[id]);

    return {transactions};
};

const mapDispatchToProps = {
    setPreviewList
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);